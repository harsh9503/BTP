import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {BarLoader} from "react-spinners";
import { IoMdCheckmarkCircleOutline,IoIosRemoveCircleOutline } from "react-icons/io";
import "../stylesheets/EnrolledCourses.css"
export const CourseDialog = (props)=>{
    const thisEle = useRef("");
    useEffect(()=>{
        
    },[]);
    return (
        <div className="course-dialog" ref={thisEle}>
            <div className="course-info-enrolled" style={{width:"30%"}}>
                <img className="course-icon" src={props.image}></img>
                <div className="course-data-enrolled">
                    <p className="no-margin">{props.coursename}</p>
                    <p className="no-margin">{props.description.length>=25?props.description.slice(0,25)+"...":props.description}</p>
                </div>
            </div>
            <div className="course-duration" style={{width:"20%"}}>{props.duration}</div>
            <div className="course-progress" style={{width:"10%"}}>
                <label className="no-margin text-yellow">Progress: {props.progressPercentage}%</label><br/>
                <progress className="course-progress-bar" max={100} value={props.progressPercentage}></progress>
            </div>
            <div className="course-menu" onClick={(event)=>{event.target?.classList?.toggle("active")}}>&#8942;
                <div className="menu">
                    <div className="no-margin"><IoMdCheckmarkCircleOutline display={"inline-block"} size={"20px"}/>&nbsp;&nbsp;Mark as Completed</div>
                    <div className="no-margin"><IoIosRemoveCircleOutline display={"inline-block"} size={"20px"}/>&nbsp;&nbsp;Remove</div>
                </div>
            </div>
        </div>
    )
}
CourseDialog.defaultProps = {
    coursename:"Hello World in C++",
    description: "Learn Basic C++ in 1 hour",
    duration: "2h 30mins",
    progressPercentage: "46",
}
export const EnrolledCourses = () =>{
    const [spin, setSpin] = useState(true);
    const [courses, setCourses] = useState([]);
    useEffect(()=>{
        setSpin(true);
        axios.get(`${process.env.REACT_APP_BURL}/api/v1/course/getEnrolledCourses`,{
            withCredentials: true
        }).then((res)=>{
            const temp = res?.data?.data?.map((ele)=>{
                return <CourseDialog id={ele._id} image={ele.thumbnail} coursename={ele.courseName} description={ele.courseDescription} duration={ele.totalDuration} progressPercentage={ele.progressPercentage}/>
            })
            setCourses(temp);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            setSpin(false);
        })
    },[]);
    return (
        <>
        <div className="enrolled-courses-main white">
        {spin && <BarLoader className="loader" width={"100%"} color="blue"/>}
            <p className="path white">Home / Dashboard / <span className="text-yellow">Enrolled Courses</span></p>
            <h2 className="white">Enrolled Courses</h2>
            <div className="courses-enrolled">{courses.length?courses:"No Enrolled Courses"}</div>
        </div>  
        </>      
    )
}