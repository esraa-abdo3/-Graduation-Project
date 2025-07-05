import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireAdminRole = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  // التحقق من وجود الدور في الكوكيز
  if (!role) {
    return <Navigate to="/Auth/Login" replace />;
  }

  // الأدمن يمكنه الوصول للداش بورد فقط
  return role === "admin" ? <Outlet /> : <Navigate to="/403" replace />;
};

export default RequireAdminRole; 