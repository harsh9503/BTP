import SignInCard from "./SigninCard";
import "../stylesheets/HomePage.css";
import img from "../study-photo.jpg";
import { useState } from "react";

const SignupPage = (props) => {
    const [role, setRole] = useState("");

    return (
        <div>
            <div className="added">
                <h2>Join the millions learning to code with VirtuLearn for free</h2>
                <p>Build Skills for today, tomorrow, and beyond. Education to future-proof your career.</p>
            </div>
            
            <div className="home-container">
                <div className="SignIn">
                    
                    <div className="role-selector">
                        <div className="role-container">
                            <label htmlFor="student">
                                <input type="radio" id="student" value="student" name="role" onChange={() => setRole("Student")} defaultChecked />
                                <p>Student</p>
                            </label>
                            <label htmlFor="instructor">
                                <input type="radio" id="instructor" value="instructor" name="role" onChange={() => setRole("Instructor")} />
                                <p>Instructor</p>
                            </label>
                        </div>
                    </div>
                    <SignInCard role={role} />
                </div>
                <img src={img} alt="" className="img-sign" />
            </div>
        </div>
    );
};

export default SignupPage;
