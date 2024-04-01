import "../stylesheets/CoursePage.css"
import { useParams } from "react-router-dom";
const CoursePage = ()=>{
    const {courseId} = useParams();
    return(
        <div className="course-page-main">
            <div className="course-page-top">
                <div className="course-page-path white">
                    {`Home / Learning / `}
                    <span className="text-yellow">{courseId}</span>
                </div>
            </div>
        </div>
    )
}

export default CoursePage;