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
import { IoCheckmark, IoCheckmarkSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
const sectionContext = createContext([]);
const courseContext = createContext("");
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
              <IoIosArrowDown clickable="true" onClick={(event)=>event.target.parentElement.toggleAttribute("active")}/>
              <div className="subsection-actions">
              <FaPen clickable="true"/> <MdDelete clickable="true" onClick={props.delete}/>
              </div>
          </div>
          <div className="subsection-description">{props.description}</div>
      </div>
    )
}
const Section = (props)=>{
    const [subsections, setSubsections] = useState(props.subsections||[]);
    const {courseId,setSectionId,dialog,setSetterSubSection} = useContext(courseContext);
    const section = useRef("");
    let initialValue = section.current.value;

    const changeSectionName = ()=>{
         if(section.current.value === initialValue) return;
         const promise = axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/updateSection`,{
            sectionId: props.id,
            sectionName: section.current.value,
            courseId: courseId
         },{
            withCredentials: true
         })
         promise.then((res)=>{
             initialValue = section.current.value;
         })
         promise.catch((err)=>{
            section.current.value = initialValue;
         })
         toast.promise(promise,{
            success: `Changed Section to ${section.current.value}`,
            error: (err)=>err?.response?.data?.message||"Error Updating Section",
            loading: "Changing section"
         })
    }
    const toggleEdit = ()=>{
        section.current.toggleAttribute("disabled");
    }
    const temp = subsections?.map((ele,idx)=>{
        return <Subsection title={ele.title} duration={ele.timeDuration} description={ele.description} url={ele.videoUrl}/>
    });
return(
    <div className="section-edit">
        <div className="section-name-edit" onClick={(event)=>{event.target.parentElement.toggleAttribute("active");}}>
         <FaList/> &nbsp; &nbsp;<input type="text" className="inplace" ref={section} disabled onBlur={changeSectionName} defaultValue={props.sectionName}/>
         <div className="section-info">
            <IconContext.Provider value={{style:{marginRight:"10px", verticalAlign:"text-top"}}}>
            <FaPen clickable="true" onClick={toggleEdit}/> <MdDelete clickable="true"/>
            <hr className="vertical"/>
            <FaCaretDown clickable="true"/>
            </IconContext.Provider>
         </div>
        </div>
        <div className="subsections-edit">
        {temp}
        <div className="subsection-adder text-yellow" onClick={()=>{setSectionId(props.id);setSetterSubSection(()=>(val)=>setSubsections(val));dialog.current.showModal()}}><AiOutlinePlus/>&nbsp;Add Lecture</div>
        </div>
    </div>
)
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
            <div className="course-col course-actions">
                <FaPen clickable="true"/><MdDelete clickable="true" onClick={props.delete}/></div>
        </div>
    )
}
const PublishPage = ()=>{
    return (<>
        <div className="publish-course-main">
            <h2 className="no-margin">Publish Settings</h2>
            <div className="checkbox">
                <label htmlFor="public" className="checkbox-label"><input type="checkbox" id="public"/><IoCheckmarkSharp display={"none"}/> Make this Course Public</label>
            </div>
        </div>
        <div className="navigators">
            <button type="button" className="btn btn-semisquare">{"< Back"}</button>
            <button type="button" className="btn btn-semisquare">Save as a Draft</button>
            <button type="button" className="btn btn-semisquare yellow">Save and Publish</button>
        </div>
        </>
    )
}
const stageContext = React.createContext(0);
const CreateCourse = ()=>{
    const {stage,setStage} = useContext(stageContext); 
    const curr_stage = [<AddCourseDetails/>,<AddSections/>,<PublishPage/>]
    const [courseId,setCourseId] = useState("66329046302a8a549aa984a7");
    const [sectionId, setSectionId] = useState("");
    const [setterSubsection, setSetterSubSection] = useState(()=>()=>{console.log("Dummy Function!")});
    const dialog = useRef("");
    const data = useRef(new Array(3));
    const addLecture = (e)=>{
        e.preventDefault();
        dialog.current.close();
        const promise = axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/addSubSection`,{
            sectionId: sectionId,
            title: data.current[1].value,
            description: data.current[2].value,
            video: data.current[0].files[0]
        },{
            withCredentials: true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        promise.then((res)=>{
            console.log(setterSubsection);
            setterSubsection(res.data.data.subSection)
        })
        toast.promise(promise, {
            success: "Lecture Added Successfully",
            error:(err)=>err?.response?.data?.message||"Error Adding the Lecture",
            loading: "Uploading Lecture"
        })
    }
    return(
        <courseContext.Provider value={{courseId,setCourseId,setSectionId,dialog,setterSubsection,setSetterSubSection}}>
        <div className="create-course-main">
            <dialog ref={dialog}>
                <form onSubmit={addLecture}>
                    <label htmlFor="course-video">Lecture Video:*
                        <div className="course-video-div">
                            <div className="cloud-icon"><CiCloudOn size={"30px"}/></div>
                            Drag and drop a video, or Click Here.<br/>
                            <span>Max: 120MB</span>
                            <p><span>&middot; Aspect ratio 16:9</span><span> &middot; Recommended size 1024x576</span></p>
                        </div>
                    </label>
                    <input type="file" id="course-video" ref={(ele)=>data.current[0]=ele} name="video" accept="video/*" required/>
                    <label htmlFor="title">Lecture Title: *</label>
                    <input type="text" ref={(ele)=>data.current[1]=ele} maxLength="30" id="title" placeholder="Enter Lecture Title" required/>
                    <label htmlFor="description">Lecture Description: *</label>
                    <textarea maxLength="255" ref={(ele)=>data.current[2]=ele} id="description" placeholder="Enter Description" required/>
                    <button type="submit" className="btn btn-semisquare yellow add-lecture">Add</button>
                </form>
            </dialog>
            <div className="back-button"><FaAngleLeft/> Back to Dashboard</div>
            <div className="course-tracker">
                <div className={"course-circle "+ (stage>=1?stage===1?"current-stage":"completed":"")}>{stage>1?<IoCheckmark size={"25px"}/>:1}</div>
                <hr/>
                <div className={"course-circle "+ (stage>=2?stage===2?"current-stage":"completed":"")}>{stage>2?<IoCheckmark size={"25px"}/>:2}</div>
                <hr/>
                <div className={"course-circle "+ (stage>=3?stage===3?"current-stage":"completed":"")}>{stage>3?<IoCheckmark size={"25px"}/>:3}</div>
            </div>
                {curr_stage[stage-1]}
        </div>
        </courseContext.Provider>
    )
}
const VariableInputArray = (props)=>{
    const [count, setCount] = useState(1);
    const inputs = new Array(Math.min(6,count));
    let idx=0;
    inputs.fill(<input type="text" ref={(ele)=>props.reference.current[6].current[idx++]=ele} placeholder="Enter Instruction" style={{marginBottom:"10px"}}/>)
    return(
        <>
        {inputs}
        {count < 6 && <button type="button" className="link" onClick={()=>{setCount(count+1)}}>Add</button>}
        </>
    )
}
const AddCourseDetails = ()=>{
    const cats = useContext(catContext).cats;
    const {courseId, setCourseId} = useContext(courseContext);
    const [tags, setTags] = useState([]);
    const instruArray = useRef("");
    const data = useRef(new Array(7));
    data.current[6] = useRef(new Array(6));
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
    const HandleSubmit = (e)=>{
        e.preventDefault();
        const formData = {
            "courseName":data.current[0].value,
            "courseDescription":data.current[1].value,
            "price":data.current[2].value,
            "category":data.current[3].value,
            "tag":JSON.stringify(tags),
            "thumbnailImage":data.current[4].files[0],
            "whatYouWillLearn":JSON.stringify([data.current[5].value]),
            "instructions":JSON.stringify(data.current[6].current?.reduce((acc,ele)=>{if(ele?.value){acc.push(ele?.value)} return acc;},[]))
        }
        
        const promise = axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/createCourse`,formData,{
            withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        promise.then((res)=>{
            console.log(res.data);
            setCourseId(res.data.data._id);
            setStage(2);
        })
        toast.promise(promise,{
            success:"Course Created!",
            error:(err)=>err?.response?.data?.message||"Error Occurred!",
            loading: "Creating Course!"
        });
    }
    return(
        <div className="addcourse-main">
            <form onSubmit={HandleSubmit}>
            <label htmlFor="title">Course Title:*</label>
            <input type="text" ref={(ele)=>data.current[0]=ele} id="title" placeholder="Enter Course Title" required/>
            <label>Course Short Description:*</label>
            <textarea type="text" ref={(ele)=>data.current[1]=ele} placeholder="Enter Description" required/>
            <label>Price:*</label>
            <input type="number" id="title" ref={(ele)=>data.current[2]=ele} placeholder="Enter Price" required/>
            <label>Category:*</label>
            <select className='category-select' ref={(ele)=>data.current[3]=ele} defaultValue="">
                {cats.map((ele)=><option value={ele._id}>{ele.name}</option>)}
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
            <input type="file" ref={(ele)=>data.current[4]=ele} accept="image/png, image/jpeg" multiple={false} onChange={HandleFile} placeholder="Enter Course Thumbnail" id="course-image" required/>
            <label>Benefits of the Course:*</label>
            <textarea type="text" ref={(ele)=>data.current[5]=ele} placeholder="Enter Benefits" required/>
            <label>Requirements / Instructions*</label>
            <div className="instructions" ref={(ele)=>instruArray.current=ele}>
                <VariableInputArray reference={data} element={<input type="text" placeholder="Enter Instruction"/>}/>
            </div>
            <button type="submit" style={{display:"inline-block"}} className="btn btn-semisquare yellow">Next</button>
            </form>
        </div>
    )
}
const AddSections = (props)=>{
    const [sections, setSections] = useState(props.sections);
    const {courseId} = useContext(courseContext);
    const newSection = useRef("");
    const addSection = ()=>{
        if(!newSection.current.value){
            newSection.current.focus();
            return;
        }
        const promise = axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/addSection`,{
            sectionName:newSection.current.value,
            courseId:courseId
        },{
            withCredentials: true
        });
        promise.then((res)=>{
            setSections(res.data.updatedCourse.courseContent);
            newSection.current.value = "";
        })
        toast.promise(promise, {
            success: `Created Section ${newSection.current.value}`,
            loading: `Adding Section ${newSection.current.value}`,
            error: (err)=>err?.response?.data?.message||"Error Adding the Section"
        })
    }
    return(
        <sectionContext.Provider value={{sections,setSections}}>
        <div className="addcourse-main">
            <h3 className="no-margin">Course Builder</h3>
            <div className="course-builder">
                <div className="sections-edit">
                    {sections?.map((ele)=><Section id={ele._id} sectionName={ele.sectionName} subsections={ele.subSection}/>)}
                </div>
                <input type="" ref={newSection} placeholder="Add a section to build your course"/>
                <button type="button" className="btn btn-semisquare special" onClick={addSection}><FaPlusCircle/> Add Section</button>
            </div>
        </div>
        </sectionContext.Provider>
    )
}
const InstructorCourses = ()=>{
    const [courses, setCourses] = useState([]);
    const [spin, setSpin] = useState(false);
    const [stage, setStage] = useState(0);
    const deleteCourse = (id)=>{
        const promise = axios.delete(`${process.env.REACT_APP_BURL}/api/v1/course/deleteCourse`,{
            data:{
                courseId: id
            },
            withCredentials: true
        });
        promise.then(()=>{
            setCourses(courses.filter((ele)=>ele._id !== id));
        })
        toast.promise(promise, {
            success:"Course Deleted Successfully!",
            error: (err)=>err?.response?.data?.message||"Error Deleting Course",
            loading: "Deleting Course"
        })
    }
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
                {courses.map((ele)=><CourseDialog delete={()=>deleteCourse(ele._id)} status={ele.status} courseContent={ele.courseContent} createdAt={ele.createdAt} image={ele.thumbnail} price={ele.price} coursename={ele.courseName} description={ele.courseDescription} duration={ele.courseDuration}/>)}
            </div></>
            :<stageContext.Provider value={{stage, setStage}}><CreateCourse/></stageContext.Provider>}
            
        </div>
    )
}
export default InstructorCourses;