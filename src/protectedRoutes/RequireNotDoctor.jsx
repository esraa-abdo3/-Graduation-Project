// protectedRoutes/ProtectDoctorRoutes/RequireNotDoctorRole.js
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireNotDoctorRole = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  // التحقق من وجود الدور في الكوكيز
  if (!role) {
    return <Navigate to="/Auth/Login" replace />;
  }

  return role === "doctor" ? <Navigate to="/403" replace /> : <Outlet />;
};

export default RequireNotDoctorRole;
