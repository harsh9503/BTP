import LoginCard from "./loginCard";
import "../stylesheets/HomePage.css"
import img from "../img-log.jpg"
import { useState } from "react";
const LoginPage = ()=>{
    const [role, setRole] = useState("");
    return (
        <div className="home-container" style={{paddingTop:"10vh"}}>
            <div className="SignIn">
                <h1>Welcome Back</h1>
                <p>Build Skills for today, tomorrow, and beyond. Education to future-proof your career.</p>
                <div className="role-selector">
                    <div className="role-container">
                        <label htmlFor="student"><input type="radio" id="student" value="student" name="role" onChange={()=> setRole("Student")} defaultChecked></input><p>Student</p></label>
                        <label htmlFor="instructor"><input type="radio" id="instructor" value="instructor" name="role" onChange={()=> setRole("Instructor")}></input><p>Instructor</p></label>
                    </div>
                </div><LoginCard role={role}/>
            </div>
            <img src={img} alt="" className="img-login"></img>
        </div>
    )
}
export default LoginPage;