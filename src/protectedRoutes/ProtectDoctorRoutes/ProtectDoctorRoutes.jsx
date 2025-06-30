// protectedRoutes/ProtectDoctorRoutes/RequireDoctorRole.js
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireDoctorRole = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  // التحقق من وجود الدور في الكوكيز
  if (!role) {
    return <Navigate to="/Auth/Login" replace />;
  }

  return role === "doctor" ? <Outlet /> : <Navigate to="/403" replace />;
};

export default RequireDoctorRole;


