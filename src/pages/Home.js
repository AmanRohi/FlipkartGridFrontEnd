import { useNavigate } from "react-router-dom";
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
    {isLoading===true ? <Loader/> : <div
    //  from-gray-900 to-gray-600 bg-gradient-to-b
     
      className="w-screen h-screen  flex justify-center items-center from-gray-900 to-gray-600 bg-gradient-to-b"
    >
      <div className="h-full w-[100%] flex justify-center items-center">
        <img
          src="./images/home7.png"
          className="w-[760px] rounded-lg shadow-yellow-200"
        />
      </div>
      {/* <div className="h-full w-[50%] flex justify-center items-center">
      <img
          src="./images/home7.png"
          className="w-[500px] rounded-lg shadow-yellow-200"
        />
      </div> */}
      <div className="flex justify-center items-center w-[50%]">
        <div className=" w-[400px] h-[300px]">
          <p
            className="text-center p-4
           bg-indigo-500 text-white
            text-[25px] font-montserrat"
          >
          <b>
            {/* Win Loyalty Points */}
            SparkRewards 💰💸💸
            </b>
          </p>
          <p className=" text-center text-[30px] font-montserrat mt-10 text-white ">
            {/* 𝓈𝒾𝑔𝓃 𝒾𝓃 𝒶𝓈 */}
            <b>Sign in as ❤️</b> 
          </p>
          <div className="flex flex-col  mt-16 gap-4">
            <button
              onClick={() => {
                navigate("/businessHome");
              }}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-full"
            >
              BUSINESS
            </button>
            <button
              onClick={() => {
                navigate("/customerHome");
              }}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-full"
            >
              CUSTOMER
            </button>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
};

export default Home;
