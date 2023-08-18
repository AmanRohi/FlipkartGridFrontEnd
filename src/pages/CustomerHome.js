import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function CustomerHome() {
  const navigate = useNavigate();
  const customer = useSelector((store) => store.customer);
  const response = {
    firstName: "Aman",
    userEmail: "aman.rohi@gamil.com",
    loyaltyPoints: [{ business: { name: "flipkart" }, totalCount: 10 }],
  };
  const getResponse = async () => {
    response = await axios.post(
      "https://flipkartbackend-un9n.onrender.com/getCustomerDetails",
      {
        user: customer.user,
      }
    );
  };
  useEffect(() => {
    if (customer) getResponse();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected to MetaMask");
        console.log(window.ethereum);
      } catch (error) {
        alert("Connect to Metamask !!");
        connectWallet();
      }
    }
  };

  useEffect(() => {
    connectWallet();
  }, []); // means at startup !!

  return (
    <div className="w-screen h-screen   flex justify-center items-center from-gray-900 to-gray-600 bg-gradient-to-b">
      <div className="w-[42%] h-[90%] bg-white p-5 rounded-md ">
        <div className="flex justify-between bg-indigo-400 px-4 py-3 shadow-md shadow-gray-300 rounded-md">
          <p className=" text-white text-[20px]">{response.firstName}</p>
          <p className=" text-white text-[20px]">{response.userEmail}</p>
        </div>

        <div className="mt-12 h-[60%]  p-2 ">
          <p className="bg-green-700 px-5 py-1 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300">
            Loyalty Points
          </p>
          <div className="mt-4 flex gap-2 flex-wrap h-[95%] overflow-scroll">
            {response.loyaltyPoints.map((res) => {
              return (
                <div className="w-[140px] p-4 h-[90px] bg-gray-500/95 rounded-md text-white justify-center items-center flex flex-col gap-1 text-[22px]">
                  <p>{res.business.name}</p>
                  <p>{res.totalCount}</p>
                </div>
              );
            })}
          </div>
        </div>

        <motion.button
          onClick={() => {
            navigate("/getReward");
          }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="mt-16 bg-yellow-700 px-5 py-2 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300"
        >
          Purchase Product
        </motion.button>
        <motion.button
          onClick={() => {
            navigate("/transactionHistory");
          }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="ml-5 bg-red-700 px-5 py-2 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300"
        >
          Transaction History
        </motion.button>
      </div>
    </div>
  );
}

export default CustomerHome;
