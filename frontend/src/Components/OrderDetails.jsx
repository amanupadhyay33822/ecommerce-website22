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
              Authorization: `Bearer ${Cookies.get('token')}`, // Include the token in the request header
            },
          }
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          setOrderData(response.data);
          const cartItemsArray = response.data.flatMap(order => order.cartItems);
          setProductData(cartItemsArray); // Combine all cartItems into one array
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
    <div className="bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-2xl w-[600px] mt-4 mb-6">
      <h2 className="text-2xl font-bold text-center mb-4">Thank you! 🎉</h2>
      <p className="text-center font-semibold text-3xl mb-4 w-72">
        Your order has been received.
      </p>

      {/* Display the products for the latest order */}
      {productData.length > 0 ? (
        <div className="flex justify-center gap-4">
          {productData.map((item, index) => {
            // Find the matching order for this product and extract the quantity
            const order = orderData.find(order =>
              
              order.cartItems.some(cartItem => cartItem._id === item._id)
            );
            const quantity = order
              ? order.cartItems.find(cartItem => cartItem._id === item._id).quantity
              : 0;

            return (
              <div key={index} className="relative flex flex-col items-center">
                <img
                  src={item.images} // Assuming the image field is in item
                  alt={item.name}
                  className="w-24 h-24 object-cover"
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
