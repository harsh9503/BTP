import {BarLoader} from 'react-spinners';
import { useState,useRef } from 'react';
import "../stylesheets/ChangePassword.css";
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";
import { IconContext } from 'react-icons';
function ChangedPassword(){
    return (
        <>
        <div className="changeMain">
            <div className="changePanel">
                <h1>Reset complete!</h1>
                <h3>All done! Your password has been reset. You can login with your new password.</h3>
                <button type="button" className="btn" onClick={()=>""}>Return to Login</button>
            </div>
        </div>
        </>
    )
}
function ChangePassword(){
    const [spin, setSpin] = useState(false);
    const [completed, setCompleted] = useState(false);
    const HandleSubmit=()=>{
          setSpin(true);
          setTimeout(()=>{
            setSpin(false);
            setCompleted(true);
        },4000);
    }
    const ch = useRef(new Array(6));
    const cpass = useRef("");
    const pref = useRef("");
    if(completed){
        return <ChangedPassword/>
    }
    const check = () =>{
        const pass = pref.current.value;
         let b = new Array(6);
         let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          for(let i=0;i<pass.length;i++){
             if(/[a-z]/.test(pass[i])){
                b[0]=true;
             }
             else if(/[A-Z]/.test(pass[i])){
                b[2]=true;
             }
             else if(format.test(pass[i])){
                b[1]=true;
             }
             else if(/[1-9]/.test(pass[i])){
                b[4]=true;
             }
          }
          if(pass.length >= 8) b[3] = true;
          let count = 0;
          if(pass.length>0 && pass === cpass.current.value) b[5] = true;
          for(let i=0;i<6;i++){
            if(b[i] === true){
                count++;
                ch.current[i].setAttribute("aria-satisfied","true");
            }
            else{
                ch.current[i].setAttribute("aria-satisfied","false");
            }
          }
        if(count == 6){
            console.log("GO");
            const ele = document.getElementsByClassName("btn")[0];
            ele.disabled = false;
            ele.addEventListener("click",HandleSubmit);
        }
        else{
            document.getElementsByClassName("btn")[0].disabled = true;
        }

    }
    return (
        <>
        {spin &&<BarLoader color="#36d7b7" width={"100%"}/>}
        <div className="changeMain">
            <div className="changePanel">
                <h1>Choose new password</h1>
                <h3>Almost done. Enter your new password and you're <br/>all set.</h3>
                <p>New Password: *</p>
                <input type="password" placeholder="********" onChange={check} ref={pref}></input>
                <p>Confirm New Password: *</p>
                <input type="password" placeholder="********" onChange={check} ref={cpass}></input>
                <div className='checks'>
                    <IconContext.Provider value={{className:'ic'}}>
                    <div className='1' aria-satisfied="false" ref={(element)=>ch.current[0]=element}>
                        <GoCheckCircleFill/>
                        <GoXCircleFill/>
                        <p>One lowercase character</p>
                    </div>
                    <div className='2' aria-satisfied="false" ref={(element)=>ch.current[1]=element}>
                        <GoCheckCircleFill/>
                        <GoXCircleFill/>
                        <p>One special character</p>
                    </div>
                    <div className='3' aria-satisfied="false" ref={(element)=>ch.current[2]=element}>
                        <GoCheckCircleFill/>
                        <GoXCircleFill/>
                        <p>One uppercase character</p>
                    </div>
                    <div className='4' aria-satisfied="false" ref={(element)=>ch.current[3]=element}>
                        <GoCheckCircleFill/>
                        <GoXCircleFill/>
                        <p>8 character minimum</p>
                    </div>
                    <div className='5' aria-satisfied="false" ref={(element)=>ch.current[4]=element}>
                        <GoCheckCircleFill/>
                        <GoXCircleFill/>
                        <p>One number</p>
                    </div>
                    <div className='6' aria-satisfied="false" ref={(element)=>ch.current[5]=element}>
                        <GoCheckCircleFill/>
                        <GoXCircleFill/>
                        <p>Password matching</p>
                    </div>
                    </IconContext.Provider>
                </div>
                <button type="button" className="btn" onClick={HandleSubmit} disabled>Reset Password</button>
            </div>
        </div>
        </>
    )
}
export default ChangePassword;