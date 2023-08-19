import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RegisterCustomer } from "./";
const ProtectedCustomer = ({ children }) => {
  const customer = useSelector((store) => store.customer);
  console.log("customer route:", customer);
  if (!customer) return <Navigate to="/joinCustomer" />;
  return children;
};

export default ProtectedCustomer;
