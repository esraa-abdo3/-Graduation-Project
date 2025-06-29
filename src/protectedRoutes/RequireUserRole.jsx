import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireUserRole = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  // المستخدم العادي يمكنه الوصول لصفحات المستخدم فقط
  return role === "user" ? <Outlet /> : <Navigate to="/403" replace />;
};

export default RequireUserRole; 