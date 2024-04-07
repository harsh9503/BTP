import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import "../stylesheets/CoursePage.css"
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiMonitorPlayFill } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
import { ReviewCard } from "./HomePage";
import axios from "axios";
const Subsection = (props)=>{
      return (
        <div className="subsection">
            <div className="subsection-main">
                <PiMonitorPlayFill/>&nbsp;&nbsp;
                <p className="title" style={{fontSize:"medium"}}>{`${props.title}`}</p>&nbsp;&nbsp;
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
        const temp = props.subsections?.map((ele)=>{
            totalDur = add(totalDur,parseString(ele.timeDuration));
            return <Subsection title={ele.title} duration={ele.timeDuration} description={ele.description} url={ele.videoUrl}/>
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
                {`${props.subsections?.length} Lectures`}
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
const CoursePage = ()=>{
    const {courseId} = useParams();
    const [course,setCourse] = useState("");
    const [totalDuration, setTotalDuration] = useState("");
    const [cvideos, setCvideos] = useState("");
    let ratings = 0;
    const stars = [];
    course?.ratingAndReviews?.map((ele) => {
        ratings += ele.rating
    });
    ratings = ratings/course.ratingAndReviews?.length;
    for(let i=1;i<=5;i++){
        if(i <= ratings) stars.push(<FaStar/>);
        else stars.push(<FaRegStar/>)
    }
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/getFullCourseDetails`,{
            courseId: courseId,
        },{
            withCredentials:true
        }
        ).then((response)=>{
            setCourse(response.data.data.courseDetails);
            setTotalDuration(response.data.data.totalDuration);
            setCvideos(response.data.data.completedVideos);
        }).catch((err)=>{
            window.alert(err);
        })
    },[]);
    return(
        <div className="course-page-main">
            <div className="course-page-top">
                <div className="path white">
                    {`Home / Learning / `}
                    <span className="text-yellow">{course?course.category.name:""}</span>
                </div>
                <div className="course-info">
                    <h2 className="white">{course.courseName}
                    </h2>
                    <div className="course-desc">{course.courseDescription}
                    </div>
                    <div className="course-stars">
                        {ratings||"No review"} 
                        <IconContext.Provider value={{size:"18px",style:{marginRight:"2px"}}}>
                            {ratings?stars:""}
                        </IconContext.Provider>
                        <div className="course-enrolled">
                        {`(${course.ratingAndReviews?.length} ratings) `}
                        {course.studentsEnrolled?.length.toLocaleString('en-US')+" students"}
                        </div>
                    </div>
                    <p>{`Created by ${course?.instructor?.firstName+" "+course.instructor?.lastName}`}</p>
                    <div className="course-data">
                        <IconContext.Provider value={{size:"20px",style:{marginRight:"5px"}}}>
                        <CiCircleInfo/>
                        {`Created at ${new Date(course.createdAt).getMonth()} / ${new Date(course.createdAt).getFullYear()}`}
                        <HiLanguage/>
                        {"English"}
                        </IconContext.Provider>
                    </div>
                </div>
                <div className="course-right-div">
                    <img src={course?.thumbnail}></img>
                    <h2 className="white no-margin">
                        {`Rs ${course?.price?.toLocaleString('en-US')}`}
                    </h2>
                    <button className="btn btn-semisquare yellow">Add to Cart</button>
                    <button className="btn btn-semisquare bgcolor">Buy now</button>
                    <p className="text-center">30-Day Money-Back Guarantee</p>
                    {course?.instructions?.length && (
                        <>
                        <p className="no-margin">This Course requires: <br/></p>
                        {course?.instructions?.map((ele)=><p className="instruction no-margin">{ele}</p>)}
                        </>
                    )}
                    <button className="btn share-btn bgcolor btn-semisquare">Share</button>
                </div>
            </div>
            <div className="course-main-content">
                <div className="course-will-learn">
                    <h2>What you'll learn</h2>
                    {course?.whatYouWillLearn?.map((ele)=><p>{ele}</p>)}
                </div>
                <div className="course-content">
                    <h2 className="white">Course Content</h2>
                    <p className="white">{`${course?.courseContent?.length} Sections `}&middot;{` ${course?.courseContent?.reduce((total,curr)=>{return total+curr.subSection.length},0)} Lectures `}&middot;{` ${totalDuration}`}</p>
                    <div className="sections">
                        {course?.courseContent?.map((ele)=>{
                            return <Section sectionName={ele.sectionName} subsections={ele.subSection}/>
                        })}
                        <Section/>
                    </div>
                </div>
                <div className="course-author white">
                    <h2>Author</h2>
                    <div className="author-info">
                        <img src={course?.instructor?.image}></img>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {course?.instructor?.firstName+" "+course?.instructor?.lastName}
                    </div>
                </div>
                <h1 className="white text-center">Reviews from other learners</h1>
                <div className="course-reviews">
                    {course?.ratingAndReviews?.length==0 && <h2 className="text-center white">No reviews</h2>}
                    {course && course?.ratingAndReviews?.map((ele)=>{
                        return <ReviewCard firstname={ele.user.firstName} lastname={ele.user.lastName} stars={ele.rating} review={ele.review}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CoursePage;