import './App.css';
import HomePage from './Pages/HomePage.js';
import Header from './Pages/Header.js';
import ForgotPassword from './Pages/ForgotPassword.js';
import ChangePassword from './Pages/ChangePassword.js';
import VerifyCard from './Pages/VerifyEmail.js';
import CatalogMain from './Pages/Catalog.js';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import LogInHome from './Pages/LogInHome.js';
const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>,
  },
  {
    path:"/verify",
    element: <VerifyCard/>
  },
  {
    path:"/changepassword",
    element:<ChangePassword/>
  },
  {
    path:"/home",
    element:<LogInHome/>
  },
  {
    path:"/forgotpassword",
    element: <ForgotPassword/>
  },
  {
    path:"/catalog/:course",
    element: <CatalogMain/>
  }
])

function App() {
  return (
    <div className="App">
      <Header/>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
