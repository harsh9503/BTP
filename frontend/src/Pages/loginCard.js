import {BarLoader} from 'react-spinners';
import { useRef, useState } from 'react';
import axios from "axios";
import "../stylesheets/loginCard.css"
function LoginCard(){
    const [spin, setSpin] = useState(false);
    const email = useRef("");
    const password = useRef("");
    const HandleLogin=async()=>{
          setSpin(true);
          await axios.post(`${process.env.REACT_APP_BURL}/api/v1/auth/login`,{
            email:email.current.value,
            password:password.current.value
          },{
            withCredentials:true
          }).then((res)=>{
             window.location.href = "/";
          }).catch((err)=>{
            console.log(err);
            setSpin(false);
          })
    }
    return (
        <>
        {spin &&<BarLoader className='loader' color="#36d7b7" width={"100%"}/>}
        <div className="loginMain">
            <div className="loginPanel">
                <p>Email Address: *</p>
                <input type="text" placeholder="Enter Email Address" ref={email}></input>
                <p>Password: *</p>
                <input type="password" placeholder="Password" ref={password}></input>
                <a href="">Forgot Password</a>
                <button type="button" onClick={HandleLogin}>Sign in</button>
            </div>
        </div>
        </>
    )
}
export default LoginCard;