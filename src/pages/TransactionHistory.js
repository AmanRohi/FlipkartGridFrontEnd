import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
function TransactionHistory() {
  const dispatch = useDispatch();
  const customer = useSelector((store) => store.customer);

  const response = null;
  const getResponse = async () => {
    response = await axios.post(
      "https://flipkartbackend-un9n.onrender.com/getTransactionHistroy",
      {
        user: customer.user,
      }
    );
  };
  useEffect(() => {
    if (customer) getResponse();
  }, []);

  return (
    <div
      className="w-screen h-screen 
     from-gray-900 to-gray-600 bg-gradient-to-b flex flex-col"
    >
      <div className="flex justify-between bg-indigo-400 px-4 py-3 w-full fixed shadow-sm shadow-gray-300 rounded-md ">
        <p className=" text-white text-[20px]">Business Name</p>
        <p className=" text-white text-[20px]">Business Email</p>
      </div>
      <div className="flex flex-wrap gap-y-7 gap-x-7 mt-20 p-12 overflow-scroll h-full">
        {response.map((transaction) => (
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10 }}
            className=" bg-white w-[50%] h-[200px] rounded-md"
          >
            <h3 className=" px-3 py-1 bg-indigo-500 text-center text-white text-[20px] rounded-t-md">
              From : {transaction.from}
            </h3>
            <h3 className=" px-3 py-1 bg-indigo-500 text-center text-white text-[20px] rounded-t-md">
              To : {transaction.to}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
