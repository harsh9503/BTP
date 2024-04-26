import { useContext, useEffect, useState } from "react";
import "../stylesheets/InstructorCourses.css"
import axios from "axios";
import toast from "react-hot-toast";
import { GoCalendar, GoCheckCircleFill } from "react-icons/go";
import { BarLoader } from "react-spinners";
import { FaAngleLeft } from "react-icons/fa";
import { catContext } from "../App";

/**
 * @param image image
 * @param coursename
 * @param description
 * @param duration
*/
const CourseDialog = (props)=>{
    return (
        <div className="course-data">
            <div className="course-info-enrolled course-col">
                <img className="course-icon" src={props.image}></img>
                <div className="course-data-enrolled">
                    <h3>{props.coursename}</h3>
                    <p className="no-margin">{props.description}</p>
                    <div className="created-at" >Created: {new Date(props.createdAt).toLocaleString('en-US',{dateStyle:"medium"})} | {new Date(props.createdAt).toLocaleTimeString("en-IN",{timeStyle:"short"})}</div>
                    {props.status==="Published"?<div className="status-div published"><GoCheckCircleFill />&nbsp;Published</div>:<div className="status-div drafted"><GoCalendar/>&nbsp;Drafted</div>}
                </div>
            </div>
            <div className="course-col course-duration">{props.duration}</div>
            <div className="course-col course-price">{props.price}</div>
            <div className="course-col course-actions">Edit Delete</div>
        </div>
    )
}
const CreateCourse = ()=>{
    return(
        <div className="create-course-main">
            <div className="back-button"><FaAngleLeft/> Back to Dashboard</div>
            <div className="course-tracker">
                <div className="course-circle">1</div>
                <hr/>
                <div className="course-circle">2</div>
                <hr/>
                <div className="course-circle">3</div>
            </div>
            <AddCourseDetails/>
        </div>
    )
}
const AddCourseDetails = ()=>{
    const cats = useContext(catContext).cats;
    return(
        <div className="addcourse-main">
            <label htmlFor="title">Course Title:*</label>
            <input type="text" id="title" placeholder="Enter Course Title" required/>
            <label>Course Short Description:*</label>
            <textarea type="text" placeholder="Enter Description" required/>
            <label>Price:*</label>
            <input type="number" id="title" placeholder="Enter Price" required/>
            <label>Category:*</label>
            <select className='category-select' value="">
                {cats.map((ele)=><option value={ele.props.children}>{ele.props.children}</option>)}
            </select>
            <label>Tags:*</label>
            <input type="text" placeholder="Choose a tag" required/>
            <label>Course Thumbnail:*</label>
            <input type="file" placeholder="Enter Course Title" required/>
            <label>Benefits of the Course:*</label>
            <input type="text" placeholder="Enter Benefits" required/>
            <label>Requirements / Instructions*</label>
            <input type="text" placeholder="Enter Instructions" required/>
        </div>
    )
}
const InstructorCourses = ()=>{
    const [courses, setCourses] = useState([]);
    const [spin, setSpin] = useState(false);
    useEffect(()=>{
        setSpin(true);
        axios.get(`${process.env.REACT_APP_BURL}/api/v1/course/getInstructorCourses`,{withCredentials:true}).then((res)=>{
            setCourses(res.data.data);
            console.log(res.data);
        }).catch(err=>{
            toast.error(err);
            console.log(err);
        }).finally(()=>{
            setSpin(false);
        });
    },[]);
    return <CreateCourse/>
    return (
        <div className="instructor-courses-main">
            {spin &&<BarLoader width={"100%"}/>}
            <div className="course-table">
                {courses.map((ele)=><CourseDialog status={ele.status} createdAt={ele.createdAt} image={ele.thumbnail} price={ele.price} coursename={ele.courseName} description={ele.courseDescription} duration={ele.courseDuration}/>)}
            </div>
        </div>
    )
}
export default InstructorCourses;