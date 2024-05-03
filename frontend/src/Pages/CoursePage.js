import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import "../stylesheets/CoursePage.css"
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiMonitorPlayFill } from "react-icons/pi";
import { CiCircleInfo } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
import { FaRegBookmark,FaBookmark } from "react-icons/fa";
import { ReviewCard } from "./HomePage";
import toast from 'react-hot-toast';
import axios from "axios";
const Subsection = (props)=>{
      return (
        <div className="subsection">
            <div className="subsection-main">
                <PiMonitorPlayFill/>&nbsp;&nbsp;
                <p className="title" style={{fontSize:"medium"}}>{`${props.title}`}</p>&nbsp;&nbsp;
                <IoIosArrowDown onClick={(event)=>event.target.parentElement.toggleAttribute("active")}/>
                <p className="duration">{props.duration}</p>
            </div>
            <div className="subsection-description">{props.description}</div>
        </div>
      )
}
const add = (a1,a2)=>{
    return [a1[0]+a2[0],a1[1]+a2[1],a1[2]+a2[2]];
}
const parseString = (string)=>{
    if(!string) return undefined;
    let ans = [0,0,0];
    for(let x = string.length-1; x>=0; x--){
        if(string[x] == 's'){
            let t = x-1;
            while(t>=0 && string[t]!='m' && string[t]!='h') t--;
            ans[2] = Number.parseInt(string.slice(t+1,x));
            x=t+1;
        }
        else if(string[x] == 'm'){
            let t = x-1;
            while(t>=0 && string[t]!='h') t--;
            ans[1] = Number.parseInt(string.slice(t+1,x));
            x=t+1;
        }
        else if(string[x] === 'h'){
            let t = x-1;
            while(t>=0) t--;
            ans[0] = Number.parseInt(string.slice(t+1,x));
            x=t+1;
        }
    }
    return ans;
}
const Section = (props)=>{
        let totalDur = [0,0,0];
        const temp = props.subsections?.map((ele)=>{
            totalDur = add(totalDur,parseString(ele.timeDuration));
            return <Subsection title={ele.title} duration={ele.timeDuration} description={ele.description} url={ele.videoUrl}/>
        });
        totalDur[1] += parseInt(totalDur[2]/60);
        totalDur[0] += parseInt(totalDur[1]/60);
        totalDur[2] %= 60;
        totalDur[1] %= 60;
    return(
        <div className="section">
            <div className="section-name" onClick={(event)=>{event.target.parentElement.toggleAttribute("active");}}>
             <IoIosArrowDown/>&nbsp;&nbsp;{props.sectionName}
             <div className="section-info text-yellow">
                {`${props.subsections?.length} Lectures`}
                &nbsp; &nbsp;{totalDur[0]?`${totalDur[0]}h`:""}
                {totalDur[1]?`${totalDur[1]}m`:""}
                {totalDur[2]?`${totalDur[2]}s`:""}
             </div>
            </div>
            <div className="subsections">
            {temp}
            </div>
        </div>
    )
}
Section.defaultProps = {
    sectionName:"TEST SECTION",
    subsections: [{"title":"T1","timeDuration":"2h","description":"TBA"},{"title":"T2","timeDuration":"2m","description":"TBA"}]
}
const CoursePage = ()=>{
    const {courseId} = useParams();
    const [course,setCourse] = useState("");
    const [totalDuration, setTotalDuration] = useState("");
    const [wished, setWished] = useState("");
    const [cvideos, setCvideos] = useState("");
    let ratings = 0;
    const stars = [];
    course?.ratingAndReviews?.map((ele) => {
        ratings += ele.rating
    });
    ratings = ratings/course.ratingAndReviews?.length;
    if(isNaN(ratings)){ratings = 0}
    for(let i=1;i<=5;i++){
        if(i <= ratings) stars.push(<FaStar/>);
        else stars.push(<FaRegStar/>)
    }
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BURL}/api/v1/course/getFullCourseDetails`,{
            courseId: courseId,
        },{
            withCredentials:true
        }
        ).then((response)=>{
            setCourse(response.data.data.courseDetails);
            setTotalDuration(response.data.data.totalDuration);
            setCvideos(response.data.data.completedVideos);

        }).catch((err)=>{
            window.alert(err);
        });
    },[]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BURL}/api/v1/profile/getUserDetails`,{withCredentials:true}).then((res)=>{
            setWished(res.data?.data?.wishlist.indexOf(courseId) != -1);
        }).catch((err)=>{
            console.log(err);
        })
        if(!wished) document.getElementsByClassName("bookmark")[0].addEventListener("click",toggleWishlist);
        else document.getElementsByClassName("rbookmark")[0].addEventListener("click",toggleWishlist);
    },[wished]);
        const toggleWishlist = (event)=>{
            if(!wished){
                axios.post(`${process.env.REACT_APP_BURL}/api/v1/profile/addtowishlist`,{
                    courseId: courseId
                },{
                    withCredentials:true
                }).then((res)=>{
                    setWished(true);
                }).catch((err)=>{
                    console.log(err);
                })
            }
            else{
                axios.delete(`${process.env.REACT_APP_BURL}/api/v1/profile/removefromwishlist`,{
                    data:{courseId:courseId}
                    ,withCredentials:true
                }).then((res)=>{
                    setWished(false);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
        const loadScript=(src)=>{
            return new Promise((res)=>{
                const script = document.createElement("script");
                script.src = src;
                script.onload=()=>{
                    res(true);
                }
                script.onerror=(res)=>{
                    res(false);
                }
                document.body.appendChild(script);
            })
        }
        const verifyPayment = (response)=>{
            const promise =axios.post(`${process.env.REACT_APP_BURL}/api/v1/payment/verifyPayment`,{
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courses: [courseId]
            },{
                withCredentials: true
            })
            promise.then((res)=>{
                window.location.reload();
            })
            toast.promise(promise,{
                success: "Course Purchased!",
                error: "Payment verification failed!",
                loading: "Please wait"
            })
        }
        const CoursePay = async(payment)=>{
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if(!res){
                toast.error("Payment Gateway unavailable!");
                return;
            }
            var rzp1 = new window.Razorpay({
                "key": process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
                "amount": course.price*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "VirtuLearn", //your business name
                "description": `Buy course ${course?.courseName}`,
                "image": "data:image/jpeg;base64,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",
                "order_id": payment.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": verifyPayment,
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com", 
                    "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
            }})
                rzp1.open();
        }
        CoursePay({});
        const handlePayment = ()=>{
            const promise = axios.post(`${process.env.REACT_APP_BURL}/api/v1/payment/capturePayment`,{
                courses:[courseId]
            },{withCredentials:true})
            promise.then((res)=>CoursePay(res.data.data));
            toast.promise(promise, {
                success:"Order Initiated",
                error:(err)=>err?.response?.data?.message||"Error Initiating Transaction",
                loading:"Loading"
            })
        }
    return(
        <div className="course-page-main">
            <div className="course-page-top">
                <div className="path white">
                    {`Home / Learning / `}
                    <span className="text-yellow">{course?course.category.name:""}</span>
                </div>
                <div className="course-info">
                    <h2 className="white" style={{display:"inline-block"}}>{course.courseName}
                    </h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;{!wished?<FaRegBookmark className="bookmark" size={"25px"} style={{verticalAlign:"text-middle"}}/>:<FaBookmark className="rbookmark" size={"25px"} style={{verticalAlign:"text-middle"}}/>}
                    <div className="course-desc">{course.courseDescription}
                    </div>
                    <div className="course-stars">
                        {ratings.toFixed(1)||"No review"} 
                        <IconContext.Provider value={{size:"18px",style:{marginRight:"2px"}}}>
                            {ratings?stars:""}
                        </IconContext.Provider>
                        <div className="course-enrolled">
                        {`(${course.ratingAndReviews?.length} ratings) `}
                        {course.studentsEnrolled?.length.toLocaleString('en-US')+" students"}
                        </div>
                    </div>
                    <p>{`Created by ${course?.instructor?.firstName+" "+course.instructor?.lastName}`}</p>
                    <div className="course-data">
                        <IconContext.Provider value={{size:"20px",style:{marginRight:"5px"}}}>
                        <CiCircleInfo/>
                        {`Created at ${new Date(course.createdAt).getMonth()} / ${new Date(course.createdAt).getFullYear()}`}
                        <HiLanguage/>
                        {"English"}
                        </IconContext.Provider>
                    </div>
                </div>
                <div className="course-right-div">
                    <img src={course?.thumbnail}></img>
                    <h2 className="white no-margin">
                        {`Rs ${course?.price?.toLocaleString('en-US')}`}
                    </h2>
                    <button className="btn btn-semisquare yellow">Add to Cart</button>
                    <button className="btn btn-semisquare bgcolor" onClick={handlePayment}>Buy now</button>
                    <p className="text-center">30-Day Money-Back Guarantee</p>
                    {course?.instructions?.length && (
                        <>
                        <p className="no-margin">This Course requires: <br/></p>
                        {course?.instructions?.map((ele)=><p className="instruction no-margin">{ele}</p>)}
                        </>
                    )}
                    <button className="btn share-btn bgcolor btn-semisquare">Share</button>
                </div>
            </div>
            <div className="course-main-content">
                <div className="course-will-learn">
                    <h2>What you'll learn</h2>
                    {course?.whatYouWillLearn?.map((ele)=><p>{ele}</p>)}
                </div>
                <div className="course-content">
                    <h2 className="white">Course Content</h2>
                    <p className="white">{`${course?.courseContent?.length} Sections `}&middot;{` ${course?.courseContent?.reduce((total,curr)=>{return total+curr.subSection.length},0)} Lectures `}&middot;{` ${totalDuration}`}</p>
                    <div className="sections">
                        {course?.courseContent?.map((ele)=>{
                            return <Section sectionName={ele.sectionName} subsections={ele.subSection}/>
                        })}
                        <Section/>
                    </div>
                </div>
                <div className="course-author white">
                    <h2>Author</h2>
                    <div className="author-info">
                        <img src={course?.instructor?.image}></img>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {course?.instructor?.firstName+" "+course?.instructor?.lastName}
                    </div>
                </div>
                <h1 className="white text-center">Reviews from other learners</h1>
                <div className="course-reviews">
                    {course?.ratingAndReviews?.length==0 && <h2 className="text-center white">No reviews</h2>}
                    {course && course?.ratingAndReviews?.map((ele)=>{
                        return <ReviewCard firstname={ele.user.firstName} lastname={ele.user.lastName} stars={ele.rating} review={ele.review}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CoursePage;