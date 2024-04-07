import {useCookies} from "react-cookie";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import "../stylesheets/Profile.css";
const Profile = ()=>{
    const [cookie, setCookie] = useCookies(['user-data']);
    console.log(cookie["user-data"]);
    const _user = cookie["user-data"];
    const [user, setUser] = useState();
    return (
        <div className="profile-main">
            <div className="page-path white">
                    {`Home / Dashboard / `}
                    <span className="text-yellow">{"My Profile"}</span>
            </div>
            <h2 className="profile-page-header">
                My Profile
            </h2>
            <div className="profile-page-info">
                <img src={user?user.image:_user.image}></img>
                <div className="profile-page-main-info">
                    <h3 className="no-margin">{user?user.firstName+" "+user.lastName:_user.firstName+" "+_user.lastName}</h3>
                    <p className="no-margin">{user?user.email:_user.email}</p>
                </div>
                <button type="button" className="btn btn-semisquare yellow"><FiEdit size={"25px"}/> &nbsp;Edit</button>
            </div>
            <div className="profile-page-details">
                <div className="profile-details-top">
                    <h3 className="no-margin">Personal Details</h3>
                    <button type="button" className="btn btn-semisquare yellow no-margin"><FiEdit size={"25px"}/> &nbsp;Edit</button>
                </div>
                <div className="profile-page-fields">
                    <div className="field">First Name<br/>{_user.firstName}</div>
                    <div className="field">Last Name<br/>{_user.lastName}</div><br/>
                    <div className="field">Email<br/>{_user.email}</div>
                    <div className="field">Contact Number <br/> {_user.contactNumber||"Empty"}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;