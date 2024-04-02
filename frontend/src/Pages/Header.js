import "../stylesheets/header.css";
import logo from "../logo.png";
import { useCookies } from "react-cookie";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IconContext } from "react-icons";
const Header = (props)=>{
    const [cookie,setCookie] =useCookies(['user-data']);
    console.log(cookie["user-data"]);
    const handleClick = ()=>{
        if(cookie["user-data"]){
            window.location.href = "/profile";
            return;
        }
        if(props.page === "login"){
            window.location.href = "/signup";
        }
        else{
            window.location.href = "/login";
        }
    }
    return (
        <div className="head">
            <img alt="logo" src={logo} id="img-logo"></img>
            <div className="links">
            <button type="button">Home</button>
            <button type="button">Catalog</button>
            <button type="button">About Us</button>
            <button type="button">Contact Us</button>
            </div>
            <div className="features">
                <IconContext.Provider value={{color:"grey",size:"25px",className:"icons"}}>
                <span><FaMagnifyingGlass/></span>
                <span><MdOutlineShoppingCart/></span>
                </IconContext.Provider>
                <button type="button" className={cookie["user-data"]?"user-profile":"button"} onClick={handleClick}>{cookie['user-data']?<img src={cookie['user-data'].image}></img>:props.page === "signup"?"Log In":"Sign In"}</button>
            </div>
        </div>
    )
}
export default Header;