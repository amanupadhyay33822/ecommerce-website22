import React from 'react'
import paste from "../asserts/images/Paste image (1).png"
import { AiOutlineMail } from "react-icons/ai";

const Footer_top = () => {
  return (
    <div className="relative">
              <img src={paste} alt=" " className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <div className="text-4xl text-black font-bold mb-4">Join Our Newsletter</div>
                <div className="text-md text-black mb-4">Sign up for deals, new products, and promotions</div>
                <div className="flex justify-between text-black items-center space-x-2">
                  <AiOutlineMail className="text-2xl" />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="px-4 py-2   text-black bg-transparent rounded-md outline-none"
                  />
                  <button className="text-gray-400 font-semibold">Signup</button>
                  
                </div>
                <div className="bottom-0 left-0 w-80  h-[2px] bg-gray-400"></div>
              </div>
            </div>
  )
}

export default Footer_top