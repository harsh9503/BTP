import SignInCard from "./SigninCard";
import "../stylesheets/HomePage.css"
import img from "../study-photo.jpg"
const HomePage = ()=>{
    return (
        <div className="home-container">
            <div className="SignIn">
                <h2>Join the millions learning to<br/> code with StudyNotion for <br/>free</h2>
                <p>Build Skills for today, tomorrow, and beyond. Education to future-proof your career.</p>
                <div className="role-selector">
                    <div className="role-container">
                        <label htmlFor="student"><input type="radio" id="student" value="student" name="role" ></input><p>Student</p></label>
                        <label htmlFor="instructor"><input type="radio" id="instructor" value="instructor" name="role" ></input><p>Instructor</p></label>
                    </div>
                </div>
                <SignInCard/>
            </div>
            <img src={img} alt="" className="img-sign"></img>
        </div>
    )
}
export default HomePage;