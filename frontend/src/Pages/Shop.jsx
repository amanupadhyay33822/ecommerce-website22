import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import home_shop from "../asserts/images/home_Shop.png";
import { IoIosArrowForward } from "react-icons/io";
import Footer_top from "../Components/Footer_top";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Cart from "../Components/Cart";
import Products from "./Products";
import { CiGrid2H, CiGrid2V } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";

const Shop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showmore, setShowMore] = useState(false);
  const [category, setCategory] = useState("Living Room");
  const [price, setPrice] = useState("All Price");
  const [viewType, setViewType] = useState("grid4");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [noMore, setNoMore] = useState(false);
  const navigate = useNavigate();
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/product/get`
        );
        // Check if products exist in the response and exclude the first product
        const fetchedProducts = response.data.products;
        const productsToSet =
          fetchedProducts.length > 0 ? fetchedProducts.slice(1) : []; // Exclude the first product
        setProducts(productsToSet);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const handleShowMore = () => {
    if (visibleCount + 4 < sortedProducts.length) {
      setVisibleCount((prev) => prev + 4);
    } else if (visibleCount + 4 >= sortedProducts.length) {
      setVisibleCount(sortedProducts.length);
      setNoMore(true);
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const resetVisibility = () => {
    setVisibleCount(12);
    setNoMore(false);
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const viewTypeToGridCols = {
    grid4: "grid-cols-4",
    grid3: "grid-cols-3",
    grid2: "grid-cols-2",
    grid1: "grid-cols-1",
  };

  const addToCart = async (productId, quantity = 1) => {
    // Check if the product is already in the cart
    if (cartItems.includes(productId)) {
      alert("Item is already added to the cart!");
      return;
    }
    const resetVisibility = () => {
      setVisibleCount(12);
      setNoMore(false);
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/cart/add`,
        {
          productId,
          quantity,
        }
      );

      if (response.data.success) {
        console.log("Product added to cart:", response.data.cart);
        setCartItems((prev) => [...prev, productId]);
        alert("Item is added to the cart!");
        // return; // Update cart items state
      } else {
        console.error("Failed to add product to cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Split the product category string by commas, trim spaces, and check if the selected category exists
      const categoryMatch =
        category === "All" ||
        product.category
          .split(",")
          .map((c) => c.trim().toLowerCase())
          .includes(category.toLowerCase());

      // Handle price filtering
      let priceMatch = false;
      switch (price) {
        case "All Price":
          priceMatch = true;
          break;
        case "Under $100":
          priceMatch = product.discountedPrice <= 100;
          break;
        case "$100-$500":
          priceMatch =
            product.discountedPrice > 100 && product.discountedPrice <= 500;
          break;
        case "Above $500":
          priceMatch = product.discountedPrice > 500;
          break;
        default:
          priceMatch = true;
      }

      // Return true only if both category and price match
      return categoryMatch && priceMatch;
    });
  }, [products, category, price]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
    return sorted;
  }, [filteredProducts]);

  return (
    <div className="overflow-x-hidden">
      {!showmore ? (
        <>
          <Navbar onCartClick={toggleCart} />
          <Cart isOpen={isCartOpen} onClose={toggleCart} />
          <div className="relative">
  <div className="sm:mx-auto lg:mx-auto  lg:max-w-[1120px]]">
    <img src={home_shop} alt="Shop" className="w-full h-auto" />
  </div>
  <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center text-center">
    <div className="text-[10px] flex items-center justify-center gap-2">
      Home <IoIosArrowForward /> <b>Shop</b>
    </div>
    <div className="font-semibold text-4xl">Shop Page</div>
    <div>Let's design the place you always imagined</div>
  </div>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:mx-0 lg:mx-36 ">
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="flex flex-col gap-2">
      <div className="font-semibold">Category</div>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="px-4 py-2 border border-gray-300 rounded-md text-md font-semibold focus:outline-none focus:ring-1 focus:ring-gray-500"
      >
        <option value="All">All Categories</option>
        <option value="Living Room">Living Room</option>
        <option value="Bedroom">Bedroom</option>
        <option value="Office">Office</option>
      </select>
    </div>
    {/* Price filter */}
    <div className="flex flex-col gap-2">
      <div className="font-semibold">Price</div>
      <select
        value={price}
        onChange={handlePriceChange}
        className="px-4 py-2 border border-gray-300 rounded-md text-md font-semibold focus:outline-none focus:ring-1 focus:ring-gray-500"
      >
        <option value="All Price">All Price</option>
        <option value="Under $100">$100 and below</option>
        <option value="$100-$500">$100 - $500</option>
        <option value="Above $500">$500 and above</option>
      </select>
    </div>
  </div>

  <div className="flex items-center gap-3 mt-4 hidden lg:block sm:mt-0">
    <span className="font-semibold">Sort</span>

    <div className="flex flex-row-reverse gap-2">
      <button
        onClick={() => setViewType("grid4")}
        className={`cursor-pointer ${
          viewType === "grid4" ? "text-black font-bold" : "text-gray-500"
        }`}
        title="4 Columns"
        aria-label="4 Columns Grid View"
      >
        <CiGrid2H size={24} />
      </button>
      <button
        onClick={() => setViewType("grid3")}
        className={`cursor-pointer ${
          viewType === "grid3" ? "text-black font-bold" : "text-gray-500"
        }`}
        title="3 Columns"
        aria-label="3 Columns Grid View"
      >
        <IoGrid size={24} />
      </button>
      <button
        onClick={() => setViewType("grid2")}
        className={`cursor-pointer ${
          viewType === "grid2" ? "text-black font-bold" : "text-gray-500"
        }`}
        title="2 Columns"
        aria-label="2 Columns Grid View"
      >
        <CiGrid2V size={24} />
      </button>
      <button
        onClick={() => setViewType("grid1")}
        className={`cursor-pointer ${
          viewType === "grid1" ? "text-black font-bold" : "text-gray-500"
        }`}
        title="1 Column"
        aria-label="1 Column Grid View"
      >
        <BsGrid3X3GapFill size={24} />
      </button>
    </div>
  </div>
</div>


          {/* Product Grid */}
          <div
            className={`sm:flex sm:flex-col lg:grid gap-4 sm:mx-auto lg:mx-auto mt-4 w-full lg:w-[1050px] ${viewTypeToGridCols[viewType]}`}
          >
            {sortedProducts.slice(0, visibleCount).length > 0 ? (
              sortedProducts.slice(0, visibleCount).map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  {/* Image Section */}
                  <div
                    className="relative"
                    onClick={() => navigate(`/product`)}
                  >
                    <img
  src={product.images}
  alt={product.name}
  className="h-48 w-full sm:w-full lg:w-[500px] object-cover cursor-pointer"
/>

                    {/* {product.price.discount && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.price.discount}
                  </span>
                )} */}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-gray-700 font-bold text-lg">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      {product.originalPrice && (
                        <span className="text-black font-bold">
                          ${product.discountedPrice}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center items-center mt-2">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="none"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className="bg-black text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => addToCart(product._id, 1)} // Pass product._id and 1
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 mt-8">
                <p>
                  {category !== "All" && price !== "All Price" ? (
                    <>
                      No products found for <strong>{category}</strong> under{" "}
                      <strong>{price}</strong>.
                    </>
                  ) : category !== "All" ? (
                    <>
                      No products found for <strong>{category}</strong>.
                    </>
                  ) : price !== "All Price" ? (
                    <>
                      No products found under <strong>{price}</strong>.
                    </>
                  ) : (
                    <>No products available at the moment.</>
                  )}
                </p>
                <p>Please try adjusting your filters.</p>
              </div>
            )}
          </div>

          {/* Show More Button or No More Images Message */}
          <div className="flex justify-center mt-4 mb-8">
            {noMore ? (
              <p className="text-gray-500">No more images provided.</p>
            ) : (
              visibleCount < sortedProducts.length && (
                <button
                  className="border-2 border-black  rounded-full py-2 px-8 text-black "
                  onClick={handleShowMore}
                >
                  Show More
                </button>
              )
            )}
          </div>

          {/* Footer */}
          <Footer_top />
          <Footer />
        </>
      ) : (
        <Products />
      )}
    </div>
  );
};

export default Shop;
