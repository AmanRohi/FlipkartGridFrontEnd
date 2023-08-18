import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Protected=({children,path})=>{
    const navigate = useNavigate();
    const customer = useSelector((store) => store.customer);
    if(customer) navigate("/transactionHistory");
    if(path==='/home') navigate("/transactionHistory");
   return children; 
}

export default Protected;
