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
import Footer from './Pages/Footer.js';
import Contact from './Pages/Contact.js';

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
    path:"/user/mycourses/:courseId/subSection?/:subSectionId?",
    element:<MyCourses/>,
  },{
    path:"/contact",
    element:<Contact/>
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
const FooterRouter = createBrowserRouter([
  {
    path: "/",
    element: <Footer />,
  },
  {
    path: "/course/:courseId",
    element: <Footer />,
  },
  {
    path: "/catalog/:catalogId",
    element: <Footer />,
  },
  {
    path: "/contact",
    element: <Footer />,
  }
]);

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
        <RouterProvider router={FooterRouter}/>
    </div>
  );
}

export default App;
