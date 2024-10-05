import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie'
import axios from 'axios';  // Import axios
import cart1 from "../asserts/images/cart1.png"
import cart2 from "../asserts/images/cart2.png"
import cart3 from "../asserts/images/cart3.png"

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/get`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`, // Include the token in the request header
          },
        }); // Replace with your actual API endpoint
        setCartItems(response.data); // Assuming your API returns an array of cart items
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
    setTotal(newSubtotal);
  }, [cartItems]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div
      className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg flex flex-col transition-transform transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Cart</h2>
          <button
            onClick={onClose}
            className="w-[35px] h-[35px] rounded-full bg-black flex justify-center items-center"
          >
            <AiOutlineClose style={{ fontSize: '24px', color: 'white' }} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 flex-1 overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4 border-b pb-2"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                {/* Product Details */}
                <div className="flex flex-col flex-grow ml-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-500 text-sm">Color: {item.color}</span>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center border-black border-1 rounded-sm w-[70px] gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className=""
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className=""
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Item Total Price */}
                <div className="flex flex-col items-end mt-[-30px]">
                  <span className="font-semibold">
                    ${item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-500 text-sm mt-2"
                  >
                    <AiOutlineClose style={{ fontSize: '15px' }} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
          )}
        </div>

        {/* Summary and Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 ">
            <div className="flex justify-between mb-4 pb-2 border-b">
              <span className="text-sm">Subtotal:</span>
              <span className="text-sm font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-md font-semibold">Total:</span>
              <span className=" text-md font-semibold">${total.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-black text-white py-2 rounded mb-2 hover:bg-blue-700 transition-colors"
              onClick={() => {
                alert('Proceeding to checkout!');
              }}
            >
              Checkout
            </button>
            <div className='flex justify-center'>
              <div className="relative">
                <div className='flex items-center gap-2'>
                  <div className="text-[12px] font-bold">View Card </div>
                </div>
                <div className="absolute bottom-0 left-0 w-14 ml-[1px] h-[1px] bg-black"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
