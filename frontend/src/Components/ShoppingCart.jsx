import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";

const ShoppingCart = ({ onCheckout, setActiveTab }) => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingCost, setShippingCost] = useState(0); // Initial shipping cost

  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/get`);
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, change) => {
    
    setCartItems((prevItems) => 
      prevItems.map((item) => {
        console.log(item._id)
        if (item._id === id) {
          const newQuantity = item.quantity + change;
          return {
            ...item,
            quantity: Math.max(newQuantity, 1), // Ensure quantity doesn't go below 1
          };
        }
        return item; // Return the original item if it doesn't match the id
      })
    );
};

// const handleCheckoutClick = async () => {
//   const subtotal = calculateSubtotal();
//   const total = calculateTotal();
  
//   // Prepare cart summary object
//   const cartSummary = {
//       items: cartItems.map(item => item._id), // Assuming item._id is available
//       shippingMethod: shippingCost === 0 ? 'Free Shipping' : shippingCost === 15 ? 'Express Shipping' : 'Pick Up',
//       shippingCost,
//       subtotal
//   };

//   try {
//       // Send POST request to save cart summary
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/checkout`, cartSummary);
//       console.log('Cart summary saved:', response.data);
//       onCheckout(); // Call onCheckout to handle post-checkout actions
//       setActiveTab('Checkout details'); // Switch to the checkout details tab
//   } catch (error) {
//       console.error('Error saving cart summary:', error);
//   }
// };
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleShippingChange = (cost) => {
    setShippingCost(cost);
  };

  const calculateTotal = () => {
    return (parseFloat(calculateSubtotal()) + shippingCost).toFixed(2);
  };

  const handleCheckoutClick = () => {
    onCheckout();
    setActiveTab('Checkout details');
  };

  return (
    <div>
      <div className="flex gap-8 justify-between p-8 w-[1200px]">
        <div className="w-2/3">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-4">Product</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-4 flex space-x-4 items-center">
                    <img src={product.product.images} alt={product.product.name} className="w-[60px] h-[60px]" />
                    <div>
                      <h4 className="font-semibold">{product.product.name}</h4>
                      <p className="text-sm text-gray-500">Color: {product.product.color}</p>
                      <button className="text-sm text-gray-500 flex gap-2 items-center" onClick={() => handleRemove(product.id)}>
                        <IoCloseSharp style={{ fontSize: '25px' }} /> Remove
                      </button>
                    </div>
                  </td>
                  <td>
                    
                  
                    <div className='border-2 border-gray-500 w-20 py-1 flex justify-between items-center rounded-md'>
                      <button className="px-2" onClick={() => handleQuantityChange(product._id, -1)}>-</button>
                      <span>{product.quantity}</span>
                      <button className="px-2" onClick={() => handleQuantityChange(product._id, 1)}>+</button>
                    </div>
                  </td>
                  <td className="py-4 font-medium">${product.price.toFixed(2)}</td>
                  <td className="py-4 font-bold">${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/3 border-2 border-black p-4 rounded-lg ">
          <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between border rounded-lg p-2 cursor-pointer" onClick={() => handleShippingChange(0)}>
              <label>
                <input type="radio" name="shipping" className="mr-2" />
                Free Shipping
              </label>
              <span>$0.00</span>
            </div>
            <div className="flex items-center justify-between border rounded-lg p-2 cursor-pointer" onClick={() => handleShippingChange(15)}>
              <label>
                <input type="radio" name="shipping" className="mr-2" />
                Express Shipping
              </label>
              <span>+$15.00</span>
            </div>
            <div className="flex items-center justify-between border rounded-lg p-2 cursor-pointer" onClick={() => handleShippingChange(21)}>
              <label>
                <input type="radio" name="shipping" className="mr-2" />
                Pick Up
              </label>
              <span>+$21.00</span>
            </div>
          </div>

          <div className='mt-28'>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-2 rounded-lg" onClick={handleCheckoutClick}>
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-1 mb-8'>
        <div className='font-semibold'>Have a Coupon?</div>
        <div className='text-[12px]'>Add your Code for an instant cart discount</div>
        <div className='flex gap-3 mt-3 border-1 border-black px-1 w-[300px] py-2'>
          <CiDiscount1 style={{ fontSize: '24px' }} />
          <input type="text" className='border-none outline-none bg-transparent' placeholder='Coupon Code' />
          <div className='font-semibold'>Apply</div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
