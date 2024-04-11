import {useCookies} from "react-cookie";
import { useState,useRef, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import "../stylesheets/Profile.css";
import {BarLoader} from 'react-spinners';
import codes from "../fetchData/contry-code.json";
import delete_icon from "../delete-icon.svg";
import toast from "react-hot-toast";
import axios from "axios";
const UpdateProfile =()=>{
    const [cookie, setCookie, removeCookie] = useCookies(['user-data']);
    const _user = cookie['user-data'];
    const [user, setUser] = useState();
    const [dialog, setDialog] = useState(false);
    const refs = useRef(new Array(11));
    const ch = useRef(new Array(6));
    let err = 0;
    const [spin, setSpin] = useState(false);
    const HandleSubmit = async()=>{
            setSpin(true);
            const req = async()=>{
                const res = await axios.put(`${process.env.REACT_APP_BURL}/api/v1/profile/updateProfile`,{
                    firstName: refs.current[0].value.split(" ")[0],
                    lastName: refs.current[0].value.slice(refs.current[0].value.split(" ")[0].length+1)||"",
                    dateOfBirth: refs.current[2].value,
                    about:refs.current[8].value,
                    contactNumber: refs.current[6].value+refs.current[7].value,
                    gender:refs.current[3].checked?"Male":refs.current[4].checked?"Female":"Other"
                },{
                    withCredentials: true
                })
                if(res.data.success){
                    setCookie('user-data',res.data.updatedUserDetails);
                }
                else{
                    window.alert("Error occurred");
                }
                setSpin(false);
            }
            req();
    }
    useEffect(()=>{
        const func = async()=>{
            setSpin(true);
            let data = await axios.get(`${process.env.REACT_APP_BURL}/api/v1/profile/getUserDetails`,{
                withCredentials: true
            });
            data = data.data.data;
            setCookie('user-data',JSON.stringify(data));
            refs.current[0].value = data?.firstName+" "+data?.lastName;
            refs.current[1].value = data?.additionalDetails?.about||"";
            refs.current[2].value = data?.additionalDetails?.dateOfBirth||"";
            if(data?.additionalDetails?.gender === "male") refs.current[3].checked = true;
            if(data?.additionalDetails?.gender === "female") refs.current[4].checked = true;
            if(data?.additionalDetails?.gender === "other") refs.current[5].checked = true;
            refs.current[6].value = "+"+data?.additionalDetails?.contactNumber?.toString().slice(0,2);
            refs.current[7].value = data?.additionalDetails?.contactNumber?.toString().slice(2);
            setSpin(false);
        }    
        func();
    },[]);
    const handleFile = async(event)=>{
        let file = event?.target?.files?event.target.files[0]:undefined;
        if(event.type === 'change' && !file){
            return;
        }
        setSpin(true);
        const res = await axios.put(`${process.env.REACT_APP_BURL}/api/v1/profile/updateDisplayPicture`,{
            displayPicture: file
        },{ 
            withCredentials: true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        if(res.data.success){
            setCookie('user-data',res.data.data);
        }
        else{
            window.alert("Error Uploading Image");
        }
        setSpin(false);
    }
    const deleteAccount = async()=>{
        setSpin(true);
        const res = await axios.delete(`${process.env.REACT_APP_BURL}/api/v1/profile/deleteProfile`,{
            withCredentials: true
        })
        if(res.data.success){
            removeCookie('user-data');
            window.location.href = "/";
        }
        else{
            window.alert("Error Deleting your account!");
        }
        setSpin(false);
    }
    const deleteAcc=(
            <div className="delete-dialog">
                <div className="delete-confirm">
                    Are you sure you want to delete your account?
                    <br/>
                    <button type="button" className="btn btn-semisquare" onClick={()=>deleteAccount()}>Delete</button>
                    <button type="button" className="btn btn-semisquare" onClick={()=>setDialog(false)}>Cancel</button>
                </div>
            </div>
        )
    return (
        <div className="profile-main">
            {spin &&<BarLoader size={"60px"} className='loader' color="blue" width={"100%"}/>}
        <h2 className="profile-page-header">
            My Profile
        </h2>
        <div className="profile-page-info">
           <img src={user?user.image:_user.image} style={{opacity:spin?"0":"1"}}></img>
            <div className="profile-page-main-info">
                <h3 className="no-margin">Change Profile Picture</h3>
            <label className="btn btn-semisquare yellow">
                Change
                <input type="file" onChange={handleFile}/>
            </label>
            <button type="button" style={{display:"inline-block"}} className="btn btn-semisquare edit" onClick={handleFile}>Remove</button>
            </div>
        </div>
        <div className="profile-page-details">
            <h3 className="no-margin">Personal Details</h3>
            <div className="row">
                <div className="col">
                <p className="no-margin">Display name:</p>
                    <input type="text" placeholder="Enter name" ref={(ele)=>refs.current[0]=ele}></input>
                </div>
                <div className="col">
                <p className="no-margin">Profession</p>
                    <input type="text" placeholder="Developer" ref={(ele)=>refs.current[1]=ele}></input>
                </div>
            </div>
            {dialog && deleteAcc}
            <div className="row">
                <div className="col">
                <p className="no-margin">Date of Birth</p>
                    <input type="date" onChange={(event)=>{
                        if(new Date(event.target.value).getTime() > new Date().getTime()){
                            event.target.value = new Date().toJSON().slice(0,10);
                        }
                    }} max={new Date().toJSON().slice(0,10)} ref={(ele)=>refs.current[2]=ele}></input>
                </div>
                <div className="col">
                    <p className="no-margin">Gender</p>
                    <div className="radio gender">
                        <div>
                            <input type="radio" id="male" name="gender" value="male" defaultChecked ref={(ele)=>refs.current[3]=ele}/>
                            <div className="circle"><div className="small-circle"></div></div>
                            <label htmlFor="male" value="male">Male</label>
                        </div>
                        <div >
                            <input type="radio" id="female" name="gender" value="female" ref={(ele)=>refs.current[4]=ele}/>
                            <div className="circle"><div className="small-circle"></div></div>
                            <label htmlFor="female" value="female">Female</label>
                        </div>
                        <div >
                            <input type="radio" id="other" name="gender" value="other" ref={(ele)=>refs.current[5]=ele}/>
                            <div className="circle"><div className="small-circle"></div></div>
                            <label htmlFor="other" value="other">Other</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <p className="no-margin">Phone no:</p>
                    <div className="phone-number phoneInput">
                        <select id="select-state" placeholder="Pick country" ref={(ele)=>refs.current[6]=ele}>
                            {codes.map((ele)=><option value={ele.dial_code}>{`(${ele.dial_code})`}</option>)}
                        </select>
                        <input type="number" maxLength={10} placeholder="Enter Phone No:" ref={(ele)=>refs.current[7]=ele}></input>
                    </div>
                </div>
                <div className="col">
                <p className="no-margin">About</p>
                    <input type="text" placeholder="Enter Bio Details" ref={(ele)=>refs.current[8]=ele}></input>
                </div>
            </div>
        </div>
        <div className="delete-account">
            <img src={delete_icon}></img>
            <div className="confirm-delete">
                <h3 className="no-margin">Delete Account</h3>
                Would you like to delete account?<br/>If this account contains Paid Courses, Deleting this account will remove all the courses associated with it.<br/>
                <a onClick={()=>{setDialog(true);console.log("HELLO")}}>I want to delete my account.</a>
            </div>
        </div>
        <div className="btns">
            <button type="button" className="btn btn-semisquare">Cancel</button>
            <button type="button" className="btn btn-semisquare yellow" style={{marginRight:"0px"}} onClick={HandleSubmit}>Save</button>
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
                    <div className="field">Contact Number <br/> {"+"+_user.additionalDetails?.contactNumber?.toString()||"Empty"}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;