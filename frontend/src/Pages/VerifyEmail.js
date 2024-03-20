import {BarLoader} from 'react-spinners';
import { useState } from 'react';
import "../stylesheets/VerifyEmail.css"
function VerifyCard(){
    window.onload = () =>{
        document.getElementsByTagName("input")[0].focus();
    }
    const [spin, setSpin] = useState(false);
    const Verify=async()=>{
          setSpin(true);
          window.location.href = "/home";
          setSpin(false);
    }
    const handleCode = (event, idx)=>{
        let d = event.target.value;
        if(!(/[0-9]/.test(d))){
            event.target.value = "";
            return;
        }
        if(d.length > 1) event.target.value = event.nativeEvent.data;
        if(idx < 5) document.getElementsByTagName("input")[idx+1].focus();
        else{
            console.log(document.getElementsByTagName("button"));
            document.getElementsByTagName("button")[5].click();
        }
    }
    return (
        <>
        {spin &&<BarLoader color="#36d7b7" width={"100%"}/>}
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