import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./loader";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
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

  const navigate = useNavigate();
  return (
    <div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div
          className="w-screen h-screen  
       flex flex-col 

        "
        >
          <div className="flex justify-between  w-full h-max px-6 py-8 items-center">
            <div className="flex items-center gap-2">
              <img
                src="https://nextly.web3templates.com/img/logo.svg"
                className="w-[35px]"
              />
              <p className="font-medium text-violet-600 tracking-wide text-[25px]">
                Spark Reward
              </p>
            </div>
            <div className="flex  w-[40%] justify-between">
              <Link
                to="/"
                className="text-[19px] font-normal hover:cursor-pointer hover:text-violet-600"
              >
                Home
              </Link>
              <Link
                to="/terms_conditions"
                className="text-[19px] font-normal hover:cursor-pointer hover:text-violet-600"
              >
                Terms & Condition
              </Link>
              <Link
                to="/aboutUs"
                className="text-[19px] font-normal hover:cursor-pointer hover:text-violet-600"
              >
                About Us
              </Link>
            </div>
            <button className="bg-violet-600 px-4 py-2 rounded-md text-white tracking-wide">
              Get Started
            </button>
          </div>
          <div className=" p-8 flex  justify-between items-center">
            <div className="">
              <img src="./images/hero.webp" className="w-[500px] h-[500px]" />
            </div>
            <div className="flex justify-center items-center w-[50%]">
              <div className=" w-[400px] h-[300px] font-ubuntu">
                <p
                  className="text-center p-4
           bg-violet-700 text-white
            text-[25px]  "
                >
                  Win Loyalty Points
                </p>
                <p className=" text-center text-[30px] font-thin mt-10 text-black ">
                  𝓈𝒾𝑔𝓃 𝒾𝓃 𝒶𝓈
                </p>
                <div className="flex flex-col  mt-16 gap-4">
                  <button
                    onClick={() => {
                      navigate("/businessHome");
                    }}
                    className="px-8 
            py-4 border-4 border-violet-700 
            hover:bg-violet-700 
            hover:text-white text-[20px] font-thin tracking-wider rounded-md text-black"
                  >
                    BUSINESS
                  </button>
                  <button
                    onClick={() => {
                      navigate("/customerHome");
                    }}
                    className="px-8 py-4 border-4 border-violet-700
                hover:bg-violet-700 
            hover:text-white text-[20px] font-thin tracking-wider rounded-md text-black"
                  >
                    CUSTOMER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
