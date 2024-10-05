import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/get`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`, // Include the token in the request header
          },
        });
        // Assuming the API returns an array and you want to display the latest order
        if (response.data.length > 0) {
          setOrderData(response.data[response.data.length - 1]); // Get the latest order
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, []);

  if (!orderData) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-2xl w-[600px] mt-4 mb-6">
      <h2 className="text-2xl font-bold text-center mb-4">Thank you! 🎉</h2>
      <p className="text-center font-semibold text-3xl mb-4 w-72">Your order has been received.</p>

      <div className="flex justify-center gap-4">
        {orderData.products.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <img
              src={item.product.images[0]} // Assuming the first image is to be displayed
              alt={item.product.name}
              className="w-24 h-24 object-cover"
            />
            <p className="absolute top-[-10px] right-[-6px] bg-black text-white h-7 w-7 flex justify-center items-center rounded-full p-1 text-sm">
              {item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex">
          <span className="text-gray-500 w-40">Order ID:</span>
          <span className="font-bold">{orderData._id}</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 w-40">Date:</span>
          <span>{new Date(orderData.orderedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 w-40">Total:</span>
          <span className="font-bold">${orderData.total.toFixed(2)}</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 w-40">Payment Method:</span>
          <span className="font-bold">{orderData.paymentMethod}</span>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="bg-black text-white px-6 py-3 rounded-full">
          Purchase history
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
