import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireAdminRole = () => {
  const cookies = new Cookies();
  const role = cookies.get("role");

  // الأدمن يمكنه الوصول للداش بورد فقط
  return role === "admin" ? <Outlet /> : <Navigate to="/403" replace />;
};

export default RequireAdminRole; 