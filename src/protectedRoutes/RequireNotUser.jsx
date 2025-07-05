import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireNotUser = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  // منع المستخدم العادي من دخول الداش بورد والدكتور داش بورد
  return role === "user" ? <Navigate to="/403" replace /> : <Outlet />;
};

export default RequireNotUser; 