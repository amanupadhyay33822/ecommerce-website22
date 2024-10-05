import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import ShoppingCart from '../Components/ShoppingCart';
import { FaCheck } from "react-icons/fa6";
import CheckoutDetails from '../Components/CheckoutDetails';
import OrderDetails from '../Components/OrderDetails';
import Footer from "../Components/Footer"
const Booking = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Shopping cart'); 
  const [isPlacedOrder,setPlaceOrder] = useState(false)
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckedOut(true);
  };

  const handlePlaceOrder =()=>{
    setPlaceOrder(true)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    console.log("Clicked")
    
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div >
      <div>
        <Navbar onCartClick={toggleCart} />
      </div>
      <div className='flex justify-center items-center font-semibold text-5xl mt-8 mb-8'>
        Cart
      </div>
      <div className='flex flex-col justify-center items-center w-full'>
        <div className="mb-4  ">
          <ul
            className="flex gap-12 -mb-px text-sm font-medium text-center"
            id="default-tab"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <div
                className={`inline-block p-4 border-b-2  rounded-t-lg ${
                 (activeTab === 'Shopping cart' || isCheckedOut) ? (isCheckedOut ? 'border-green-500' : 'border-black text-black') : 'text-gray-600 border-gray-300'
                }`}
                //onClick={() => handleTabClick('Shopping cart')}
                type="button"
                role="tab"
                aria-selected={activeTab === 'Shopping cart'}
              >
                <div className=' flex gap-2 items-center justify-start'>
                    {isCheckedOut ?(
                        <div className='w-8 h-8 bg-green-500 flex justify-center items-center rounded-full'>
                            <FaCheck className='text-white'/>
                        </div>
                        
                    ):(
                    <div className={`${activeTab === 'Shopping cart' ? 'bg-black' : 'bg-gray-400'} flex justify-center items-center text-white w-[30px] h-[30px] rounded-full`}>
                        1
                    </div>
                    )}
                    

                    <div className={`${isCheckedOut ? 'text-green-500 text-[17px]':''}`}>
                        Shopping cart
                    </div>
                </div>
                
              </div>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  (activeTab === 'Checkout details' || isPlacedOrder) ? (isPlacedOrder ? 'border-green-500' : 'border-black text-black') : 'text-gray-600 border-gray-300'
                }`}
                //onClick={() => handleTabClick('Checkout details')}
                type="button"
                role="tab"
                aria-selected={activeTab === 'Checkout details'}
              >
                <div className=' flex gap-2 items-center'>
                {isPlacedOrder ?(
                        <div className='w-8 h-8 bg-green-500 flex justify-center items-center rounded-full'>
                            <FaCheck className='text-white'/>
                        </div>
                        
                    ):(
                    <div className={`${activeTab === 'Checkout details' ? 'bg-black' : 'bg-gray-400'} flex justify-center items-center text-white w-[30px] h-[30px] rounded-full`}>
                        2
                    </div>
                    )}

                    <div className={`${isPlacedOrder ? 'text-green-500 text-[17px]':''}`}>
                        Checkout details
                    </div>
                </div>
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'Order complete' ? 'border-black text-black' : 'text-gray-600 border-gray-300'
                }`}
                //onClick={() => handleTabClick('Order complete')}
                type="button"
                role="tab"
                aria-selected={activeTab === 'Order complete'}
              >
                <div className=' flex gap-2 items-center'>
                    <div className={`${activeTab === 'Order complete' ? 'bg-black' : 'bg-gray-400'} flex justify-center items-center text-white w-[30px] h-[30px] rounded-full`}>
                        3
                    </div>

                    <div className=''>
                        Order complete
                    </div>
                </div>
              </button>
            </li>
            
          </ul>
        </div>
        <div id="default-tab-content">
          <div
            className={`${
              activeTab === 'Shopping cart' ? 'block' : 'hidden'
            }`}
            id="profile"
            role="tabpanel"
          >
            <ShoppingCart onCheckout={handleCheckout} setActiveTab={setActiveTab}/>
          </div>
          <div
            className={`${
              activeTab === 'Checkout details' ? 'block' : 'hidden'
            }`}
            id="dashboard"
            role="tabpanel"
          >
            <CheckoutDetails onPlace={handlePlaceOrder} setActiveTab={setActiveTab}/>
          </div>
          <div
            className={`${
              activeTab === 'Order complete' ? 'block' : 'hidden'
            }`}
            id="settings"
            role="tabpanel"
          >
            <OrderDetails/>
          </div>
          
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Booking;
