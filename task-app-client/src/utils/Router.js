import { createBrowserRouter } from "react-router-dom";
import Page404 from "../pages/page404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import PublicPage from "../pages/PublicPage";
import PrivatePage from "../pages/PrivatePage";
import DashBoard from "../pages/DashBoard";
import CreateTask from "../pages/CreateTask";
import EditTask from "../pages/EditTask";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Logout from "../pages/Logout";


const router = createBrowserRouter([
    {
      path: "/",
      element : <PublicPage child={<Home/>}/>
    },
    {
        path:"/login",
        element: <PublicPage child={<Login/>}/>
    },
    {
        path:"/forgotPassword",
        element: <PublicPage child={<ForgotPassword/>}/>
    },
    {
        path:"/signup",
        element: <PublicPage child={<Signup/>}/>
    }
    ,
    {
      path : "tasks",
      element: <PrivatePage child={<DashBoard/>}/>,
    },
    {
      path: "createTask",
      element: <PrivatePage child={<CreateTask/>} />
    },
    {
      path: "editTask/:id",
      element: <PrivatePage child={<EditTask/>}/>
    },
    {
      path: "profile",
      element: <PrivatePage child={<Profile/>} />
    },
    {
      path: "editProfile",
      element: <PrivatePage child={<EditProfile/>}/>
    },
    {
      path:"logout",
      element: <PrivatePage child={<Logout/>}/>
    },
    {
        path:"*",
        element:  <Page404/>
    }
  
  ])

export {router}