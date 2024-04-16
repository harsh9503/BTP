import { useState } from 'react';
import axios from 'axios';
import {toast} from "react-hot-toast";
import "../stylesheets/VerifyEmail.css"
import { useCookies } from 'react-cookie';
function VerifyCard(){
    window.onload = () =>{
        document.getElementsByTagName("input")[0].focus();
    }
    let code = new Array(6);
    const [cookie, setCookie] = useCookies(['user-data']);
    const Verify=()=>{
          let int_code = code.join("");
          const promise = axios.post(`${process.env.REACT_APP_BURL}/api/v1/auth/signup`,{
            ...JSON.parse(localStorage.getItem("user-data")),...{otp:int_code}
          }).then((res)=>{
            console.log("HERE");
            setCookie("user-data",JSON.stringify(res.data.user));
            localStorage.removeItem("user-data");
          })
          toast.promise(promise,{
            loading:"Please Wait!",
            success:"Verification Successful!",
            error:(err)=>{
                return err?.response?.data?.message||"Can't connect to Server!"
            }
          })
    }
    const handleCode = (event, idx)=>{
        let d = event.target.value;
        if(!(/[0-9]/.test(d))){
            event.target.value = "";
            return;
        }
        if(d.length > 1) event.target.value = event.nativeEvent.data;
        code[idx] = event.target.value;
        if(idx < 5) document.getElementsByTagName("input")[idx+1].focus();
        else{
            document.getElementsByTagName("button")[10].click();
        }
    }
    return (
        <>
        <div className="verifyMain">
            <div className="verifyPanel">
                <h1>Verify email</h1>
                <p>A verification code has been sent to you. Enter the code below.</p>
                <div className='code'>
                <input type="text" placeholder="-" onChange={(event)=>handleCode(event,0)}></input>
                <input type="text" placeholder="-" onChange={(event)=>handleCode(event,1)}></input>
                <input type="text" placeholder="-" onChange={(event)=>handleCode(event,2)} ></input>
                <input type="text" placeholder="-" onChange={(event)=>handleCode(event,3)}></input>
                <input type="text" placeholder="-" onChange={(event)=>handleCode(event,4)}></input>
                <input type="text" placeholder="-" onChange={(event)=>handleCode(event,5)}></input>
                </div>
                <button type="button" onClick={Verify}>Verify email</button>
            </div>
        </div>
        </>
    )
}
export default VerifyCard;