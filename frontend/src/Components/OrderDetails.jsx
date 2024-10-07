import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const OrderDetails = () => {
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/order/get`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`, 
            },
          }
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          setOrderData(response.data);
          const cartItemsArray = response.data.flatMap(order => order.cartItems);
          setProductData(cartItemsArray); 
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, []);

  if (!orderData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center p-4 md:p-6 rounded-lg shadow-2xl w-full max-w-xl md:max-w-2xl mt-4 mb-6 mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Thank you! 🎉</h2>
      <p className="text-center font-semibold text-xl md:text-2xl mb-4 w-full max-w-xs md:max-w-sm">
        Your order has been received.
      </p>

      
      {productData.length > 0 ? (
        <div className="flex justify-center flex-wrap gap-4">
          {productData.map((item, index) => {
            
            const order = orderData.find(order =>
              
              order.cartItems.some(cartItem => cartItem._id === item._id)
            );
            const quantity = order
              ? order.cartItems.find(cartItem => cartItem._id === item._id).quantity
              : 0;

            return (
              <div key={index} className="relative flex flex-col items-center w-24 h-24 md:w-28 md:h-28">
                <img
                  src={item.images} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <p className="absolute top-[-10px] right-[-6px] bg-black text-white h-7 w-7 flex justify-center items-center rounded-full p-1 text-sm">
                  {quantity}2
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No products found in this order.</div>
      )}

      {/* Display the order details */}
      {orderData.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex">
            <span className="text-gray-500 w-40">Order ID:</span>
            <span className="font-bold">{orderData[0]._id}</span> {/* Assuming the first order */}
          </div>
          <div className="flex">
           
            <span className="text-gray-500 w-40">Date:</span>
            <span>{new Date(orderData[0].createdAt).toLocaleDateString()}</span> {/* Assuming the first order */}
          </div>
          <div className="flex">
            <span className="text-gray-500 w-40">Total:</span>
            <span className="font-bold">${orderData[0].totalPrice ? orderData[0].totalPrice.toFixed(2) : 'N/A'}</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-40">Payment Method:</span>
            <span className="font-bold">Credit Card</span>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button className="bg-black text-white px-6 py-3 rounded-full">
          Purchase history
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
