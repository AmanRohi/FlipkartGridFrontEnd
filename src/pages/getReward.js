// src/components/RegisterBusiness.js
import React, { useEffect, useState } from "react";
import "./RegisterBusiness.css"; // Import the custom CSS file
import { Wallet, ethers } from "ethers";
import axios from "axios";
import "./ProductList.css"; // Import the CSS file
import { motion, transform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Abi from "./Abi";
const GetReward = () => {
  const [products, setProducts] = useState([]);
  const customer = useSelector((store) => store.customer);
  
  useEffect(() => {
    // Fetch product data from the backend

    const startUp = async () => {
      await axios
        .get("http://localhost:3000/getListOfBusiness")
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
    console.log(tokenContractAddress);
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
          "http://localhost:3000/getReward",
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

        // // Handle the response from the backend
        console.log(response.data + " ....this "); // This should contain user details and access token
      } catch (error) {
        console.log(error);
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

        //   // businessId , amount
        const txResponse = await transaction.wait();
        console.log("Transaction Response : ", txResponse.transactionHash);

        const hash = txResponse.transactionHash;

        const accessToken = customer.data.accessToken;
        const response = await axios.post(
          "http://localhost:3000/joinBusiness",
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

        console.log(response.data);
      } catch (error) {
        console.log(error);
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
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractAddress = "0x06441b211a8729B40FE15955F9A58b2F5829d022"; // Replace with your smart contract address
        const contractABI = [
          {
            inputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            constant: true,
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "businesses",
            outputs: [
              {
                internalType: "address",
                name: "busAd",
                type: "address",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "email",
                type: "string",
              },
              {
                internalType: "bool",
                name: "isReg",
                type: "bool",
              },
              {
                internalType: "contract loyalty_points",
                name: "lt",
                type: "address",
              },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
          },
          {
            constant: true,
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "customers",
            outputs: [
              {
                internalType: "address",
                name: "cusAd",
                type: "address",
              },
              {
                internalType: "string",
                name: "firstName",
                type: "string",
              },
              {
                internalType: "string",
                name: "lastName",
                type: "string",
              },
              {
                internalType: "string",
                name: "email",
                type: "string",
              },
              {
                internalType: "bool",
                name: "isReg",
                type: "bool",
              },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
          },
          {
            constant: false,
            inputs: [
              {
                internalType: "string",
                name: "_bName",
                type: "string",
              },
              {
                internalType: "string",
                name: "_email",
                type: "string",
              },
              {
                internalType: "address",
                name: "_bAd",
                type: "address",
              },
              {
                internalType: "string",
                name: "_symbol",
                type: "string",
              },
              {
                internalType: "uint8",
                name: "_decimal",
                type: "uint8",
              },
            ],
            name: "regBusiness",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            constant: true,
            inputs: [
              {
                internalType: "address",
                name: "_bAd",
                type: "address",
              },
            ],
            name: "getBusinessCoin",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
          },
          {
            constant: false,
            inputs: [
              {
                internalType: "string",
                name: "_firstName",
                type: "string",
              },
              {
                internalType: "string",
                name: "_lastName",
                type: "string",
              },
              {
                internalType: "string",
                name: "_email",
                type: "string",
              },
              {
                internalType: "address",
                name: "_cAd",
                type: "address",
              },
            ],
            name: "regCustomer",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            constant: false,
            inputs: [
              {
                internalType: "address",
                name: "_bAd",
                type: "address",
              },
            ],
            name: "joinBusiness",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            constant: false,
            inputs: [
              {
                internalType: "address",
                name: "_cAd",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_points",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "_bAd",
                type: "address",
              },
            ],
            name: "reward",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            constant: false,
            inputs: [
              {
                internalType: "uint256",
                name: "_points",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "_bAd",
                type: "address",
              },
            ],
            name: "listProductReward",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            constant: false,
            inputs: [
              {
                internalType: "address",
                name: "_cAd",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_points",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "_bAd",
                type: "address",
              },
            ],
            name: "spend",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
        ];

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        //spend(address _cAd,uint256 _points,address _bAd)
        const userAdd = await signer.getAddress();
        // uint256 _points
        const _points = ethers.utils.parseUnits("1", "18");
        const transaction = await contract.spend(
          userAdd,
          _points,
          businessWalletAddress
        );

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
          "http://localhost:3000/spend",
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

        // // Handle the response from the backend
        console.log(response.data); // This should contain user details and access token
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

  // _id businessWalletAddress name tokenContractAddress

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
        {products.map((product) => (
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10 }}
            className=" bg-white w-[23%] h-[200px] rounded-md"
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
  );
};

export default GetReward;
