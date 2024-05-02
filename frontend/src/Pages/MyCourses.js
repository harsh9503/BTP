import { useParams, NavLink } from "react-router-dom";
import "../stylesheets/MyCourses.css"
import toast from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { ImCheckboxChecked } from "react-icons/im";
import { PiMonitorPlayFill } from "react-icons/pi";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { FaPlay, FaPause} from "react-icons/fa";
import { FaVolumeLow, FaVolumeHigh, FaVolumeOff } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
const Subsection = (props)=>{
    let completed = props.cvideos.includes(props.id); 
    return (
      <div className="subsection">
          <div className="subsection-main" completed={completed?"true":"false"}>
              {completed?<ImCheckboxChecked className="completed"/>:<PiMonitorPlayFill/>}&nbsp;&nbsp;
              <NavLink to={"/user/mycourses/"+props.cid+"/"+props.id} onClick={()=>props.onClick()} on={()=>{props.onClick();console.log("YES!")}}>
              <p className="title">{`${props.title}`}</p>
              </NavLink>&nbsp;&nbsp;
              <IoIosArrowDown onClick={(event)=>event.target.parentElement.toggleAttribute("active")}/>
              <p className="duration">{props.duration}</p>
          </div>
          <div className="subsection-description">{props.description}</div>
      </div>
    )
}

const add = (a1,a2)=>{
    return [a1[0]+a2[0],a1[1]+a2[1],a1[2]+a2[2]];
}
const parseString = (string)=>{
    if(!string) return undefined;
    let ans = [0,0,0];
    for(let x = string.length-1; x>=0; x--){
        if(string[x] == 's'){
            let t = x-1;
            while(t>=0 && string[t]!='m' && string[t]!='h') t--;
            ans[2] = Number.parseInt(string.slice(t+1,x));
            x=t+1;
        }
        else if(string[x] == 'm'){
            let t = x-1;
            while(t>=0 && string[t]!='h') t--;
            ans[1] = Number.parseInt(string.slice(t+1,x));
            x=t+1;
        }
        else if(string[x] === 'h'){
            let t = x-1;
            while(t>=0) t--;
            ans[0] = Number.parseInt(string.slice(t+1,x));
            x=t+1;
        }
    }
    return ans;
}
const Section = (props)=>{
    let totalDur = [0,0,0];
    const temp = props.subsections?.map((ele,idx)=>{
        totalDur = add(totalDur,parseString(ele.timeDuration));
        return <Subsection cvideos={props.cvideos} cid={props.cid} onClick={()=>{props.setLecture(ele); props.nextVideo.current=props.subsections[idx+1]||props.next}} id={ele._id} title={ele.title} duration={ele.timeDuration} description={ele.description} url={ele.videoUrl}/>
    });
    totalDur[1] += parseInt(totalDur[2]/60);
    totalDur[0] += parseInt(totalDur[1]/60);
    totalDur[2] %= 60;
    totalDur[1] %= 60;
return(
    <div className="section" active="true">
        <div className="section-name">
         {props.sectionName}
         <div className="section-info text-yellow">
            &nbsp; &nbsp;{totalDur[0]?`${totalDur[0]}h`:""}
            {totalDur[1]?`${totalDur[1]}m`:""}
            {totalDur[2]?`${totalDur[2]}s`:""}
         </div>
        </div>
        <div className="subsections">
        {temp}
        </div>
    </div>
)
}

const MyCourses = ()=>{
    const {courseId} = useParams();
    const [course,setCourse] = useState("");
    const [lecture, setLecture] = useState("");
    const [button, setButton] = useState(<FaPlay/>);
    const [counter, setCounter] = useState(0);
    const [cvideos, setCvideos] = useState([]);
    
    let tVideos = 0;
    course?.courseContent?.map((ele)=>tVideos+=ele.subSection.length);

    let player = useRef(""), toggleButton=useRef(""), progress=useRef(""), progressBar=useRef("");
    let layer = useRef(""), nextVideo = useRef("");
    const togglePlay = ()=>{
        if(player.current.paused || player.current.ended){
            player.current.play();
        }
        else{
            player.current.pause();
        }
    }
    const updateToggleButton = ()=>{
        player.current.paused ? setButton(<FaPlay/>):setButton(<FaPause/>);
    }
    const handleProgress = ()=>{
        const progressPercentage = (player.current.currentTime / player.current.duration)*100;
        setCounter(progressPercentage);
    }
    const handleSliderUpdate = (event)=>{
        player.current[event.target.name] = event.target.value
    }
    const handleSkip = (event)=>{
        player.current.currentTime += +event.currentTarget.dataset.skip;
    }
    const handleComplete = ()=>{
        if(document.querySelector("a.active").parentElement.getAttribute("completed") === "true") return;
        const promise = axios.put(`${process.env.REACT_APP_BURL}/api/v1/course/updateCourseProgress`,{courseId:courseId,subsectionId:lecture?._id},{
            withCredentials:true
        });
        toast.promise(promise,{
            success: "Lecture Completed Successfully!",
            error: (err)=>err?.response?.data?.message||"Error Occurred!",
            loading: "Please Wait!"
        })
    }
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/getFullCourseDetails`,{courseId:courseId},{withCredentials:true}).then((response)=>{
            setCourse(response.data.data.courseDetails);
            setCvideos(response.data?.data?.completedVideos);
            toast.dismiss();
        }).catch((err)=>console.log(err));
        window.addEventListener("keydown",(e)=>{
            
            if(e.code === "ArrowRight"){
                handleSkip({currentTarget:{dataset:{skip:"+10"}}});
            }
            if(e.code === "ArrowLeft"){
                handleSkip({currentTarget:{dataset:{skip:"-10"}}});
            }
        })
    },[]);
    useEffect(()=>{
        toggleButton.current.addEventListener("click",togglePlay);
        player.current.addEventListener("click",togglePlay);
        player.current.addEventListener("play",updateToggleButton);
        player.current.addEventListener("pause",updateToggleButton);
        player.current.addEventListener("timeupdate",handleProgress);
        player.current.addEventListener("ended",()=>{
            layer.current.style.display = "flex";
            handleComplete();
        });
        const sliders = document.querySelectorAll(".controls__slider");
        const skipButton = document.querySelectorAll(".controls__button");
        sliders.forEach((ele)=>{
            ele.addEventListener("change",handleSliderUpdate);
        })
        skipButton.forEach((ele)=>{
            ele.addEventListener("click",handleSkip);
        })
        document.querySelector(".progress").addEventListener(("click"),(event)=>{
            setCounter((event.offsetX/event.currentTarget.offsetWidth)*100);
            player.current.currentTime = ((event.offsetX/event.currentTarget.offsetWidth)*player.current.duration).toFixed(4);
        })
        let mousedown = false;
        document.querySelector(".progress").addEventListener(("mousedown"),(event)=>{
            mousedown = true;
        })
        document.querySelector(".progress").addEventListener(("mousemove"),(event)=>{
            if(mousedown){
                setCounter((event.offsetX/1000)*100);
                player.current.currentTime = ((event.offsetX/1000)*player.current.duration).toFixed(4);
            }
        })
        document.querySelector(".progress").addEventListener(("mouseup"),(event)=>{
            mousedown = false;
        })
    },[lecture]);
    const getTime = (time)=>{
        time = Number.parseInt(time);
        const ans = [0,0,0];
        ans[2] = String(time%60).padStart(2,"0");
        time=(time/60)|0;
        ans[1] = String(time%60).padStart(2,"0");
        time=(time/60)|0;
        ans[0] = time;
        if(ans[0] && ans[0] <= 9) ans[0] = "0"+ans[0].toString();
        let str = `${ans[1]}:${ans[2]}`;
        if(ans[0]) str = `${ans[0]}:${str}`;
        return str;
    }
    return (
        <div className="mycourse-main">
            <div className="mycourse-sidebar">
                <div className="mycourse-title">
                    <span style={{textOverflow:"ellipsis", maxWidth:"80%"}} >{course?.courseName}</span>&nbsp; &nbsp;
                    <span className={`${tVideos === cvideos.length && "completed"}`}>{`${cvideos.length}/${tVideos}`}</span>
                </div>
                <hr style={{position:"static",width:"90%",marginLeft:"auto",marginRight:"auto"}}/>
                <div className="sections">
                    {course?.courseContent?.map((ele,idx)=>{
                    tVideos += ele.subSection.length;
                    return <Section nextVideo={nextVideo} next={course?.courseContent[idx+1]?course?.courseContent[idx+1].subSection[0]:null} cvideos={cvideos} cid={courseId} setLecture={setLecture} sid={idx} sectionName={ele.sectionName} subsections={ele.subSection}/>
                    })}
                    </div>
                </div>
            <div className="mycourse-content">
                    <div className="video-player" key={lecture?.videoUrl} style={{display:lecture?"block":"none"}}>
                    <video className="lecture" ref={player} key={lecture}>
                        <source src={lecture?.videoUrl} type="video/mp4"/>
                        <p>Sorry! Your browser doesn't support playing HTML5 videos.</p>
                    </video>
                    <div className="controls">
                        <div className="progress" ref={progress}>
                            <div className="progress__filled" style={{flexBasis:counter+"%"}} ref={progressBar}><div className="slider-circle" draggable></div></div>
                        </div>
                        <IconContext.Provider value={{size:"30px",style:{margin:"10px"}}}>
                        <button className="controls__button" data-skip="-10"><IoPlaySkipForwardSharp/></button>
                        <button type="button" ref={toggleButton}>{button}</button>
                        <button className="controls__button" data-skip="10"><IoPlaySkipForwardSharp/></button>
                        <span className="time-frame">{`${getTime(player.current.currentTime)} / ${getTime(player.current.duration)}`}</span>
                        <FaVolumeHigh/><input type="range" name="volume" className="controls__slider" min="0" max="1" step="0.05" defaultValue="1"/>
                        {`Speed: ${player.current.playbackRate}x`}<input type="range" name="playbackRate" className="controls__slider" min="0.5" max="2" step="0.5" defaultValue="1"/>
                        <div className="time-skip" style={{marginLeft: "auto",marginRight:"20px"}}>
                        <button className="controls__button" data-skip="-10">« 10s</button>
                        &nbsp;&nbsp;
                        <button className="controls__button" data-skip="10">10s »</button>
                        </div>
                        </IconContext.Provider>
                    </div>
                    <div className="video-completed" ref={layer}>
                        <button type="button" className="btn btn-semisquare yellow"><NavLink to={`/user/mycourses/${courseId}/${nextVideo.current?._id}`} onClick={()=>{setLecture(nextVideo.current);setCounter(0);player.current.currentTime=0;}}>Next</NavLink></button>
                        <button type="button" className="btn btn-semisquare" onClick={(event)=>{player.current.currentTime = 0; setCounter(0); event.target.parentElement.style.display = "none"}}>Replay</button>
                    </div>
                </div>
                <div className="course" style={{display:lecture?"none":"block"}}>
                    <h2 className="white">{course?.courseName}</h2>
                    {course?.instructor?.firstName+" "+course?.instructor?.lastName}
                </div>
                <span className="lecture-description">
                        {lecture?.title}<br/>
                        {lecture?.description}
                        <div className="instructions">
                            {course?.instructions?.map((ele)=><p>{ele}</p>)}
                        </div>
                        {new Date(course?.createdAt).toLocaleDateString('en-US',{dateStyle:"medium"})}
                </span>
            </div>
        </div>
    )
}

export default MyCourses;