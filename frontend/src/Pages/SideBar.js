import { IconContext } from "react-icons";
import "../stylesheets/SideBar.css"
import { CgProfile } from "react-icons/cg";
import { LiaBookSolid } from "react-icons/lia";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import {useParams, a} from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
export const SideBar = ()=>{
    const {userPath} = useParams();
    const [cookie] = useCookies(['user-data']);
    useEffect(()=>{
        document.getElementsByClassName(userPath)[0]?.classList?.add("current");
    },[userPath]);
    if(!cookie["user-data"]){
        return <></>;
    }
    return (
        <div className="sidebar-main">
            <IconContext.Provider value={{style:{marginRight:"10px"},size:"20px"}}>
            <div className="user-routes">
                <a href="/user/profile">
                <div className="route profile">
                    <CgProfile/>
                    My Profile
                </div>
                </a>
                <a href="/user/enrolled-courses">
                <div className="route enrolled-courses">
                    <LiaBookSolid/>
                    Enrolled Courses
                </div>
                </a>
                <a href="/user/wishlist">
                <div className="route wishlist">
                    <FaRegBookmark/>
                    WishList
                </div>
                </a>
                <a href="/user/purchase-history">
                <div className="route purchase-history">
                    <AiOutlineShoppingCart/>
                    Purchase History
                </div>
                </a>
                <a href="/user/mycourses">
                <div className="route mycourses">
                    <PiStudent/>    
                    Courses
                </div>
                </a>
            </div>
            <hr/>
            <div className="actions">
                <a href="/user/settings">
                <div className="route settings">
                    <IoSettingsOutline/>
                    Settings
                </div>
                </a>
                <a href="/user/logout">
                <div className="route log-out">
                    <IoIosLogOut/>
                    Log Out
                </div>
                </a>
            </div>
            </IconContext.Provider>
        </div>
    )
}