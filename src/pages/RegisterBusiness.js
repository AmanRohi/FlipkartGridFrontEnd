// src/components/RegisterBusiness.js
import React, { useEffect, useState } from "react";
import "./RegisterBusiness.css"; // Import the custom CSS file
import { ethers } from "ethers";
import axios from "axios";
import { mnemonicToEntropy } from "ethers/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { setBusiness, setCustomer } from "../reducer";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Abi from "./Abi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterBusiness = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    pwd: "",
    businessWalletAddress: "",
    tokenSymbol: "",
    // Add more fields as needed
  });

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

  // "0x1c9A0af0b1a14DaD32D93e9593740407Ac691BAe"
  const getBusinessBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const add = await signer.getAddress();
    const tokenABI = Abi.tokenABI;
    const flipkartAddress = "0x37144a383A69d528A1176Ba237a0F860dA160141";

    // idhar add token contract address by taking it from the :
    // database itself !!
    const tokenContract = new ethers.Contract(
      "0x5eA776A5665dABbE9E3e1279F09F46ebc1929A00",
      tokenABI,
      provider
    );

    const tokenBalance = await tokenContract.balanceOf(flipkartAddress);
    console.log("Flip ", tokenBalance.toString());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await connectWallet();
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractAddress = "0x06441b211a8729B40FE15955F9A58b2F5829d022"; // Replace with your smart contract address
        const contractABI = Abi.contractABI; // Replace with your smart contract ABI

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const add = await signer.getAddress();

        const tx = await contract.regBusiness(
          businessData.name,
          businessData.email,
          add, // Sender's address
          businessData.tokenSymbol, // Replace with the actual token symbol
          18 // Replace with the actual decimal value
        );

        setIsLoading(true);
        const txResponse = await tx.wait();
        console.log("Transaction Response : ", txResponse.transactionHash);

        const hash = txResponse.transactionHash;
        const ltAddress = await contract.getBusinessCoin(add);
        console.log("LT Address:", ltAddress);

        const password = businessData.pwd;
        const businessWalletAddress = add;
        const email = businessData.email;
        const name = businessData.name;
        // Send transaction hash and other data to your backend
        const response = await axios.post(
          "https://flipkartbackend-un9n.onrender.com/registerBusiness",
          {
            signedTransaction: hash,
            businessWalletAddress,
            name,
            email,
            pwd: password,
            tokenContractAddress: ltAddress,
            tokenSymbol: businessData.tokenSymbol,
          }
        );

        // Handle the response from the backend
        console.log(response.data); // This should contain user details and access token
        dispatch(setBusiness(response));

        setIsLoading(false);
        navigate("/businessHome");
      } catch (error) {
        console.log(error);
      }
    } else {
      await connectWallet();
    }
  };

  const getAllBusiness = async () => {
    const response = await axios.get(
      "https://flipkartbackend-un9n.onrender.com/getListOfBusiness"
    );

    // Handle the response from the backend
    console.log(response.data); // This should contain user details and access token
  };
  const dispatch = useDispatch();

  return (
    <div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div
          className="  w-screen h-screen  flex flex-col items-center gap-4 
     "
        >
          <Navbar />
          <div className="w-[30%] drop-shadow-xl bg-white shadow-lg shadow-gray-800 rounded-lg flex flex-col gap-4">
            <h2 className="text-center bg-indigo-500 py-3 text-white text-[20px] rounded-t-lg">
              Register Your Business
            </h2>
            <form onSubmit={handleSubmit} className="p-12">
              <input
                type="text"
                id="businessName"
                placeholder="Enter your Business Name"
                value={businessData.name}
                onChange={(e) =>
                  setBusinessData({ ...businessData, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                id="businessEmail"
                placeholder="Enter your Business Email"
                value={businessData.email}
                onChange={(e) =>
                  setBusinessData({ ...businessData, email: e.target.value })
                }
                required
              />

              <input
                type="text"
                id="pwd"
                placeholder="Enter your Password"
                value={businessData.pwd}
                onChange={(e) =>
                  setBusinessData({ ...businessData, pwd: e.target.value })
                }
                required
              />

              {/* <label htmlFor="wallet">Business Wallet Address</label>
          <input
            type="text"
            id="wallet"
            placeholder="Enter your wallet address"
            value={businessData.businessWalletAddress}
            onChange={(e) => setBusinessData({ ...businessData, businessWalletAddress: e.target.value })}
            required
          /> */}
              <input
                type="text"
                id="symb"
                placeholder="Enter your Token Symbol"
                value={businessData.tokenSymbol}
                onChange={(e) =>
                  setBusinessData({
                    ...businessData,
                    tokenSymbol: e.target.value,
                  })
                }
                required
              />

              {/* Add more input fields for other details */}
              <div className="flex flex-col mt-6  gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="px-1 py-3 bg-indigo-500 rounded-md text-white text-[18px]  shadow-md shadow-blue-400"
                >
                  Register
                </motion.button>
                <p className=" text-center p-1 ">
                  Already Registered ? <Link to="/loginBusiness">Sign In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterBusiness;
