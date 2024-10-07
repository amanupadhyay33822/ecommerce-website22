import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { TbBrandYoutube } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className='bg-black text-white sm:text-[15px] '>
      <div className='h-[300px] lg:mx-0 mx-4 '>
        <div className='lg:flex sm:grid    justify-around py-5'>
          <div className='flex gap-8 sm:gap-3 items-center'>
            <div className='text-xl font-bold'>3legant<b className='text-gray-400'>.</b></div>
            <div className="h-6 border-1 border-gray-400"></div>
            <div className='text-md'>Git & Decoration Store</div>
          </div>
          <div className='flex lg:gap-5 gap-4 sm:mt-4'>
            <Link className='text-white no-underline' to='/home'>Home</Link>
            <Link className='text-white no-underline' to='/shop'>Shop</Link>
            <Link className='text-white no-underline' to='/product'>Product</Link>
            <Link className='text-white no-underline'>Blog</Link>
            <Link className='text-white no-underline' to='/contactus'>Contact Us</Link>
          </div>
        </div>
        <div className="bottom-0 left-0 w-[1150px] ml-48 h-[0.9px] bg-gray-400"></div>
        <div className='lg:flex sm:grid sm:grid-rows-4   justify-around items-center pt-5'>
          <div className='flex gap-16 text-white items-center '>
            <div className='text-sm '>Copyright © 2023 3legant. All rights reserved</div>
            <div className='text-sm font-bold '>Privacy Policy</div>
            <div className='text-sm font-bold '>Terms of Use</div>
          </div>
          <div className='flex gap-10 lg:mx-0  items-center'>
            <IoLogoInstagram style={{ 'fontSize': '30px' }} />
            <FiFacebook style={{ 'fontSize': '30px' }} />
            <TbBrandYoutube style={{ 'fontSize': '30px' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
