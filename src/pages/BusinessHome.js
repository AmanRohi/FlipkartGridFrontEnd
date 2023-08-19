import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
function BusinessHome() {
  const business = useSelector((store) => store.business);
  const response = null;
  const getResponse = async () => {
    response = await axios.post(
      "https://flipkartbackend-un9n.onrender.com/getBusinessDetails",
      {
        user: business.user,
      }
    );
  };
  useEffect(() => {
    if (business) getResponse();
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
      <div className="w-[50%] h-[60%] bg-white p-5 rounded-md ">
        <div className="flex justify-between bg-indigo-400 px-4 py-3 shadow-md shadow-gray-300 rounded-md">
          <p className=" text-white text-[20px]">{response.name}</p>
          <p className=" text-white text-[20px]">{response.email}</p>
        </div>

        <div className="mt-16">
          <p className="bg-green-700 px-5 py-2 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300">
            Token
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 ">
          <input
            type="text"
            placeholder="Product Name"
            className="outline-none px-2 py-1"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="px-1 py-3 bg-indigo-500 rounded-md text-white text-[18px] shadow-md shadow-blue-400 "
          >
            Add Product
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default BusinessHome;
