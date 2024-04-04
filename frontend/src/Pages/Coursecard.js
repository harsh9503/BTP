import { FaStar, FaRegStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../stylesheets/Coursecard.css"
import axios from "axios";
import { useEffect, useState } from "react";
const CourseCard = (props)=>{
    const stars = [];
    const [rating, setRating] = useState(0);
     for(let i=1;i<=5;i++){
        if(i <= rating) stars.push(<FaStar/>);
        else stars.push(<FaRegStar/>)
    }
    useEffect(()=>{
        document.getElementsByClassName("course-main")[props.index].addEventListener("click",props.onclick);
        axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/getAverageRating`,{
            courseId : props._id
        }).then((result)=>{
            setRating(result.data.averageRating);
        })
    },[]);
    return(
        <div className="course-main">
            <div className="div-thumbnail">
                <img className="thumbnail" src={props.thumbnail}></img>
            </div>
            <div className="course-info">
                <p className="course-name">{props.coursename}</p>
                <p className="instructor-name">{props.instructor}</p>
                <div className="review-stars">
                <p>{rating}</p>
                <IconContext.Provider value={{size:"20px",style:{"display":"inline-block",marginRight:"5px"}}}>
                    {stars}
                </IconContext.Provider>
                </div>
                <div className="course-price">{"Rs. "+props.price.toLocaleString('en-US')}</div>
            </div>
        </div>
    )
}
export default CourseCard;