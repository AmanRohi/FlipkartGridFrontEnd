// src/components/RegisterBusiness.js
import React, { useEffect, useState } from "react";
import "./RegisterBusiness.css"; // Import the custom CSS file
import { Wallet, ethers } from "ethers";
import axios from "axios";
import "./ProductList.css"; // Import the CSS file
import { motion, transform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Abi from "./Abi";
import Loader from "./loader";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GetReward = () => {
  const [products, setProducts] = useState([]);
  const customer = useSelector((store) => store.customer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // Fetch product data from the backend

    const startUp = async () => {
      await axios
        .get("https://flipkartbackend-un9n.onrender.com/getListOfBusiness")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    };

    startUp();
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

  // ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRhMTE3MDVhM2NmMzUyNTE3ZjIwZWIiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIwMTI5MTJ9.v3_lYDMHJbd273SEUa1e5rChmjD5ozYCiFWvuNC6xAo""
  const getBusinessBalance = async (tokenContractAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const add = await signer.getAddress();
    const tokenABI = Abi.tokenABI;
    const flipkartAddress = "0xee100e284DC8417aC5D803AbA0DcD743E76B1374";

    // idhar add token contract address by taking it from the :
    // database itself !!
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      tokenABI,
      provider
    );

    const tokenBalance = await tokenContract.balanceOf(flipkartAddress);
    console.log("Flip ", tokenBalance.toString());
  };

  const handleSubmit = async (
    productId,
    businessWalletAddress,
    tokenContractAddress
  ) => {
    // e.preventDefault();
    await connectWallet();
    // console.log(productId);
    console.log(tokenContractAddress + " here it sisisisii");
    alert(`Token Generated ${tokenContractAddress}`);
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractAddress = "0x06441b211a8729B40FE15955F9A58b2F5829d022"; // Replace with your smart contract address
        const contractABI = Abi.contractABI;

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const userAdd = await signer.getAddress();
        // uint256 _points
        const _points = ethers.utils.parseUnits("1", "18");
        const transaction = await contract.reward(
          userAdd,
          _points,
          businessWalletAddress
        );

        setIsLoading(true);
        const txResponse = await transaction.wait();
        console.log("Transaction Response : ", txResponse.transactionHash);

        const hash = txResponse.transactionHash;

        // userWalletAddress:req.body.userWalletAddress,
        //   firstName:req.body.firstName,
        //   lastName:req.body.lastName,
        //   userEmail:req.body.userEmail,

        // const pwd=customerData.pwd;
        // const userWalletAddress=add;
        // const userEmail=customerData.userEmail;
        // const firstName=customerData.firstName;
        // const lastName=customerData.lastName;

        const accessToken = customer.data.accessToken;
        // Send transaction hash and other data to your backend
        const response = await axios.post(
          "https://flipkartbackend-un9n.onrender.com/getReward",
          {
            signedTransaction: hash,
            businessId: productId,
            amount: 1,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
              // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
            },
          }
        );

        setIsLoading(false);
        // // Handle the response from the backend
        console.log(response.data + " ....this ");
        // This should contain user details and access token
        toast.success("Token Successfully Purchased!");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      await connectWallet();
    }
  };

  const handleJoinBusiness = async (
    productId,
    businessWalletAddress,
    tokenContractAddress
  ) => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractAddress = "0x06441b211a8729B40FE15955F9A58b2F5829d022"; // Replace with your smart contract address
        const contractABI = Abi.contractABI;
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // reward(address _cAd, uint256 _points,address _bAd)
        const transaction = await contract.joinBusiness(businessWalletAddress);

        setIsLoading(true);
        //   // businessId , amount
        const txResponse = await transaction.wait();
        console.log("Transaction Response : ", txResponse.transactionHash);

        const hash = txResponse.transactionHash;

        const accessToken = customer.data.accessToken;
        const response = await axios.post(
          "https://flipkartbackend-un9n.onrender.com/joinBusiness",
          {
            signedTransaction: hash,
            businessId: productId,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken, // Provide your access token
            },
          }
        );

        setIsLoading(false);

        console.log(response.data);
        toast.success("successfully joined Business");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const handleSpend = async (
    productId,
    businessWalletAddress,
    tokenContractAddress
  ) => {
    // e.preventDefault();
    await connectWallet();
    // console.log(productId);
    console.log(tokenContractAddress);

    if (!window.ethereum) {
      console.error("MetaMask not detected");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tokenContractABI = Abi.tokenABI; // Your contract's ABI

    const contract = new ethers.Contract(
      tokenContractAddress,
      tokenContractABI,
      signer
    );

    const burnAddress = "0x2b41f55CDE00d788b0de73767932f90507dB86ce"; // Address where tokens are burned

    try {
      const _points = ethers.utils.parseUnits("1", "18");
      const tx = await contract.transfer(burnAddress, _points); // Use the actual burn method and parameters
      setIsLoading(true);
      const trans=await tx.wait();
      setIsLoading(false);
      
      const accessToken = customer.data.accessToken;
        // Send transaction hash and other data to your backend
        const response = await axios.post(
          "https://flipkartbackend-un9n.onrender.com/spend",
          {
            signedTransaction: trans.transactionHash,
            businessId: productId,
            amount: 1,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
              // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
            },
          }
        );

      console.log("Tokens burned successfully");
      toast.success("Successfully Spend Token");
      



    } catch (error) {
      console.error("Error burning tokens", error);
      toast.error(error.message);
    }
  };

  const getAllBusiness = async () => {
    const response = await axios.get(
      "https://flipkartbackend-un9n.onrender.com/getListOfBusiness"
    );

    // Handle the response from the backend
    console.log(response.data); // This should contain user details and access token
  };

  // _id businessWalletAddress name tokenContractAddress

  return (
    <div>
      {products === null || isLoading === true ? (
        <Loader />
      ) : (
        <div
          className="w-screen h-screen 
      flex flex-col items-center gap-8"
        >
          {/* Same as */}
          <Navbar />
          <div className="w-[90%]  flex flex-col shadow-md shadow-gray-500">
            <div className=" w-full flex justify-between bg-indigo-400 px-4 py-3  shadow-md shadow-gray-300  rounded-md ">
              <p className=" text-white text-[20px]">Business Name</p>
              <p className=" text-white text-[20px]">Business Email</p>
            </div>
            <div className="flex flex-wrap gap-y-7 gap-x-7  p-12 overflow-scroll h-full">
              {products.map((product) => (
                <motion.div
                  animate={{ y: 0, opacity: 1 }}
                  initial={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className=" bg-white w-[23%] h-[200px] rounded-md drop-shadow-lg shadow-md shadow-blue-500"
                >
                  <h3 className=" px-3 py-1 bg-indigo-500 text-center text-white text-[20px] rounded-t-md">
                    {product.name}
                  </h3>
                  <div className="flex flex-col mt-4 p-2 gap-2">
                    <button
                      className="bg-gradient-to-r from-sky-400 to-blue-500 text-white text-[20px] px-2 py-1 rounded-md"
                      onClick={() =>
                        handleSubmit(
                          product._id,
                          product.businessWalletAddress,
                          product.tokenContractAddress
                        )
                      }
                    >
                      Purchase
                    </button>
                    <button
                      className=" bg-gradient-to-r from-sky-400 to-blue-500 text-white text-[20px] px-2 py-1 rounded-md"
                      onClick={() =>
                        handleJoinBusiness(
                          product._id,
                          product.businessWalletAddress,
                          product.tokenContractAddress
                        )
                      }
                    >
                      Join
                    </button>

                    <button
                      className=" bg-gradient-to-r from-sky-400 to-blue-500 text-white text-[20px] px-2 py-1 rounded-md"
                      onClick={() =>
                        handleSpend(
                          product._id,
                          product.businessWalletAddress,
                          product.tokenContractAddress
                        )
                      }
                    >
                      Spend
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default GetReward;
