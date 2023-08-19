import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loader from "./loader";
import Navbar from "./Navbar";
function TransactionHistory() {
  const dispatch = useDispatch();
  const customer = useSelector((store) => store.customer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const [response, setResponse] = useState(null);
  const getResponse = async () => {
    const accessToken = customer.data.accessToken;
    const rr = await axios.post(
      "https://flipkartbackend-un9n.onrender.com/getTransactionHistroy",
      {},
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
        },
      }
    );

    setResponse(rr.data);
    console.log(rr.data);
  };
  useEffect(() => {
    getResponse();
  }, []);
  console.log(response);
  return (
    <div>
      {response === null || isLoading === true ? (
        <Loader />
      ) : (
        <div
          className="w-screen h-screen 
      flex flex-col items-center gap-7"
        >
          <Navbar />
          <div className="w-[90%] shadow-md shadow-gray-500">
            <div className="flex justify-between bg-indigo-400 px-4 py-3 shadow-sm shadow-gray-300 rounded-md ">
              <p className=" text-white text-[20px]">Virat Kohli</p>
              <p className=" text-white text-[20px]">virat@gmail.com</p>
            </div>
            <div className="flex flex-col gap-4  p-12 overflow-scroll h-full">
              {response.map((transaction) => (
                <motion.div
                  animate={{ y: 0, opacity: 1 }}
                  initial={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className=" bg-white w-max h-[100px] drop-shadow-lg rounded-md shadow-md shadow-gray-500 flex flex-col justify-between p-2 py-4"
                >
                  <h3 className=" px-3 py-1 bg-indigo-500 text-center text-white text-[15px] rounded-md">
                    From : {transaction.from}
                  </h3>
                  <h3 className=" px-3 py-1 bg-indigo-500 text-center text-white text-[15px] rounded-md">
                    To : {transaction.to}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
