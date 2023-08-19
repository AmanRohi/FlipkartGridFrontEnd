import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="flex p-8 gap-8 justify-center mt-20">
        <div
          className="w-[300px] h-[300px] shadow-md rounded-md bg-gray-500/20
        shadow-gray-500 drop-shadow-2xl flex items-center flex-col p-4 "
        >
          <img
            src="https://media.licdn.com/dms/image/C4E03AQGr4Lvjdrbxtg/profile-displayphoto-shrink_200_200/0/1633275043485?e=1697673600&v=beta&t=ci0F-G5mm0ysYyDvZc9KHVBX8NERcFKIqi_b6EXmhG8"
            className="rounded-full w-[150px] h-[150px]"
          />
          <p className=" text-[22px] tracking-wide">Aman Rohi</p>
          <p className="text-[17px]">B.Tech , CSE</p>
          <p>NSUT</p>
          <Link to="https://www.linkedin.com/in/aman-rohi-0053a1216/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              className="w-[30px] h-[30px] mt-2"
            />
          </Link>
        </div>
        <div
          className="w-[300px] h-[300px] shadow-md rounded-md bg-gray-500/20
        shadow-gray-500 drop-shadow-2xl flex items-center flex-col p-4 "
        >
          <img
            src="https://media.licdn.com/dms/image/D4D03AQGOQWd0B5yJ1g/profile-displayphoto-shrink_200_200/0/1692106118170?e=1697673600&v=beta&t=fEi5jz-Cn43XoSuA1NWzExB_1Fr7VlHrAazytsgUkz4"
            className="rounded-full w-[150px] h-[150px]"
          />
          <p className=" text-[22px] tracking-wide">Lakshya Sharma</p>
          <p className="text-[17px]">B.Tech , CSE</p>
          <p>NSUT</p>
          <Link to="https://www.linkedin.com/in/lakshay-sharma-74303122b/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              className="w-[30px] h-[30px] mt-2"
            />
          </Link>
        </div>
        <div
          className="w-[300px] h-[300px] shadow-md rounded-md bg-gray-500/20
        shadow-gray-500 drop-shadow-2xl flex items-center flex-col p-4 "
        >
          <img
            src="https://media.licdn.com/dms/image/C4E03AQFWUKXgIjINJQ/profile-displayphoto-shrink_200_200/0/1647357342483?e=1697673600&v=beta&t=_ll9dDYBecfh6m3Zg5W3KMCOc66SEuB7vCjHAIOt-co"
            className="rounded-full w-[150px] h-[150px]"
          />
          <p className=" text-[22px] tracking-wide">Aakshat Malhotra</p>
          <p className="text-[17px]">B.Tech , CSE</p>
          <p>NSUT</p>
          <Link to="https://www.linkedin.com/in/aakshat-malhotra-5019a821a/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              className="w-[30px] h-[30px] mt-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
