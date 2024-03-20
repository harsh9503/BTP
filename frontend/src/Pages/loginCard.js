import {BarLoader} from 'react-spinners';
import { useState } from 'react';
import "../stylesheets/loginCard.css"
function LoginCard(){
    const [spin, setSpin] = useState(false);
    const HandleLogin=async()=>{
          setSpin(true);
          window.location.href = "/home";
    }
    return (
        <>
        {spin &&<BarLoader color="#36d7b7" width={"100%"}/>}
        <div className="loginMain">
            <div className="loginPanel">
                <h1>Login</h1>
                <p>Email Address: *</p>
                <input type="text" placeholder="Enter Email Address"></input>
                <p>Password: *</p>
                <input type="password" placeholder="Password"></input>
                <a href="">Forgot Password</a>
                <button type="button" onClick={HandleLogin}>Sign in</button>
            </div>
        </div>
        </>
    )
}
export default LoginCard;