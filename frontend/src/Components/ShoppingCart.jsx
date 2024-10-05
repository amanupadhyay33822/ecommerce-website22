import React, { useState } from 'react';
import cart1 from "../asserts/images/cart1.png"
import cart2 from "../asserts/images/cart2.png"
import cart3 from "../asserts/images/cart3.png"
import { IoCloseSharp } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
const ShoppingCart = ({ onCheckout, setActiveTab }) => {
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: cart1,
      name: 'Tray Table',
      color: 'Black',
      quantity: 2,
      price: 19.0,
      subtotal: 38.0,
    },
    {
      id: 2,
      image: cart2,
      name: 'Tray Table',
      color: 'Red',
      quantity: 2,
      price: 19.0,
      subtotal: 38.0,
    },
    {
      id: 3,
      image: cart3,
      name: 'Table Lamp',
      color: 'Gold',
      quantity: 1,
      price: 39.0,
      subtotal: 39.0,
    },
  ]);

  
  const handleQuantityChange = (id, change) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1, // Ensure quantity doesn't go below 1
          subtotal: item.price * (newQuantity > 0 ? newQuantity : 1),
        };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  
  const handleRemove = (id) => {
    const filteredItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredItems);
  };

  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0).toFixed(2);
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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[60px] h-[60px]"
                  />
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-500">Color: {product.color}</p>
                    <button
                      className="text-sm text-gray-500 flex gap-2 items-center"
                      onClick={() => handleRemove(product.id)}
                    >
                      <IoCloseSharp style={{fontSize:'25px'}}/>Remove
                    </button>
                  </div>
                </td>

                
                <td className="">
                    <div className='border-2 border-gray-500 w-20 py-1 flex justify-between items-center rounded-md'>
                            <button
                            className="px-2"
                            onClick={() => handleQuantityChange(product.id, -1)}
                        >
                            -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                            className=" px-2"
                            onClick={() => handleQuantityChange(product.id, 1)}
                        >
                            +
                        </button>
                    </div>
                  
                </td>
                <td className="py-4 font-medium">${product.price.toFixed(2)}</td>
                <td className="py-4 font-bold">${product.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="w-1/3 border-2 border-black p-4 rounded-lg ">
        <h3 className="text-xl font-semibold mb-4">Cart summary</h3>

       
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between border rounded-lg p-2 cursor-pointer ">
            <label>
              <input type="radio" name="shipping" className="mr-2" />
              Free shipping
            </label>
            <span>$0.00</span>
          </div>
          <div className="flex items-center justify-between border rounded-lg p-2 cursor-pointer">
            <label>
              <input type="radio" name="shipping" className="mr-2" />
              Express shipping
            </label>
            <span>+$15.00</span>
          </div>
          <div className="flex items-center justify-between border rounded-lg p-2 cursor-pointer">
            <label>
              <input type="radio" name="shipping" className="mr-2" />
              Pick Up
            </label>
            <span>%21.00</span>
          </div>
        </div>

        
        <div className=' mt-28'>
            <div className="space-y-2 mb-4">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${(parseFloat(calculateTotal()) + 15).toFixed(2)}</span>
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
        <div className='text-[12px]'>Add you Code for an instant cart discount</div>
        <div className='flex gap-3 mt-3 border-1 border-black px-1 w-[300px] py-2'>
          <CiDiscount1 style={{ fontSize: '24px' }} />
          <input type="text" className='border-none outline-none bg-transparent' placeholder='Coupon Code'/>
          <div className='font-semibold '>Apply</div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
