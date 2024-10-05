import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { GoStarFill, GoHeart ,GoHeartFill} from "react-icons/go";
import { TECollapse } from "tw-elements-react";
import { Link } from "react-router-dom";
import cart1 from "../asserts/images/cart1.png";
import cart2 from "../asserts/images/cart2.png";
import cart3 from "../asserts/images/cart_color3.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeElement, setActiveElement] = useState("");
  const [selectedColor, setSelectedColor] = useState("Black"); // Default selected color
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [cart, setCart] = useState([]); 
  const [isWishlisted, setIsWishlisted] = useState(false);// Cart state
  const navigate = useNavigate();
  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/product/get/670002caee5da4e11787fe9a`
        );
        if (response.data.success) {
          setProduct(response.data.product);
          setIsWishlisted(response.data.product.isWishlisted);
        } else {
          setError("Failed to fetch product.");
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleImageClick = (color) => {
    setSelectedColor(color);
  };
  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/product/addToWishlist`, // Update with your actual API endpoint
        { productId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`, // Include the token in the request header
          },
        }
      );
      console.log('Item added to wishlist:', response.data);
      setIsWishlisted(true); 
      alert('Item added to wishlist!'); // You can replace this with your preferred notification method
    } catch (error) {
      console.error('Error adding item to wishlist:', error.response.data.message);
      alert(error.response.data.message); // Handle error appropriately
    }
  };
  const handleClick = (value) => {
    setActiveElement(value === activeElement ? "" : value);
  };

  // Function to handle quantity change
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const cookie = Cookies.get("token");
  // Function to add product to cart
  const addToCart = async () => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      color: selectedColor,
      quantity,
      price: product.discountedPrice,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/cart/add`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${cookie}`, // Include the token in the request header
          },
        }
      );
      if (response.data.success) {
        setCart((prev) => [...prev, cartItem]); // Update cart state
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart.");
      }
      navigate("/booking");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response.data.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching product: {error.message}</div>;
  if (!product) return null; // Prevents rendering if product is null

  return (
    <div>
      <div className="text-[12px] flex items-center justify-start ml-48 gap-2 mt-3 mb-3">
        Home <IoIosArrowForward /> Shop <IoIosArrowForward /> Living Room{" "}
        <IoIosArrowForward /> <b>Product</b>
      </div>
      <div className="ml-48 grid grid-cols-2">
        <div className="grid grid-cols-2 gap-2">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.name}
              className="mb-2 w-[300px] h-[350px]"
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 ml-4 w-[500px]">
          <div className="flex flex-col gap-4 border-b">
            <div className="flex">
              <div className="flex gap-1">
                <GoStarFill />
                <GoStarFill />
                <GoStarFill />
                <GoStarFill />
                <GoStarFill />
              </div>
              <div className="ml-2 mt-[-5px]">
                {product.reviews.length} Reviews
              </div>
            </div>
            <div className="font-semibold text-2xl">{product.name}</div>
            <div className="text-gray-400">{product.description}</div>
            <div className="flex gap-4 mb-3 items-center">
              <div className="font-bold text-2xl">
                ${product.discountedPrice}
              </div>
              <div className="text-gray-400 text-lg font-semibold">
                <del>${product.originalPrice}</del>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-semibold text-gray-500 text-md">
              Choose Color
            </div>
            <div>{selectedColor}</div>
            <div className="flex gap-2 cursor-pointer">
              <img
                src={cart1}
                alt="Black"
                onClick={() => handleImageClick("Black")}
                className={
                  selectedColor === "Black" ? "border-2 border-black" : ""
                }
              />
              <img
                src={cart2}
                alt="Red"
                onClick={() => handleImageClick("Red")}
                className={
                  selectedColor === "Red" ? "border-2 border-black" : ""
                }
              />
              <img
                src={cart3}
                alt="Gold"
                onClick={() => handleImageClick("Gold")}
                className={
                  selectedColor === "Gold" ? "border-2 border-black" : ""
                }
              />
            </div>
            <div className="flex gap-3 mt-4 mb-4">
              <div className="flex py-2 items-center justify-center bg-gray-200 rounded-sm w-[130px] gap-4">
                <button onClick={decrementQuantity}>-</button>
                <span className="px-2">{quantity}</span>
                <button onClick={incrementQuantity}>+</button>
              </div>
              <div className="flex items-center py-1 w-[250px] gap-2 justify-center border-2 border-black rounded-md">
              {isWishlisted ? <GoHeartFill /> : <GoHeart />}  <div  onClick={() => addToWishlist(product._id)} className="cursor-pointer">Wishlist</div>
              </div>
            </div>
            <button
              onClick={addToCart}
              className="py-3 bg-black no-underline text-white flex justify-center items-center w-full rounded-md font-semibold"
            >
              Add to Cart
            </button>
            <div className="flex gap-10 items-center text-[12px] mt-2">
              <div className="text-gray-400 text-[12px] font-semibold">SKU</div>
              <div className="text-[12px] font-medium">{product.stock}</div>
            </div>
            <div className="flex gap-10 items-center text-[12px] mt-2 mb-0">
              <div className="text-gray-400 text-[12px] font-semibold">
                CATEGORY
              </div>
              <div className="text-[12px] font-medium">{product.category}</div>
            </div>
          </div>
          <div>
            <div id="accordionExample">
              <div className="border-b-2 border-black">
                <h2 className="mb-0" id="headingOne">
                  <button
                    className={`${
                      activeElement === "element1" &&
                      `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                    } group relative flex text-[17px] w-full items-center rounded-t-[15px] border-0 bg-white text-black px-5 py-4 text-left   transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                    type="button"
                    onClick={() => handleClick("element1")}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Additional Info
                    <span
                      className={`${
                        activeElement === "element1"
                          ? `rotate-[-180deg] -mr-1`
                          : `rotate-0 fill-[#212529]  dark:fill-white`
                      } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </h2>
                <TECollapse
                  show={activeElement === "element1"}
                  className="!mt-0 !rounded-b-none !shadow-none"
                >
                  <div className=" px-5 py-4 flex flex-col gap-2 w-[550px]">
                    <div className="text-[15px] text-gray-400  font-semibold mt-[-10px]">
                      Details
                    </div>
                    <div className="text-sm">
                      You can use the removable tray for serving. The design
                      makes it easy to put the tray black after use since you
                      place it directly on the table frame without having to fit
                      it into any boles.
                    </div>
                    <div className="mt-2 mb-2 text-[15px] text-gray-400 font-semibold">
                      Packaging
                    </div>
                    <div className="text-sm">
                      Width : 20 "Height: 1<super>1/2</super>" Length: 21
                      <super>1/2</super>"
                    </div>
                    <div className="text-sm">Weight: 7lb 8 oz</div>
                    <div className="text-sm">Package(s): 1</div>
                  </div>
                </TECollapse>
              </div>
            </div>
            <div className=" border-b-2 border-black">
              <h2 className="mb-0" id="headingTwo">
                <button
                  className={`${
                    activeElement === "element2"
                      ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                      : `transition-none rounded-b-[15px]`
                  } group relative flex  text-[17px] w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left  text-black transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                  type="button"
                  onClick={() => handleClick("element2")}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Questions
                  <span
                    className={`${
                      activeElement === "element2"
                        ? `rotate-[-180deg] -mr-1`
                        : `rotate-0 fill-[#212529] dark:fill-white`
                    } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <TECollapse
                show={activeElement === "element2"}
                className="!mt-0 !rounded-b-none !shadow-none"
              >
                <div className="px-5 py-4">
                  <strong>List of Questions</strong> Lorem
                </div>
              </TECollapse>
            </div>
            <div className=" border-b-2 border-black ">
              <h2 className="accordion-header mb-0" id="headingThree">
                <button
                  className={`${
                    activeElement === "element3"
                      ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                      : `transition-none rounded-b-[15px]`
                  } group relative flex w-full text-[17px] items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-black transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                  type="button"
                  onClick={() => handleClick("element3")}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Reviews(11)
                  <span
                    className={`${
                      activeElement === "element3"
                        ? `rotate-[-180deg] -mr-1`
                        : `rotate-0 fill-[#212529] dark:fill-white`
                    } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <TECollapse
                show={activeElement === "element3"}
                className="!mt-0 !shadow-none"
              >
                <div className="px-5 py-4">
                  <strong>Reviews</strong>
                </div>
              </TECollapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;