// // src/components/Navbar.js
// import React from 'react';
// import Logo from '../asserts/images/Logo.png'; // Ensure correct path
// import { NavLink } from 'react-router-dom';
// import { TfiSearch } from 'react-icons/tfi';
// import { HiOutlineShoppingBag } from 'react-icons/hi2';
// import { CgProfile } from 'react-icons/cg';

// const Navbar = ({ onCartClick }) => {
//   return (
//     <div className="border-t border-b border-gray-300">
//       <div className="mx-20 flex justify-between p-4">
       
//         <div>
//           <img src={Logo} alt="Logo" className="h-8 w-auto" />
//         </div>

        
//         <div className="flex gap-6">
//           <NavLink
//             to="/home"
//             className={({ isActive }) =>
//               isActive ? 'text-black font-semibold no-underline' : 'text-gray-500 no-underline'
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/shop"
//             className={({ isActive }) =>
//               isActive ? 'text-black font-semibold no-underline' : 'text-gray-500 no-underline'
//             }
//           >
//             Shop
//           </NavLink>
//           <NavLink
//             to="/product"
//             className={({ isActive }) =>
//               isActive ? 'text-black  no-underline' : 'text-gray-500 no-underline'
//             }
//           >
//             Product
//           </NavLink>
//           <NavLink
//             to="/contactus"
//             className={({ isActive }) =>
//               isActive ? 'text-black font-semibold no-underline' : 'text-gray-500 no-underline'
//             }
//           >
//             Contact Us
//           </NavLink>
//         </div>

        
//         <div className="flex gap-6 items-center">
//           <TfiSearch style={{ fontSize: '24px', cursor: 'pointer' }} />
//           <HiOutlineShoppingBag
//             style={{ fontSize: '24px', cursor: 'pointer' }}
//             onClick={onCartClick}
//           />
//           <CgProfile style={{ fontSize: '24px', cursor: 'pointer' }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import Logo from '../asserts/images/Logo.png'; // Ensure correct path
import { NavLink } from 'react-router-dom';
import { TfiSearch } from 'react-icons/tfi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi'; // Import hamburger icon
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon

const Navbar = ({ onCartClick }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="border-t border-b border-gray-300 relative">
      <div className="sm:mx-10 lg:mx-20 flex justify-between items-center p-4">
        {/* Logo */}
        <div>
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Hamburger Icon for small screens */}
        <div className="lg:hidden">
          <GiHamburgerMenu
            onClick={toggleSidebar}
            className="text-gray-500 cursor-pointer"
            style={{ fontSize: '24px' }}
          />
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex gap-6">
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
              isActive ? 'text-black no-underline' : 'text-gray-500 no-underline'
            }
          >
            Product
          </NavLink>
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              isActive ? 'text-black font-semibold no-underline' : 'text-gray-500 no-underline'
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Icons for Desktop */}
        <div className="hidden lg:flex gap-6 items-center">
          <TfiSearch style={{ fontSize: '24px', cursor: 'pointer' }} />
          <HiOutlineShoppingBag
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={onCartClick}
          />
          <CgProfile style={{ fontSize: '24px', cursor: 'pointer' }} />
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-60 h-full bg-white border-l border-gray-300 shadow-lg z-50 p-4">
          {/* Close Icon */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Menu</h2>
            <AiOutlineClose
              onClick={toggleSidebar}
              className="text-gray-500 cursor-pointer"
              style={{ fontSize: '24px' }}
            />
          </div>

          <nav className="mt-4 flex flex-col gap-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? 'text-black font-semibold' : 'text-gray-500'
              }
              onClick={toggleSidebar} // Close sidebar on link click
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? 'text-black font-semibold' : 'text-gray-500'
              }
              onClick={toggleSidebar}
            >
              Shop
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? 'text-black font-semibold' : 'text-gray-500'
              }
              onClick={toggleSidebar}
            >
              Product
            </NavLink>
            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                isActive ? 'text-black font-semibold' : 'text-gray-500'
              }
              onClick={toggleSidebar}
            >
              Contact Us
            </NavLink>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
