import { useEffect, useState } from "react";
import "../stylesheets/Catalog.css";
import {useParams} from "react-router-dom";
import CourseCard from "./Coursecard";
import axios from "axios";
const CatalogMain=()=>{
        const {catalogId} = useParams();
        const [catalog,setCatalog] = useState("");
        const [desc,setDesc] = useState("");
        const [course,setCourse] = useState([]);
        const [ratings, setRatings] = useState([]);
        useEffect(async ()=>{
            const res = await axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/getCategoryInfo`,{
                catalogId:catalogId
            }).catch((err)=>{
                console.log(err);
            })
            setCatalog(res.data.data.name);
            setDesc(res.data.data.description);
            const temp = res.data.data.courses.map((c,idx)=>{
                return <CourseCard _id={c._id} price={c.price} index={idx} coursename={c.courseName} thumbnail={c.thumbnail} instructor={c.instructor.firstName+" "+c.instructor.lastName}/>
            });
            setCourse(temp);
            // const fetchedCourses = res.data.data.courses;
            // const requests = new Array(fetchedCourses.length);
            // for(let i=0;i<fetchedCourses.length;i++){
            //     requests[i] = new Promise(async(res,rej)=>{
            //     })
            // }
            // Promise.all(requests).then((res)=>{
            //     console.log(res);
            // });
        },[]);
    return (
        <>
        <div className="catalog-head">
            <div className="catalog-head-desc">
                <div className="div-path white">
                    {`Home / Catalog / `}<span className="text-yellow">{catalog?catalog[0].toUpperCase() +catalog.slice(1):""}</span>
                </div>
                <h2 className="white">{catalog}</h2>
                <p className="catalog-description">{desc}</p>
            </div>
            <div className="catalog-head-related">
            </div>
        </div>
        <div className="catalog-main">
            <h2>Courses to get you started</h2>
            <div className="course-category">
                <input type="radio" id="Most-popular" name="course-category" value="Most-popular" defaultChecked></input><label htmlFor="Most-popular"><p>Most Popular</p></label>
                <input type="radio" id="New" name="course-category" value="New"></input><label htmlFor="New"><p>New</p></label>
                <input type="radio" id="Trending" name="course-category" value="Trending"></input><label htmlFor="Trending"><p>Trending</p></label>
                <hr></hr>
            </div>
            <div className="courses">
            {course}
            </div>
        </div>
        </>
    )
}

export default CatalogMain;