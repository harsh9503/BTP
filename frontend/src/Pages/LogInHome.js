import "../stylesheets/LogInHome.css"
import img from "../img-login.jpg"
import img_code from "../code.png";
import { BsPeopleFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";
import { IconContext } from "react-icons";
import { useEffect } from "react";
const Card=(props)=>{
    useEffect(()=>{
        console.log(document.getElementsByClassName(props.className));
        document.getElementsByClassName(props.className)[0].addEventListener("click",onclick);
    },[]);
    return(
        <div className={"container "+props.className}>
            <h3 className="heading">{props.heading}</h3>
            <h4 className="description">{props.description}</h4>
            <IconContext.Provider value={{size:"20px",style:{marginRight:"0px"}}}>
            <div className="course-info">
                <div><BsPeopleFill/>
                <p>{props.level}</p></div>
                <div>
                <MdPlayLesson/>
                <p>{props.lessons} Lessons</p></div>
            </div>
            </IconContext.Provider>
        </div>
    )
}
const LogInHome = ()=>{
    const keywords = ["using","namespace","std","return","int","template","typename","T"];
    const code = ["#include <iostream>","using namespace std;","template<typename> T;","T sum(T a, T b){","return a+b;","}","int main(){","int num1=1, num2=4;","int result = sum<int>(num1,num2);","return 0;","}"];
    const pcode = code.map((str,idx)=>{
        let jsx_code = [];
        const s = str.split(/([\s()<>])/);
        for(let i=0;i<s.length;i++){
            if(/#([a-z]{1,})/.test(s[i])){
                jsx_code.push(<p className="directive">{s[i]}</p>);
            }
            else if(keywords.includes(s[i])){
                jsx_code.push(<p className="keyword">{s[i]}</p>);
            }
            else{
                jsx_code.push(<p className="identifier">{s[i]}</p>);
            }
        }
         return <p className={"l"+(idx+1)}>{jsx_code}</p>;
    })
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
                {pcode}
                <div className="code-lang"><h1>C++</h1>
                <h3>Tutorial</h3></div>
            </div>
        </div>
        <div className="dv2">
            <div className="dv2-code">
                {pcode}
                <div className="code-lang"><h1>C++</h1>
                <h3>Tutorial</h3></div>
            </div>
            <div className="dv2-text">
                <h1>Start <span className="designated">coding in seconds</span> with our online courses.</h1>
                <span className="dv1-desc">Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</span>
                <div className="btn-container">
                <button className="btn btn-semisquare yellow">Continue Lesson &#8594;</button>
                <button className="btn btn-semisquare ">Learn More</button>
                </div>
            </div>
        </div>
        <div className="dv3">
            <div className="dv3 text center">
                <h1 className="white"> Unlock the <p className="designated inline">Power of Code</p></h1>
                <p className="dv3 desc">Learn to Build Anything You Can Imagine</p>
            </div>
            <div className="dv3-cards">
                <div className="dv3-designated">
                <Card onclick={()=>console.log("HELLO;")} className="card1" heading="Learn HTML" description="This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more." level="Beginner" lessons="6"/>
                <Card className="rect"/>
                </div>
                <Card className="card2" heading="Learn CSS" description="This course explores advanced topics in HTML5 and CSS3, including animation, transitions,and layout techniques." level="Beginner" lessons="6"/>
                <Card className="card3" heading="Responsive Web design" description="This course teaches responsive web design techniques, allowing web pages to different devies and screen sizes." level="Beginner" lessons="6"/>
            </div>
        </div>
    </div>
    )
}

export default LogInHome;