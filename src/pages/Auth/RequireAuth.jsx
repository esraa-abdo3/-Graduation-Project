import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";


export default function RequierAuth() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer"); 
    const location = useLocation();



    
    return gettoken ? (
        <Outlet /> 
    ) : (
        <Navigate to="/Auth/login" state={{ from: location }} replace /> 
    );
}