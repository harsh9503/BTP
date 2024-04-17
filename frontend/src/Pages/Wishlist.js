import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { IoMdCheckmarkCircleOutline,IoIosRemoveCircleOutline } from "react-icons/io";
import "../stylesheets/Wishlist.css";
const CourseDialog = (props)=>{
    const thisEle = useRef("");
    useEffect(()=>{
        
    },[]);
    return (
        <div className="course-dialog" ref={thisEle}>
            <div className="course-info-enrolled">
                <img className="course-icon" src={props.image}></img>
                <div className="course-data-enrolled">
                    <p className="no-margin">{props.coursename}</p>
                </div>
            </div>
            <div className="course-instructor">{props.instructor}</div>
            <div className="course-price">{props.price}</div>
            <div className="course-rating">{props.avgRating}</div>
            <div className="course-menu" onClick={(event)=>{event.target?.classList?.toggle("active")}}>&#8942;
                <div className="menu">
                    <div className="no-margin"><IoMdCheckmarkCircleOutline display={"inline-block"} size={"20px"}/>&nbsp;&nbsp;Mark as Completed</div>
                    <div className="no-margin"><IoIosRemoveCircleOutline display={"inline-block"} size={"20px"}/>&nbsp;&nbsp;Remove</div>
                </div>
            </div>
        </div>
    )
}
const Wishlist = () =>{
    const [wishlist, setWishlist] = useState([]);
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BURL}/api/v1/profile/getwishlist`,{},{withCredentials:true}).then((res)=>{
            setWishlist(res.data.wishlist);
        }).catch((err)=>{
            console.log(err);
        })
    },[]);
    return (
        <div className="wishlist-main">
            <div className="path white">
                    Home / Dashboard / <span className="text-yellow">Wishlist</span>
            </div>
            <h2 className="white">Wishlist</h2>
            <div className="wishlist-container">
                {wishlist.map((ele)=>{
                    return <CourseDialog instructor={ele.instructor} id={ele._id} coursename={ele.courseName} image={ele.thumbnail} price={ele.price} avgRating={ele.avgRating}/>
                })}
            </div>
        </div>
    )
}
export default Wishlist;