import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireUserRole = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  // التحقق من وجود الدور في الكوكيز
  if (!role) {
    return <Navigate to="/Auth/Login" replace />;
  }

  // المستخدم العادي يمكنه الوصول لصفحات المستخدم فقط
  // التحقق من أن الدور ليس admin وليس doctor
  return role !== "admin" && role !== "doctor" ? <Outlet /> : <Navigate to="/403" replace />;
};

export default RequireUserRole; 