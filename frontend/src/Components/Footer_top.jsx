import React from 'react'
import paste from "../asserts/images/Paste image (1).png"
import { AiOutlineMail } from "react-icons/ai";

const Footer_top = () => {
  return (
    <>
    <div className="relative sm:mt-[-40px] lg:mt-0">
              <img src={paste} alt=" " className=" object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <div className=" lg:text-4xl sm:text-[10px]  text-black  font-bold ">Join Our Newsletter</div>
                <div className=" lg:text-md sm:text[8px] text-black ">Sign up for deals, new products, and promotions</div>
                <div className="flex justify-between text-black items-center lg:space-x-2 space-x-1">
                  <AiOutlineMail className="text-2xl" />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="px-4 py-2   text-black bg-transparent rounded-md outline-none"
                  />
                  <button className="lg:text-gray-400 text-black font-semibold">Signup</button>
                  
                </div>
                <div className="bottom-0 left-0 w-80  h-[2px] lg:bg-gray-400 bg-black"></div>
              </div>
            </div>
            
</>
  )
}

export default Footer_top