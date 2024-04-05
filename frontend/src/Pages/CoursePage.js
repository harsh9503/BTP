import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import "../stylesheets/CoursePage.css"
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiMonitorPlayFill } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
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
const Section = (props)=>{
        const temp = props.subsections?.map((ele)=><Subsection title={ele.title} duration={ele.timeDuration} description={ele.description} url={ele.videoUrl}/>);
    return(
        <div className="section">
            <div className="section-name" onClick={(event)=>{event.target.parentElement.toggleAttribute("active");}}>
             <IoIosArrowDown/>&nbsp;&nbsp;{props.sectionName}
             <div className="section-info text-yellow">
                {`${props.subsections?.length} Lectures`}
                &nbsp; &nbsp;50 min
             </div>
            </div>
            <div className="subsections">
            {temp}
            </div>
        </div>
    )
}
Section.defaultProps = {
    sectionName: "Section1",
    subsections:[new Object({"title":"Why Python","timeDuration":"02:09","description":"One of the best programming languages"}),{"title":"Why Python","timeDuration":"02:09","description":"One of the best programming languages"}]
}
const CoursePage = ()=>{
    const {courseId} = useParams();
    const [course,setCourse] = useState("");
    const [totalDuration, setTotalDuration] = useState("");
    const [cvideos, setCvideos] = useState("");
    let ratings = 0;
    const stars = [];
    course?.ratingAndReviews?.forEach((ele) => {
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
                <div className="course-page-path white">
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
            </div>
            <div className="course-main-content">
                <div className="course-will-learn">
                    <h2>What you'll learn</h2>
                    {course?.whatYouWillLearn.map((ele)=><p>{ele}</p>)}
                </div>
                <div className="course-content">
                    <h2 className="white">Course Content</h2>
                    <p className="white">{`${course?.courseContent?.length} Sections `}&middot;{` ${course?.courseContent?.reduce((total,curr)=>total+curr.length,0)} Lectures `}&middot;{` ${totalDuration}`}</p>
                    <div className="sections">
                        <Section/>
                        <Section/>
                        <Section/>
                        <Section/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursePage;