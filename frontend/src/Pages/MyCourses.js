import { useParams, NavLink } from "react-router-dom";
import "../stylesheets/MyCourses.css"
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { PiMonitorPlayFill } from "react-icons/pi";
const Subsection = (props)=>{
    return (
      <div className="subsection">
          <NavLink to={"../subSection/"+props.id}>
          <div className="subsection-main">
              <PiMonitorPlayFill/>&nbsp;&nbsp;
              <p className="title">{`${props.title}`}</p>&nbsp;&nbsp;
              <IoIosArrowDown onClick={(event)=>event.target.parentElement.toggleAttribute("active")}/>
              <p className="duration">{props.duration}</p>
          </div>
          </NavLink>
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
    const temp = props.subsections?.map((ele)=>{
        totalDur = add(totalDur,parseString(ele.timeDuration));
        return <Subsection id={ele._id} title={ele.title} duration={ele.timeDuration} description={ele.description} url={ele.videoUrl}/>
    });
    totalDur[1] += parseInt(totalDur[2]/60);
    totalDur[0] += parseInt(totalDur[1]/60);
    totalDur[2] %= 60;
    totalDur[1] %= 60;
return(
    <div className="section">
        <div className="section-name" onClick={(event)=>{event.target.parentElement.toggleAttribute("active");}}>
         <IoIosArrowDown/>&nbsp;&nbsp;{props.sectionName}
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
Section.defaultProps = {
sectionName:"TEST SECTION",
subsections: [{"title":"T1","timeDuration":"2h","description":"TBA"},{"title":"T2","timeDuration":"2m","description":"TBA"}]
}

const MyCourses = ()=>{
    const {courseId} = useParams();
    const [course,setCourse] = useState("");
    const [lecture, setLecture] = useState("");
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/getFullCourseDetails`,{courseId:courseId},{withCredentials:true}).then((response)=>{
            setCourse(response.data.data.courseDetails);
            console.log(response.data.data);
            toast.dismiss();
        }).catch((err)=>console.log(err));
    },[]);

    return (
        <div className="mycourse-main">
            <div className="mycourse-sidebar">
                <div className="mycourse-title">
                    {course?.courseName}
                </div>
                <hr style={{position:"static",width:"90%",marginLeft:"auto",marginRight:"auto"}}/>
                <div className="sections">
                    {course?.courseContent?.map((ele)=>{
                    return <Section  sectionName={ele.sectionName} subsections={ele.subSection}/>
                    })}
                    </div>
                </div>
            <div className="mycourse-content">
            </div>
        </div>
    )
}

export default MyCourses;