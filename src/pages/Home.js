import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
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
    <div
      className="w-screen h-screen  
       flex   from-gray-900 to-gray-600 bg-gradient-to-b
        "
    >
      <div className="h-full w-[50%] flex justify-center items-center">
        <img
          src="./images/home1.jpg"
          className="w-[500px] rounded-lg shadow-yellow-200"
        />
      </div>
      <div className="flex justify-center items-center w-[50%]">
        <div className=" w-[400px] h-[300px]">
          <p
            className="text-center p-4
           bg-green-700 text-white
            text-[25px] font-serif"
          >
            Win Loyalty Points
          </p>
          <p className=" text-center text-[30px] font-thin mt-10 text-white ">
            𝓈𝒾𝑔𝓃 𝒾𝓃 𝒶𝓈
          </p>
          <div className="flex flex-col  mt-16 gap-4">
            <button
              onClick={() => {
                navigate("/businessHome");
              }}
              className="px-8 
            py-4 border-4 border-green-700 
            hover:bg-green-700 
            hover:text-white text-[20px] font-thin tracking-wider rounded-md text-white"
            >
              BUSINESS
            </button>
            <button
              onClick={() => {
                navigate("/customerHome");
              }}
              className="px-8 py-4 border-4 border-green-700
             hover:bg-green-700 
            hover:text-white text-[20px] font-thin tracking-wider rounded-md text-white"
            >
              CUSTOMER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
