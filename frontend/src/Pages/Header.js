import "../stylesheets/header.css"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons";
const Header = (props)=>{
    return (
        <div className="head">
            <img alt="logo"></img>
            <div className="links">
            <button type="button">Home</button>
            <button type="button">Catalog</button>
            <button type="button">About Us</button>
            <button type="button">Contact Us</button>
            </div>
            <div className="features">
                <IconContext.Provider value={{color:"grey",size:"25px",className:"icons"}}>
                <FaMagnifyingGlass/>
                <MdOutlineShoppingCart/>
                </IconContext.Provider>
                <button type="button">{props.page === "signin"?"Log In":"Sign In"}</button>
            </div>
        </div>
    )
}
export default Header;