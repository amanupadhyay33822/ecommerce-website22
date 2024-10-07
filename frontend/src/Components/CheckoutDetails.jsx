import React, { useState, useEffect } from "react";
import { RiCoupon3Line } from "react-icons/ri";
import cart1 from "../asserts/images/cart1.png";
import cart2 from "../asserts/images/cart2.png";
import cart3 from "../asserts/images/cart3.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
const CheckoutDetails = ({ onPlace, setActiveTab }) => {
  const initialCartItems = [
    {
      id: 1,
      image: cart1,
      name: "Tray Table",
      color: "Black",
      quantity: 2,
      price: 19.19,
    },
    {
      id: 2,
      image: cart2,
      name: "Tray Table",
      color: "Red",
      quantity: 2,
      price: 19.19,
    },
    {
      id: 3,
      image: cart3,
      name: "Table lamp",
      color: "gold",
      quantity: 2,
      price: 39.0,
    },
  ];

  const [cartItems, setCartItems] = useState([]);

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/cart/get`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`, // Include the token in the request header
            },
          }
        ); // Replace with your API endpoint
        setCartItems(response.data.items);
        setSubtotal(response.data.subtotal);
        setTotal(response.data.total);
        // Assuming the response data is an array of cart items
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to load cart items. Please try again.");
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [townCity, setTownCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvvCode, setCvvCode] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, "");
    if (inputValue.length > 12) {
      inputValue = inputValue.slice(0, 12);
    }

    const formattedCardNumber = inputValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(formattedCardNumber);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
  };

  const handleZipCodeChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, "");

    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6);
    }

    if (inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3) + " " + inputValue.slice(3);
    }

    setZipCode(inputValue);
  };

  const handleExpirationDateChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, "");
    if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }

    if (inputValue.length >= 3) {
      inputValue = inputValue.slice(0, 2) + "/" + inputValue.slice(2);
    }

    setExpirationDate(inputValue);
  };

  const handleCvvCodeChange = (e) => {
    const cvv = e.target.value.replace(/\D/g, "");
    setCvvCode(cvv.slice(0, 3));
  };

  const handleSubmit = async (e) => {
    try {
    const response =   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order/create`, {
        firstName,
      lastName,
      phoneNumber,
      email,
      streetAddress,
      country,
      townCity,
      state,
      zipCode,
      cardNumber,
      expirationDate,
      cvvCode,
      cartItems,
      totalPrice:total,
      paymentMethod
      });
       console.log(response.data);
       
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handlePlaceClick = () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
      const phoneNumberRegex = /^\d{10}$/;
      return phoneNumberRegex.test(phoneNumber);
    };

    const isValidZipCode = (zipCode) => {
      const zipCodeRegex = /^\d{3} \d{3}$/;
      return zipCodeRegex.test(zipCode);
    };

    const isValidCardNumber = (cardNumber) => {
      const cardNumberRegex = /^\d{4} \d{4} \d{4}$/;
      return cardNumberRegex.test(cardNumber);
    };

    const isValidExpirationDate = (expirationDate) => {
      const expirationRegex = /^\d{2}\/\d{2}$/;
      return expirationRegex.test(expirationDate);
    };

    const isValidCvcCode = (cvcCode) => {
      const cvcCodeRegex = /^\d{3}$/;
      return cvcCodeRegex.test(cvcCode);
    };

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !streetAddress ||
      !country ||
      !townCity ||
      !state ||
      !zipCode ||
      !paymentMethod ||
      (paymentMethod === "Credit Card" && (!cardNumber || !expirationDate || !cvvCode))
    ) {

      toast.error("Please fill in all required fields.");
      return;
    } else if (!isValidEmail(email)) {
      toast.error("Invalid email address.");
    } else if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Invalid phone number.");
    } else if (!isValidZipCode(zipCode)) {
      toast.error("Invalid zip code.");
    } else if (!isValidCardNumber(cardNumber)) {
      toast.error("Invalid card number.");
    } else if (!isValidExpirationDate(expirationDate)) {
      toast.error("Invalid expiration date.");
    } else if (!isValidCvcCode(cvvCode)) {
      alert("Invalid CVC code.");
    } else {
      handleSubmit();
      onPlace();
      toast.success("Order placed successfully!");
      setActiveTab("Order complete");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex flex-col  gap-3">
        <div className="flex flex-col gap-4 mb-4  border p-3 rounded-md lg:w-[700px] sm:w-[400px]">
          <div className="text-[20px] font-medium flex justify-start mt-4 mb-4">
            Contact Information
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-500 font-bold mb-2"
              >
                First Name <b className="text-red-500">*</b>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First nam"
                className="lg:w-[300px] sm:w-full  
                            px-3 py-2 border rounded-md"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-500 font-bold mb-2"
              >
                Last Name <b className="text-red-500">*</b>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                className="lg:w-[300px] sm:w-full 
                            px-3 py-2 border rounded-md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-500 font-bold mb-2"
            >
              Phone Number <b className="text-red-500">*</b>
            </label>
            <input
              type="number"
              id="phone number"
              placeholder="Phone number"
              className="lg:w-[620px] sm:w-96
                            px-3 py-2 border rounded-md"
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-500 font-bold mb-2"
            >
              Email Address <b className="text-red-500">*</b>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="lg:w-[620px] sm:w-96
                            px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-4  border p-3 rounded-md w-auto">
          <div className="text-[20px] font-medium flex justify-start mt-4 mb-4">
            Shipping Address
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-500 font-bold mb-2"
            >
              STREET ADDRESS <b className="text-red-500">*</b>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Street Address"
              className="lg:w-[620px] sm:w-96
                            px-3 py-2 border rounded-md"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-500 font-bold mb-2"
            >
              COUNTRY <b className="text-red-500">*</b>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Country"
              className="lg:w-[620px] sm:w-96                            px-3 py-2 border rounded-md"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-500 font-bold mb-2"
            >
              TOWN / CITY <b className="text-red-500">*</b>
            </label>
            <input
              type="text"
              id="phone number"
              placeholder="Town / City"
              className="lg:w-[620px] sm:w-96
                            px-3 py-2 border rounded-md"
              value={townCity}
              onChange={(e) => setTownCity(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="">
              <label
                htmlFor="lastName"
                className="block text-gray-500 font-bold mb-2"
              >
                STATE <b className="text-red-500">*</b>
              </label>
              <input
                type="email"
                id="email"
                placeholder="State"
                className="lg:w-[300px] sm:w-full
                                px-3 py-2 border rounded-md"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-500 font-bold mb-2"
              >
                ZIP CODE <b className="text-red-500">*</b>
              </label>
              <input
                type="text"
                id="email"
                placeholder="Zip Code"
                className="lg:w-[300px] sm:w-full
                            px-3 py-2 border rounded-md"
                value={zipCode}
                onChange={(e) => handleZipCodeChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <div
            className={`flex gap-4 border-1 border-black rounded-md p-2 cursor pointer ${
              paymentMethod === "card" ? "bg-gray-300" : ""
            }`}
          >
            <input
              type="radio"
              id="card-payment"
              name="payment-method"
              value="card"
              className={`${paymentMethod === "card" ? "text-black" : ""}`}
              checked={paymentMethod === "card"}
              onChange={handlePaymentMethodChange}
              required
            />
            <div className="flex  items-center justify-between w-full">
              <label htmlFor="card-payment" className="ml-2">
                Pay by Card Credit
              </label>
              <RiCoupon3Line className="mr-8" style={{ fontSize: "20px" }} />
            </div>
          </div>
          <div
            className={`flex gap-4 border-1 border-black rounded-md p-2 cursor pointer ${
              paymentMethod === "paypal" ? "bg-gray-300" : ""
            }`}
          >
            <input
              type="radio"
              id="paypal-payment"
              name="payment-method"
              value="paypal"
              className={`${paymentMethod === "paypal" ? "text-black" : ""}`}
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="paypal-payment" className="ml-2">
              Paypal
            </label>
          </div>
          {paymentMethod === "card" && (
            <div className="mt-4">
              <label
                htmlFor="cardNumber"
                className="block text-gray-500 font-bold mb-2"
              >
                Card Number <b className="text-red-500">*</b>
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 1234 1234"
                className="lg:w-[620px] sm:w-96 px-3 py-2 border rounded-md"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength="14"
                required
              />
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div>
                  <label
                    htmlFor="expirationDate"
                    className="block text-gray-500 font-bold mb-2"
                  >
                    Expiration Date <b className="text-red-500">*</b>
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    placeholder="MM/YY"
                    className="lg:w-[300px] sm:w-full px-3 py-2 border rounded-md"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvcCode"
                    className="block text-gray-500 font-bold mb-2"
                  >
                    CVC <b className="text-red-500">*</b>
                  </label>
                  <input
                    type="text"
                    id="cvcCode"
                    className="lg:w-[300px] sm:w-fullpx-3 py-2 border rounded-md"
                    value={cvvCode}
                    onChange={handleCvvCodeChange}
                    required
                    placeholder="CVC code"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="w-full flex justify-center  text-center items-center cursor-pointer bg-black text-white rounded-md mt-3 mb-4 py-3 hidden lg:block"
          onClick={handlePlaceClick}
        >
          Place Order
        </div>
      </div>

      <div className="flex p-2 flex-col border-1 border-black rounded-md lg:w-[500px] sm:w-[400px] h-fit">
        <div className="text-[20px] font-medium flex justify-start mt-4 mb-4">
          Order summary
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex  justify-between items-center mb-8 border-b pb-2"
              >
                {/* Product Image */}
                <img
                  src={item.product.images}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />

                {/* Product Details */}
                <div className="flex flex-col flex-grow ml-4 mb-3">
                  <span className="font-semibold">{item.product.name}</span>
                  <span className="text-gray-500 text-sm">
                    Color: {item.product.color}
                  </span>

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
                    ${item.product.discountedPrice * item.quantity}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Your cart is empty.
            </p>
          )}
        </div>
        <div className="flex gap-4 mr-4">
          <input
            type="text"
            placeholder="Input"
            className="border-2 rounded-md w-full px-2 ml-8"
          />
          <div className="bg-black py-2 px-6 flex justify-center items-center rounded-md text-white">
            Apply
          </div>
        </div>
        <div className="flex justify-between ml-8 mr-4 mt-4 mb-4 border-b">
          <div className="flex gap-2 mb-3">
            <RiCoupon3Line style={{ fontSize: "20px" }} />
            <div className="text-[14px] font-medium ">JenkateMW</div>
          </div>
          <div className="text-[14px] text-green-500 font-semibold">
            -$25.00 [Remove]{" "}
          </div>
        </div>
        <div className="flex justify-between ml-8 mr-4 border-b pb-3">
          <div className="text-[15px] font-medium">Shipping</div>
          <div className="text-[15px] font-bold">Free</div>
        </div>
        <div className="flex justify-between ml-8 mr-4 border-b pb-3 mt-4">
          <div className="text-[15px] font-medium">Subtotal</div>
          <div className="text-[15px] font-bold">${subtotal}</div>
        </div>
        <div className="flex justify-between ml-8 mr-4 mt-4 ">
          <div className="text-[17px] font-bold">Total</div>
          <div className="text-[17px] font-bold">${total}</div>
        </div>
      </div>
      <div
          className="w-full flex justify-center items-center cursor-pointer bg-black text-white rounded-md mt-3 mb-4 py-3 sm:block lg:hidden"
          onClick={handlePlaceClick}
        >
          Place Order
        </div>
    </div>
  );
};

export default CheckoutDetails;
