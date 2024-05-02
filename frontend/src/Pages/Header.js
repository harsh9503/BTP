import "../stylesheets/header.css";
import logo from "../logo.png";
import {Toaster} from "react-hot-toast";
import { useCookies } from "react-cookie";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons";
import { useEffect,useState, useContext} from "react";
import { catContext } from "../App";

import axios from "axios";
import { FaChalkboardTeacher, FaUser } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
const Header = (props)=>{
    const [cookie,setCookie] =useCookies(['user-data']);
    const {cats, setCats} = useContext(catContext); 
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BURL}/api/v1/course/showAllCategories`).then((res)=>{
            setCats(res.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[]);
    const handleClick = ()=>{
        if(cookie["user-data"]){
            window.location.href = "/user/profile";
            return;
        }
        if(props.page === "login"){
            window.location.href = "/signup";
        }
        else{
            window.location.href = "/login";
        }
    }
    return (
        <>
        <Toaster containerStyle={{marginTop:"50px",zIndex:"9999999"}}/>
        <div className="head">
            <img alt="logo" src={logo} id="img-logo"></img>
            <div className="links">
            <button type="button">Home</button>
            <div className="dropdown">
            <button type="button" className="catalog">Catalog
            </button>
                <div className="dropdown-content">
                    {cats.map((ele,idx)=>{
                return <button type="button" id={idx} onClick={()=>window.location.href="/catalog/"+ele._id}>{ele.name}</button>
            })}
                </div>
            </div>
            <button type="button">About Us</button>
            <button type="button">Contact Us</button>
            </div>
            <div className="features">
                <IconContext.Provider value={{color:"grey",size:"25px",className:"icons"}}>
                <span><FaMagnifyingGlass/></span>
                <span><MdOutlineShoppingCart/></span>
                </IconContext.Provider>
                <button type="button" className={cookie["user-data"]?"user-profile":"button"} onClick={handleClick}>{cookie['user-data']?<div><img src={cookie['user-data']?.image}></img>{cookie['user-data'].accountType==="Student"?<PiStudentBold/>:<FaChalkboardTeacher/>}</div>:props.page === "signup"?"Log In":"Sign In"}</button>
            </div>
        </div>
        </>
    )
}
export default Header;