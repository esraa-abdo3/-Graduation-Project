import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireNotAdmin = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  // التحقق من وجود الدور في الكوكيز
  if (!role) {
    return <Navigate to="/Auth/Login" replace />;
  }

  // منع الأدمن من دخول صفحات المستخدم والدكتور
  return role === "admin" ? <Navigate to="/403" replace /> : <Outlet />;
};

export default RequireNotAdmin; 