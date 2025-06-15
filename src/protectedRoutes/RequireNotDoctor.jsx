// protectedRoutes/ProtectDoctorRoutes/RequireNotDoctorRole.js
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireNotDoctorRole = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  return role === "doctor" ? <Navigate to="/403" replace /> : <Outlet />;
};

export default RequireNotDoctorRole;
