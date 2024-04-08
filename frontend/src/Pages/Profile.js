import {useCookies} from "react-cookie";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import "../stylesheets/Profile.css";
const UpdateProfile =()=>{
    const [cookie, setCookie] = useCookies(['user-data']);
    const _user = cookie['user-data'];
    const [user, setUser] = useState();
    return (
        <div className="profile-main">
        <h2 className="profile-page-header">
            My Profile
        </h2>
        <div className="profile-page-info">
            <img src={user?user.image:_user.image}></img>
            <div className="profile-page-main-info">
                <h3 className="no-margin">Change Profile Picture</h3>
            <button type="button" style={{display:"inline-block"}}className="btn btn-semisquare yellow edit">Change</button>
            <button type="button" style={{display:"inline-block"}} className="btn btn-semisquare edit">Remove</button>
            </div>
            {/* <button type="button" className="btn btn-semisquare yellow"><FiEdit size={"25px"}/> &nbsp;Edit</button> */}
        </div>
        <div className="profile-page-details">
            <h3 className="no-margin">Personal Details</h3>
            <div className="row">
                <div className="col">
                <p className="no-margin">Display name:</p>
                    <input type="text" placeholder="John Doe"></input>
                </div>
                <div className="col">
                <p className="no-margin">Profession</p>
                    <input type="text" placeholder="Developer"></input>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <p className="no-margin">Date of Birth</p>
                    <input type="date" onChange={(event)=>{
                        if(new Date(event.target.value).getTime() > new Date().getTime()){
                            event.target.value = new Date().toJSON().slice(0,10);
                        }
                    }} max={new Date().toJSON().slice(0,10)}></input>
                </div>
                <div className="col">
                    <p className="no-margin">Gender</p>
                    <div className="radio gender">
                        <div>
                            <input type="radio" id="male" name="gender" value="male" defaultChecked/>
                            <div className="circle"><div className="small-circle"></div></div>
                            <label htmlFor="male" value="male">Male</label>
                        </div>
                        <div >
                            <input type="radio" id="female" name="gender" value="female"/>
                            <div className="circle"><div className="small-circle"></div></div>
                            <label htmlFor="female" value="female">Female</label>
                        </div>
                        <div >
                            <input type="radio" id="other" name="gender" value="other"/>
                            <div className="circle"><div className="small-circle"></div></div>
                            <label htmlFor="other" value="other">Other</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
const Profile = ()=>{
    const [cookie, setCookie] = useCookies(['user-data']);
    console.log(cookie["user-data"]);
    const _user = cookie["user-data"];
    const [user, setUser] = useState();
    const [edit, setEdit] = useState(false);
    if(edit){
        return <UpdateProfile/>
    }
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
                <button type="button" className="btn btn-semisquare yellow" onClick={()=>{setEdit(true);}}><FiEdit size={"25px"}/> &nbsp;Edit</button>
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