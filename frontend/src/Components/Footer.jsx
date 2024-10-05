import React from 'react'
import { Link } from 'react-router-dom';
import { FiFacebook } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { TbBrandYoutube } from "react-icons/tb";
const Footer = () => {
  return (
    <div className='bg-black text-white h-[300px]'>
              <div className=''>
              <div className='flex justify-around py-5 '>
                <div className='flex gap-8 items-center'>
                  <div className='text-xl font-bold'>3legant<b className='text-gray-400'>.</b></div>
                  <div className="h-6 border-1 border-gray-400"></div>
                  <div className='text-md'>Git & Decoration Store</div>
                </div>
                < div className='flex gap-5' >
                  <Link className='text-white no-underline'>Home</Link>
                  <Link className='text-white no-underline'>Shop</Link>
                  <Link className='text-white no-underline'>Product</Link>
                  <Link className='text-white no-underline'>Blog</Link>
                  <Link className='text-white no-underline'>Contact Us</Link>
                </div>
              </div>
              <div className="bottom-0 left-0 w-[1150px] ml-48  h-[0.9px] bg-gray-400"></div>
              <div className='flex justify-around items-center pt-5'>
                <div className='flex gap-16 text-white items-center '>
                  <div className='text-sm '>Copyright © 2023 3legant. All rights reserved</div>
                  <div  className='text-sm font-bold '>Privacy Plolicy</div>
                  <div className='text-sm font-bold '>Terms of Use</div>
                </div>
                <div className='flex gap-10 items-center'>
                <IoLogoInstagram style={{'fontSize':'30px'}}/>
                <FiFacebook style={{'fontSize':'30px'}}/>
                <TbBrandYoutube style={{'fontSize':'30px'}} />
                </div>
              </div>
              </div>
              
            </div>
  )
}

export default Footer