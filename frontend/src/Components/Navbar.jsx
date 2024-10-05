// src/components/Navbar.js
import React from 'react';
import Logo from '../asserts/images/Logo.png'; // Ensure correct path
import { NavLink } from 'react-router-dom';
import { TfiSearch } from 'react-icons/tfi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { CgProfile } from 'react-icons/cg';

const Navbar = ({ onCartClick }) => {
  return (
    <div className="border-t border-b border-gray-300">
      <div className="mx-20 flex justify-between p-4">
       
        <div>
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </div>

        
        <div className="flex gap-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? 'text-black font-semibold no-underline' : 'text-gray-500 no-underline'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? 'text-black font-semibold no-underline' : 'text-gray-500 no-underline'
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive ? 'text-black  no-underline' : 'text-gray-500 no-underline'
            }
          >
            Product
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-black font-semibold no-underline' : 'text-gray-500 no-underline'
            }
          >
            Contact Us
          </NavLink>
        </div>

        
        <div className="flex gap-6 items-center">
          <TfiSearch style={{ fontSize: '24px', cursor: 'pointer' }} />
          <HiOutlineShoppingBag
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={onCartClick}
          />
          <CgProfile style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
