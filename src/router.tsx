import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Layout from "./Layout";
import Register from "./Register";
import About from "./About";
import LayoutAdmin from "./LayoutAdmin";
import Admin from "./Admin";
const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout />,
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path:"/register",
                element:<Register />
            },
            {
                path:"/about",
                element:<About/>
            }
        ]
    },
    {
        path:"/admin",
        element:<LayoutAdmin />,
        children: [
            {
                index:true,
                element:<Admin/>
            }
        ]
    }
    
])

export default router