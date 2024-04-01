import "../stylesheets/Catalog.css";
import {useParams} from "react-router-dom";
const CatalogMain=()=>{
        const {course} = useParams();
        
    return (
        <>

        <div className="catalog-head">
            <div className="catalog-head-desc">
                <div className="div-path white">
                    {`Home / Catalog / `}<span className="text-yellow">{course[0].toUpperCase() +course.slice(1)}</span>
                </div>
                <h2 className="white">{course}</h2>
                <p></p>
            </div>
            <div className="catalog-head-related">

            </div>
        </div>
        </>
    )
}

export default CatalogMain;