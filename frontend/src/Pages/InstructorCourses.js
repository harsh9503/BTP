import React,{ createContext, useContext, useEffect, useRef, useState } from "react";
import "../stylesheets/InstructorCourses.css"
import axios from "axios";
import toast from "react-hot-toast";
import { GoCalendar, GoCheckCircleFill } from "react-icons/go";
import { BarLoader } from "react-spinners";
import { FaAngleLeft, FaCaretDown, FaList, FaPen, FaPlusCircle } from "react-icons/fa";
import { catContext } from "../App";
import { CiCloudOn } from "react-icons/ci";
import { FaX } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
const sectionContext = createContext([]);
/**
 * @param image image
 * @param coursename
 * @param description
 * @param duration
*/
const Subsection = (props)=>{
    return (
      <div className="subsection-edit">
          <div className="subsection-main">
              <FaList/>&nbsp;&nbsp;
              <p className="title" style={{fontSize:"medium"}}>{`${props.title}`}</p>&nbsp;&nbsp;
              <IoIosArrowDown onClick={(event)=>event.target.parentElement.toggleAttribute("active")}/>
              <div className="subsection-actions">
              <FaPen/> <MdDelete onClick={props.delete}/>
              </div>
          </div>
          <div className="subsection-description">{props.description}</div>
      </div>
    )
}
const Section = (props)=>{
    const [subsections, setSubsections] = useState(props.subsections||[]);
    const {setSections, sections} = useContext(sectionContext);
    const HandleDelete = ()=>{ 
        setSections(sections.filter((ele,iidx)=>iidx!=props.idx));
    }
    const temp = subsections?.map((ele,idx)=>{
        return <Subsection delete={()=>setSubsections(subsections.filter((ele,iidx)=>iidx!=idx))} title={ele.title} duration={ele.timeDuration} description={ele.description} url={ele.videoUrl}/>
    });
return(
    <div className="section-edit">
        <div className="section-name-edit" onClick={(event)=>{event.target.parentElement.toggleAttribute("active");}}>
         <FaList/> &nbsp; &nbsp;{props.sectionName}
         <div className="section-info">
            <IconContext.Provider value={{style:{marginRight:"10px", verticalAlign:"text-top"}}}>
            <FaPen/> <MdDelete onClick={HandleDelete}/>
            <hr className="vertical"/>
            <FaCaretDown/>
            </IconContext.Provider>
         </div>
        </div>
        <div className="subsections-edit">
        {temp}
        <div className="subsection-adder text-yellow"><AiOutlinePlus/>&nbsp;Add Lecture</div>
        </div>
    </div>
)
}
Section.defaultProps = {
    sectionName:"TEST SECTION",
    subsections: [{"title":"T1","timeDuration":"2h","description":"TBA"},{"title":"T2","timeDuration":"2m","description":"TBA"}]
}
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
const stageContext = React.createContext(0);
const CreateCourse = ()=>{
    const {stage,setStage} = useContext(stageContext); 
    const curr_stage = [<AddCourseDetails/>,<AddSections/>]
    return(
        <div className="create-course-main">
            <div className="back-button"><FaAngleLeft/> Back to Dashboard</div>
            <div className="course-tracker">
                <div className={"course-circle "+ (stage>=1?stage===1?"current-stage":"completed":"")}>{stage>1?<IoCheckmark size={"25px"}/>:1}</div>
                <hr/>
                <div className={"course-circle "+ (stage>=2?stage===2?"current-stage":"completed":"")}>{stage>2?<IoCheckmark size={"25px"}/>:2}</div>
                <hr/>
                <div className={"course-circle "+ (stage>=3?stage===3?"current-stage":"completed":"")}>{stage>3?<IoCheckmark size={"25px"}/>:3}</div>
            </div>
                {curr_stage[stage]}
        </div>
    )
}
const VariableInputArray = (props)=>{
    const [count, setCount] = useState(1);
    const inputs = new Array(Math.min(6,count));
    inputs.fill(<input type="text" placeholder="Enter Instruction" style={{marginBottom:"10px"}}/>)
    return(
        <>
        {inputs}
        {count < 6 && <button type="button" className="link" onClick={()=>{setCount(count+1)}}>Add</button>}
        </>
    )
}
const AddCourseDetails = ()=>{
    const cats = useContext(catContext).cats;
    const [tags, setTags] = useState([]);
    const instruArray = useRef("");
    const {setStage} = useContext(stageContext);
    const tagInput = useRef("");
    useEffect(()=>{;
        window.addEventListener("dragover",(e)=>{
            e.preventDefault();
        })
        document.getElementsByClassName("course-image-div")[0].addEventListener("drop",(event)=>{
            event.preventDefault();
        });
        document.getElementsByClassName("course-image-div")[0].addEventListener("dragleave",(event)=>{
            event.preventDefault();
        });
        document.getElementsByClassName("course-image-div")[0].addEventListener("dragover",(event)=>{
            event.preventDefault();
        });
    },[]);
    const addTag = (event)=>{
        if(event.code === "Enter"){
            event.preventDefault();
            const tag = tagInput.current.value;
            if(!tag.length) return;
            setTags(tags.concat(tag));
            tagInput.current.value = "";
            return;
        }
    }
    const deleteTag = (idx)=>{
        setTags((tags.filter((ele,cidx)=>cidx!==idx)))
    }
    const HandleFile = (event)=>{
        if(event.target.files.length === 0) return;
        const reader = new FileReader();
        reader.onload= ()=>{
            localStorage.setItem("course-thumbnail",reader.result);
        }
        reader.readAsDataURL(event.target.files[0]||"");
    }
    return(
        <div className="addcourse-main">
            <form onSubmit={()=>setStage(2)}>
            <label htmlFor="title">Course Title:*</label>
            <input type="text" id="title" placeholder="Enter Course Title" required/>
            <label>Course Short Description:*</label>
            <textarea type="text" placeholder="Enter Description" required/>
            <label>Price:*</label>
            <input type="number" id="title" placeholder="Enter Price" required/>
            <label>Category:*</label>
            <select className='category-select' defaultValue="">
                {cats.map((ele)=><option value={ele.props.children}>{ele.props.children}</option>)}
            </select>
            <label>Tags:*</label>
            <div className="tags">{tags.map((ele,idx)=><div className="tag">{ele} &nbsp;<FaX size={"10px"} onClick={()=>deleteTag(idx)}/>&nbsp;</div>)}</div>
            <input type="text" placeholder="Enter Tags" ref={tagInput} onKeyDown={addTag}/>
            <label htmlFor="course-image">Course Thumbnail:*
                <div className="course-image-div">
                    <div className="cloud-icon"><CiCloudOn size={"30px"}/></div>
                    Drag and drop an image, or Click Here.<br/>
                    <span>Max 6MB</span>
                    <p><span>&middot; Aspect ratio 16:9</span><span> &middot; Recommended size 1024x576</span></p>
                </div>
            </label>
            <input type="file" accept="image/png, image/jpeg" multiple={false} onChange={HandleFile} placeholder="Enter Course Thumbnail" id="course-image" required/>
            <label>Benefits of the Course:*</label>
            <textarea type="text" placeholder="Enter Benefits" required/>
            <label>Requirements / Instructions*</label>
            <div className="instructions" ref={(ele)=>instruArray.current=ele}>
                <VariableInputArray element={<input type="text" placeholder="Enter Instruction"/>}/>
            </div>
            <button type="submit" style={{display:"inline-block"}} className="btn btn-semisquare yellow">Next</button>
            </form>
        </div>
    )
}
const AddSections = (props)=>{
    const [sections, setSections] = useState(props.sections||[]);
    return(
        <sectionContext.Provider value={{sections,setSections}}>
        <div className="addcourse-main">
            <h3 className="no-margin">Course Builder</h3>
            <div className="course-builder">
                <div className="sections-edit">
                    {sections}
                </div>
                <input type="" disabled placeholder="Add a section to build your course"/>
                <button type="button" className="btn btn-semisquare special" onClick={()=>setSections(sections.concat([<Section idx={sections.length}/>]))}><FaPlusCircle/> Add Section</button>
            </div>
        </div>
        </sectionContext.Provider>
    )
}
const InstructorCourses = ()=>{
    const [courses, setCourses] = useState([]);
    const [spin, setSpin] = useState(false);
    const [stage, setStage] = useState(0);
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
    return (
        <div className="instructor-courses-main">
            {spin &&<BarLoader width={"100%"}/>}
            {stage === 0?<>
                <div className="instructor-courses-heading relative">
                <div className="path white">Home / Dashboard / <span className="text-yellow">Courses</span></div>
                <h2 className="white">My Courses</h2>
                <button type="button" className="right-btn btn btn-semisquare yellow" onClick={()=>setStage(1)}><FaPlusCircle/>&nbsp;New</button>
            </div>
            <div className="course-table">
                {courses.map((ele)=><CourseDialog status={ele.status} createdAt={ele.createdAt} image={ele.thumbnail} price={ele.price} coursename={ele.courseName} description={ele.courseDescription} duration={ele.courseDuration}/>)}
            </div></>
            :<stageContext.Provider value={{stage, setStage}}><CreateCourse/></stageContext.Provider>}
            
        </div>
    )
}
export default InstructorCourses;