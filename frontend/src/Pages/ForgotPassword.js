import {BarLoader} from 'react-spinners';
import { useState,useRef } from 'react';
import "../stylesheets/ForgotPassword.css"
import { IconContext } from 'react-icons';
import { HiOutlineArrowLeft } from "react-icons/hi";

function EmailSent(props){
    const HandleSubmit = ()=>{
        //Send email again!
    }
    return (
        <>
        <div className="ForgotMain">
            <div className="ForgotPanel">
                <h2>Check Email</h2>
                <p>We have sent the reset email to <br/> {props.email}</p>
                <button type="button" onClick={HandleSubmit}>Resend email</button>
                <div className='back-block' onClick={()=>""}>
                    <IconContext.Provider value={{size:"20px"}}>
                        <HiOutlineArrowLeft/>
                    </IconContext.Provider>
                    <p>Back to Login</p>
                </div>
            </div>
        </div>
        </>
    )
}
function ForgotPassword(){
    const [spin, setSpin] = useState(false);
    const [rerun, setRerun] = useState(false);
    const email = useRef("");
    let e = email.current.value;
    const HandleSubmit=async()=>{
        setSpin(true);
        setTimeout(()=>{
            setSpin(false);
            setRerun(true);
        },3000);
    }
    if(rerun){
        return <EmailSent email={e}/>
    }
    return (
        <>
        {spin &&<BarLoader color="#36d7b7" width={"100%"}/>}
        <div className="ForgotMain">
            <div className="ForgotPanel">
                <h2>Reset your password</h2>
                <p>Have no fear. We'll email you instructions to reset your password. <br/> If you don't have access to your email we can try account recovery</p>
                <p>Email Address: *</p>
                <input type="text" placeholder="Enter Email Address" ref={email}></input>
                <button type="button" onClick={HandleSubmit}>Sign in</button>
                <div className='back-block' onClick={()=>""}>
                    <IconContext.Provider value={{size:"20px"}}>
                        <HiOutlineArrowLeft/>
                    </IconContext.Provider>
                    <p>Back to Login</p>
                </div>
            </div>
        </div>
        </>
    )
}


export default ForgotPassword;