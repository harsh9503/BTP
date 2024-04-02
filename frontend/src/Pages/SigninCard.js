import {BarLoader} from 'react-spinners';
import { useState,useRef } from 'react';
import axios from "axios";
import "../stylesheets/signinCard.css"
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";
import { IconContext } from 'react-icons';
function SignInCard(props){
    const [spin, setSpin] = useState(false);
    const refs = useRef(new Array(6));
    const ch = useRef(new Array(6));
    let err = 0;
    const HandleSignin=async()=>{ 
          for(let i=0;i<6;i++){
            if(refs.current[i].value === ""){
                refs.current[i].className = 'empty';
                refs.current[i].focus();
                setSpin(false);
                return;
                }
            }
            if(err < 5){
                refs.current[4].focus();
                return;
            }
            else if(err == 5){
                refs.current[5].focus();
                return;
            }
            setSpin(true);
            localStorage.setItem("user-data",JSON.stringify({
                "firstName":refs.current[0].value,
                "lastName":refs.current[1].value,
                "email":refs.current[2].value,
                "contactNumber":refs.current[3].value,
                "password":refs.current[4].value,
                "accountType":props.role?props.role:"Student",
                "confirmPassword":refs.current[5].value
            }));
            await axios.post(`${process.env.REACT_APP_BURL}/api/v1/auth/sendotp`,
            {
                email:refs.current[2].value
            }).then(()=>{window.location.href = `/verify`}).catch((err)=>{
                console.log(err);
            });
            setSpin(false);
    }
    const check = () =>{
        const pass = refs.current[4].value;
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
          if(pass.length>0 && pass === refs.current[5].value) b[5] = true;
          for(let i=0;i<6;i++){
            if(b[i] === true){
                count++;
                ch.current[i].setAttribute("aria-satisfied","true");
            }
            else{
                err = i;
                ch.current[i].setAttribute("aria-satisfied","false");
            }
          }
        if(count == 6){
            err = 6;
        }

    }
    return (
        <>
        <div className="SigninMain">
        {spin &&<BarLoader color="#36d7b7" width={"100%"} className='loader'/>}
            <div className="SigninPanel">
                <div className="nameInput">
                    <div className='fname'>
                    <p>First Name: </p>
                    <input type="text"  required placeholder='Enter first name' ref={(element)=>refs.current[0]=(element)} ></input>
                    </div>
                    <div className='lname'>
                    <p>Last Name: </p>
                    <input type="text" required placeholder='Enter last name' ref={(element)=>refs.current[1]=(element)}></input>
                    </div>
                </div>
                <p>Email Address *</p>
                <input id="test" type="text" placeholder="Enter Email Address" ref={(element)=>refs.current[2]=(element)}></input>
                <p>Phone number *</p>
                <div className='phoneInput'>
                    <select className='phoneInput-select' value={"+91"}>
                        <option value="+91">+91</option>
                        <option value="+44">+44</option>
                    </select>
                    <input type='number' required placeholder='12345 67890' ref={(element)=>refs.current[3]=(element)}></input>
                </div>
                <div className='passwordInput'>
                <div className='epassword'>
                <p>Create Password *</p> 
                <input type="password" placeholder="Enter Password" onChange={check} ref={(element)=>refs.current[4]=(element)}></input>
                </div>
                <div className='cpassword'>
                <p>Confirm Password *</p>
                <input type="password" onChange={()=>{check()}} placeholder="Enter Password" ref={(element)=>refs.current[5]=(element)}></input>
                </div>
                </div>
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
                <button type="button" onClick={HandleSignin}>Create Account</button>
            </div>
        </div>
        </>
    )
}
export default SignInCard;