import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedBusiness = ({ children, path }) => {
  const business = useSelector((store) => store.business);
  if (!business) return <Navigate to="/joinBusiness" />;
  return children;
};

export default ProtectedBusiness;
