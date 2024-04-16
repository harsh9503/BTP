import { IconContext } from "react-icons";
import "../stylesheets/SideBar.css"
import { CgProfile } from "react-icons/cg";
import { LiaBookSolid } from "react-icons/lia";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import {useParams, Link} from "react-router-dom";
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
                <Link to="/user/profile">
                <div className="route profile">
                    <CgProfile/>
                    My Profile
                </div>
                </Link>
                <Link to="/user/enrolled-courses">
                <div className="route enrolled-courses">
                    <LiaBookSolid/>
                    Enrolled Courses
                </div>
                </Link>
                <Link to="/user/wishlist">
                <div className="route wishlist">
                    <FaRegBookmark/>
                    WishList
                </div>
                </Link>
                <Link to="/user/purchase-history">
                <div className="route purchase-history">
                    <AiOutlineShoppingCart/>
                    Purchase History
                </div>
                </Link>
                <Link to="/user/mycourses">
                <div className="route mycourses">
                    <PiStudent/>    
                    Courses
                </div>
                </Link>
            </div>
            <hr/>
            <div className="actions">
                <Link to="/user/settings">
                <div className="route settings">
                    <IoSettingsOutline/>
                    Settings
                </div>
                </Link>
                <Link to="/user/logout">
                <div className="route log-out">
                    <IoIosLogOut/>
                    Log Out
                </div>
                </Link>
            </div>
            </IconContext.Provider>
        </div>
    )
}