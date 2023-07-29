import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Add_medicin from "./components/medical/Add_medicin";
import List_medicin from "./components/medical/List_medicin";
import Update from "./components/medical/Update";
import View from "./components/medical/View";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Search_med from "./components/medical/Search_med";


export const router=createBrowserRouter([
    {path:"",element:<App/>},
    {path:"/add",element:<Add_medicin/>},
    {path:"/list",element:<List_medicin/>},
    {path:"/:postId", element:<View/>},
    {path:"/:postId/edit",element:<Update/>},
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login/>},
    {path:"/search",element:<Search_med/>},
    

])

export default router;