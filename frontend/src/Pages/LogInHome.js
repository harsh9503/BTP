import "../stylesheets/LogInHome.css"
import img from "../img-login.jpg"
import img_code from "../code.png";
const LogInHome = ()=>{
    return (
    <div className="login-home">
        <button type="button" className="btn-1">
            Become an Instructor
        </button>
        <div className="site-motto">
            <h1>Empower Your Future with <p className="designated">Coding Skills</p></h1>
            <p>With our coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized  feerback from instructors.</p>
            <div className="btn-box"><button type="button" className="btn btn-semisquare yellow">Learn More</button>
            <button type="button" className="btn btn-semisquare">Book a Demo</button></div>
        </div>
        <div className="img-dv">
            <img src={img}>
            </img>
        </div>
        <div className="dv1">
            <div className="dv1-text">
                <h1>Unlock your <span className="designated">coding potential</span> with our online courses.</h1>
                <span className="dv1-desc">Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</span>
                <div className="btn-container">
                <button className="btn btn-semisquare yellow">Try it yourself &#8594;</button>
                <button className="btn btn-semisquare ">Learn More</button>
                </div>
            </div>
            <div className="dv1-code">
                <img src={img_code} alt="code"></img>
            </div>
        </div>
        <div className="dv2">Empty</div>
    </div>
    )
}

export default LogInHome;