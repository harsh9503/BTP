import './App.css';
import LoginPage from './Pages/LogIn.js';
import SignupPage from './Pages/Signup.js';
import Header from './Pages/Header.js';
import ForgotPassword from './Pages/ForgotPassword.js';
import ChangePassword from './Pages/ChangePassword.js';
import VerifyCard from './Pages/VerifyEmail.js';
import CatalogMain from './Pages/Catalog.js';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import CoursePage from './Pages/CoursePage.js';
import Home from './Pages/HomePage.js';
import Profile from './Pages/Profile.js';
import {EnrolledCourses} from './Pages/EnrolledCourses.js';
import { SideBar } from './Pages/SideBar.js';
import Wishlist from './Pages/Wishlist.js';
import MyCourses from './Pages/MyCourses.js';
import InstructorCourses from './Pages/InstructorCourses.js'
const router = createBrowserRouter([
  {
    path:"/signup",
    element:<SignupPage request="signup"/>
  },
  {
    path:"/login",
    element:<LoginPage request="login"/>
  },
  {
    path:"/verify",
    element: <VerifyCard/>
  },
  {
    path:"/user/changepassword",
    element:<ChangePassword/>
  },
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/forgotpassword",
    element: <ForgotPassword/>
  },
  {
    path:"/catalog/:catalogId",
    element: <CatalogMain/>
  },
  {
    path:"/course/:courseId",
    element: <CoursePage/>
  },{
    path:"/user/profile",
    element:<Profile/>
  },{
    path:"/user/enrolled-courses",
    element:<EnrolledCourses/>
  },{
    path:"/user/wishlist",
    element:<Wishlist/>
  },{
    path:"/user/mycourses/:courseId/:subSectionId?",
    element:<MyCourses/>,
  },{
    path:"/user/mycourses",
    element:<InstructorCourses/>
  }
])
const HeaderRouter = createBrowserRouter([
    {
      path:"*",
      element: <Header page="login"/>
    },
    {
      path: "/signup",
      element: <Header page="signup"/>
    }
])


const sideRouter = createBrowserRouter([
  {
    path:"/user/:userPath",
    element: <SideBar/>
  },
  {
    path:"*",
    element:<></>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={HeaderRouter}/>
        <RouterProvider router={sideRouter}/>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
