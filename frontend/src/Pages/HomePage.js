import "../stylesheets/LogInHome.css"
import img from "../img-login.jpg"
import logo1 from "../Logo1.svg";
import logo2 from "../Logo2.svg";
import logo3 from "../Logo3.svg";
import logo4 from "../Logo4.svg";
import dv6_img1 from "../dv6-img1.png"
import dv6_img2 from "../dv6-img2.png"
import dv6_img3 from "../dv6-img3.png"
import study_photo from "../study-photo.png";
import dv7_img from "../dv7-img.png";
import { BsPeopleFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState,useEffect } from "react";
const Card=(props)=>{
    useEffect(()=>{
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
//@params
export const ReviewCard = (props)=>{
        const logoString = props.firstname && props.lastname?props.firstname.toUpperCase()[0] + props.lastname.toUpperCase()[0]:"";
        const stars = [];
        for(let i=1;i<=5;i++){
            if(i <= props.stars) stars.push(<FaStar/>);
            else stars.push(<FaRegStar/>)
        }
      return(
        <div className="person-info">
            <div className="div1">
                <div className="person-name-logo">
                    <div className="round">{logoString}</div>
                </div>
                <div className="person-data child-no-margin">
                    <p className="reviews-name">{props.firstname+" "+props.lastname}</p>
                    <p className="reviews-info">{props.description}</p>
                </div>
            </div>
            <div className="review-content">
                {props.review}
            </div>
            <div className="review-stars">
                {props.stars}
                <IconContext.Provider value={{size:"20px",style:{"display":"inline-block"}}}>
                    {stars}
                </IconContext.Provider>
            </div>
        </div>
      )
}
let eidx = 4;
const Home = ()=>{
    
    const reviews = [
    <ReviewCard firstname="Devarsh" lastname="Khare" description="SDE-III at Alphabet" review="It is the best course avaialable in the industry. Everyone should take its course for once at least." stars={4}/>,
    <ReviewCard firstname="Dev" lastname="Kabra" description="SDE at Walmart" review="One of the best courses that I could find these days. Worth spending money on." stars={5}/>,
    <ReviewCard firstname="Rishi" lastname="Pathak" description="Data anaylst @Wizzy.ai" review="It is the best course avaialable in the industry. Everyone should take its course for once at least." stars={4}/>,
    <ReviewCard firstname="Chandan" lastname="Makwana" description="ML engineer at Kruskal" review="It is the best course avaialable in the industry. Everyone should take its course for once at least." stars={4}/>,
    <ReviewCard firstname="Ritesh" lastname="Darji" description="SDE-III at Alphabet" review="It is the best course avaialable in the industry. Everyone should take its course for once at least." stars={5}/>,]
    const [content, setContent] = useState(reviews);
    useEffect(()=>{
        //Slider
        const slider = document.querySelector(".review-container");
        const container = document.querySelector(".reviews");
        container.appendChild(slider.cloneNode(true));
    },[]);
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
            <p>With our coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized  feedcback from instructors.</p>
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
            <div className="dv3 role-selector">
                    <div className="role-container">
                        <label htmlFor="Free"><input type="radio" id="Free" value="Free" name="type" ></input><p>Free</p></label>
                        <label htmlFor="New to coding"><input type="radio" id="New to coding" value="New to coding" name="type" ></input><p>New to coding</p></label>
                        <label htmlFor="Most popular"><input type="radio" id="Most popular" value="Most popular" name="type" ></input><p>Most popular</p></label>
                        <label htmlFor="Skills paths"><input type="radio" id="Skills paths" value="Skills paths" name="type" ></input><p>Skills paths</p></label>
                        <label htmlFor="Career Paths"><input type="radio" id="Career paths" value="Career paths" name="type" ></input><p>Career Paths</p></label>
                    </div>
                </div>
            <div className="dv3-cards">
                <div className="dv3-designated">
                <Card className="card1" heading="Learn HTML" description="This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more." level="Beginner" lessons="6"/>
                <Card className="rect"/>
                </div>
                <Card className="card2" heading="Learn CSS" description="This course explores advanced topics in HTML5 and CSS3, including animation, transitions,and layout techniques." level="Beginner" lessons="6"/>
                <Card className="card3" heading="Responsive Web design" description="This course teaches responsive web design techniques, allowing web pages to different devies and screen sizes." level="Beginner" lessons="6"/>
            </div>
        </div>
            <div className="new-dv">
            </div>
            <div className="new-dv-features btn-container">
                    <button type="button" className="btn btn-semisquare yellow">Explore full catalog &rarr;</button>
                    <button type="button" className="btn btn-semisquare">Learn more</button>
            </div>
            <div className="white-dv">
                <div className="dv4">
                    <div className="dv4-text">
                        <h1>Get the skills you need for a <span className="designated">job that is in demand.</span></h1>
                    </div>
                    <div className="dv4-right">
                        <span className="dv4-desc">The modern VirtuLearn is the dictation in its own terms. Today, to be a competitive specialist requires more than professional skills.</span>
                        <div className="btn-container">
                        <button className="btn btn-semisquare yellow">Learn More</button>
                        </div>
                    </div>
                </div>
                <div className="dv5">
                    <div className="dv5-left">
                        <div className="dv5-list">
                            <div className="flex-row">
                                <div className="round"><img src={logo1}></img></div>
                                <div className="flex-column row-desc">
                                    Leadership <br/>
                                    Fully committed to the success company
                                </div>
                            </div>
                            <div className="blank-dv"></div>
                            <div className="flex-row">
                                <div className="round"><img src={logo2}></img></div>
                                <div className="flex-column row-desc">
                                    Responsibility <br/>
                                    Students will always be our top priority
                                </div>
                            </div>
                            <div className="blank-dv"></div>
                            <div className="flex-row">
                                <div className="round"><img src={logo3}></img></div>
                                <div className="flex-column row-desc">
                                    Flexibility <br/>
                                    The ability to switch is an important skills
                                </div>
                            </div>
                            <div className="blank-dv"></div>
                            <div className="flex-row">
                                <div className="round"><img src={logo4}></img></div>
                                <div className="flex-column row-desc">
                                    Solve the problem <br/>
                                    Code your way to a solution
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dv5-img">
                        <img src={study_photo} alt="study-photo.png"></img>
                        <div className="img-info">
                            <div className="info-1"><bold>10</bold><p>YEARS EXPERIENCES</p></div>
                            <div className="vl"></div>
                            <div className="info-2"><bold>250</bold><p>TYPES OF COURSES</p></div>
                        </div>
                    </div>
                </div>
                <div className="dv6">
                    <h1 className="text-center">Your swiss knife for <span className="designated">learning any language</span></h1>
                    <p className="text-center">Using spin making learning multiple languages easy. With 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                    <div className="imges">
                        <img src={dv6_img1}></img>
                        <img src={dv6_img2}></img>
                        <img src={dv6_img3}></img>
                    </div>
                    <button className="btn btn-semisquare yellow">Learn More</button>
                </div>
            </div>
            <div className="dv7 white">
                <div className="dv7-img">
                    <img src={dv7_img} alt="become instructor"></img>
                </div>
                <div>
                    <h1>Become an <span className="designated">instructor</span></h1>
                    <p>Instructors from around the world teach millions of students on VirtuLearn. We provide the tools and skills to teach what you love.</p>
                    <button className="btn btn-semisquare yellow">Start Teaching Today &rarr;</button>
                </div>
            </div>
            <h1 className="text-center white margin-down-20px">Reviews from other learners</h1>
            <div className="reviews">
                <div className="review-container">
                    {content}
                    {content}
                </div>
            </div>
    </div>
    )
}

export default Home;