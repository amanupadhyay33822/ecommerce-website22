import React,{useState} from 'react';
import Navbar from '../Components/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import LivingCard from "../asserts/images/LivingCard.png"
import Card from "../asserts/images/Card.png"
import placeolder from "../asserts/images/Image Placeholder.png"
import card1 from "../asserts/images/card 01.png"
import card2 from "../asserts/images/card 2.png"
import card3 from "../asserts/images/card 3.png"
import card4 from "../asserts/images/card 4.png"
import productcard1 from "../asserts/images/productimg1.png"
import productcard2 from "../asserts/images/Product Card (2).png"
import productcard3 from "../asserts/images/Product Card (3).png"
import productcard4 from "../asserts/images/Product Card (4).png"
import productcard5 from  "../asserts/images/Product Card (5).png"
import productcard6 from "../asserts/images/Product Card (6).png"
import { useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import paste from "../asserts/images/Paste image (1).png"
import Group from "../asserts/images/Group 3.png"
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { FiFacebook } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { TbBrandYoutube } from "react-icons/tb";
import Cart from "../Components/Cart"
import Shop from './Shop';
import { CiDiscount1 } from "react-icons/ci";
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

const Main_page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
    const [noMore, setNoMore] = useState(false);
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
  const products = [
    {
      name: "Loveseat Sofa",
      id:"67016cf324b83875dd894d32",
      image_url: productcard6,
      price: {
        current: "$199.00",
        original: "$400.00",
        discount: "50%"
      },
      rating: 5,
      status: "New"
    },
    {
      name: "Table Lamp",
      id:"670030615952e849b4b4c663",
      image_url: productcard2,
      price: {
        current: "$24.99",
        original: null,
        discount: "50%"
      },
      rating: 5,
      status: "New"
    },
    {
      name: "Beige Table Lamp",
      id:"67016ea624b83875dd894d3b",
      image_url: productcard2,
      price: {
        current: "$24.99",
        original: null,
        discount: "50%"
      },
      rating: 5,
      status: "New"
    },
    {
      name: "Bamboo Basket",
      id:"67016fe924b83875dd894d46",
      image_url: productcard3,
      price: {
        current: "$24.99",
        original: null,
        discount: "50%"
      },
      rating: 5,
      status: "New"
    },
    {
      name: "Beige Table Lamp",
      id:"67016ea624b83875dd894d3b",
      image_url: productcard5,
      price: {
        current: "$24.99",
        original: null,
        discount: "50%"
      },
      rating: 5,
      status: "New"
    },
    {
      name: "Sofa",
      id:"67016e0b24b83875dd894d35",
      image_url: productcard6,
      price: {
        current: "$24.99",
        original: null,
        discount: "50%"
      },
      rating: 5,
      status: "New"
    }
  ];


  // const products = [
  //   {
  //     name: "Loveseat Sofa",
  //     image_url: productcard6,
  //     price: {
  //       current: "$199.00",
  //       original: "$400.00",
  //       discount: "50%"
  //     },
  //     rating: 5,
  //     status: "New"
  //   },
  //   {
  //     name: "Table Lamp",
  //     image_url: productcard2,
  //     price: {
  //       current: "$24.99",
  //       original: null,
  //       discount: "50%"
  //     },
  //     rating: 5,
  //     status: "New"
  //   },
  //   {
  //     name: "Beige Table Lamp",
  //     image_url: productcard2,
  //     price: {
  //       current: "$24.99",
  //       original: null,
  //       discount: "50%"
  //     },
  //     rating: 5,
  //     status: "New"
  //   },
  //   {
  //     name: "Bamboo Basket",
  //     image_url: productcard3,
  //     price: {
  //       current: "$24.99",
  //       original: null,
  //       discount: "50%"
  //     },
  //     rating: 5,
  //     status: "New"
  //   },
  //   {
  //     name: "Beige Table Lamp",
  //     image_url: productcard5,
  //     price: {
  //       current: "$24.99",
  //       original: null,
  //       discount: "50%"
  //     },
  //     rating: 5,
  //     status: "New"
  //   },
  //   {
  //     name: "Sofa",
  //     image_url: productcard6,
  //     price: {
  //       current: "$24.99",
  //       original: null,
  //       discount: "50%"
  //     },
  //     rating: 5,
  //     status: "New"
  //   }
  // ];

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showmore,setShoreMore] = useState(false)
  const [discount,setDiscount] = useState(true)
  const navigate=useNavigate();
  const toggleCart = () => {
    
    setIsCartOpen(!isCartOpen);
  };
  const showProducts = ()=>{
      setShoreMore(true)
  }
  const showDiscount = () =>{
    setDiscount(false)
  }
  return (
    <div className='flex flex-col overflow-x-hidden'>
      {discount ?(
      <div className='bg-gray-200 py-3 flex justify-center items-center'>
        <div className='flex gap-2 justify-center items-center'>
        <CiDiscount1 style={{ fontSize: '24px' }} />
        <div className='text-black font-bold'> 30% of storewide - Limited time!   </div>
        </div>
        
        <div className='ml-2 flex items-center gap-2 cursor-pointer border-b-2 border-blue-500'>
                  <div className=" font-semibold text-blue-500">Shop Now</div>
                  <FaArrowRightLong className='text-blue-500'/>
                  </div>
        <AiOutlineClose className='right-0 absolute text-gray-400 cursor-pointer' style={{ fontSize: '24px' }} onClick={showDiscount}/>
      </div>):(null)}
     
      {!showmore ? (
        <>
           <Navbar onCartClick={toggleCart} />
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
      <div className=' mx-48 w-[1120px]'>
        <Carousel data-bs-theme="light" className="custom-carousel" style={{ height: '500px' }}>
          <Carousel.Item style={{ height: '536px' }}>
            <img
              className="d-block w-100 h-100" 
              src="https://plus.unsplash.com/premium_photo-1682582243285-8478309a7cdb?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="First slide"
              style={{ objectFit: 'cover', height: '100%' }} 
            />
          </Carousel.Item>
          <Carousel.Item style={{ height: '536px' }}>
            <img
              className="d-block w-100 h-100"
              src="https://plus.unsplash.com/premium_photo-1683120975679-dbca0a428106?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Second slide"
              style={{ objectFit: 'cover', height: '100%' }} 
            />
          </Carousel.Item>
          <Carousel.Item style={{ height: '536px' }}>
            <img
              className="d-block w-100 h-100"
              src="https://images.unsplash.com/photo-1634547588713-edd93045b9f1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Third slide"
              style={{ objectFit: 'cover', height: '100%' }} 
            />
          </Carousel.Item>
        </Carousel>

        
        
      </div>
      
            <div className='mx-48 grid grid-cols-2 mt-12 items-center'>
                <div className='font-semibold text-6xl'>
                <div>Simple Unique<b className='text-gray-400'>/</b></div>
                <div>Simple Better<b className='text-gray-400'>.</b></div>
                </div>
                <div>
                <div className='text-gray-400 text-sm w-96'>
                    <b className='text-gray-600'>3legant</b> is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
                </div>
                </div>
            </div>
            <div className='flex gap-2 justify-center mt-4 mb-4'>
                <div >
                    <img src={LivingCard} alt='' className='w-[550px] h-[700px]'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <img src={Card} alt='' className='w-[550px] h-[350px]'/>
                    <div>
                    <img src={placeolder} alt='' className='relative w-[550px] h-[343px] -z-10'/>
                    <div className='mt-[-8rem] z-auto'>
                      <div className='font-semibold text-3xl ml-10 mb-3'>Kitchen</div>
                      <div className="relative ml-10">
                        <div className='flex items-center gap-2'>
                          
                        <div className="text-lg font-semibold">Shop Now</div>
                        <FaArrowRightLong />
                        </div>
                        
                        <div className="absolute bottom-0 left-0 w-24  h-[2px] bg-black"></div>
                      </div>

                    </div>
                    </div>
                    
                    
                </div>
            </div>
            <div className=' flex flex-col mx-52 w-[1300px]'>
              <div className='flex mt-4 mb-4 items-center justify-between w-[1050px]'>
                <div className='font-semibold w-24 text-4xl'>New Arrivals</div>
                <div className="relative" onClick={()=>{
                  setShoreMore(true)
                }}>
                  <div className='flex items-center gap-2 cursor-pointer'>
                  <div className="text-lg font-semibold">More Products</div>
                  <FaArrowRightLong />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></div>
                </div>
              </div>
              
              {/* <div className='flex gap-4 mt-4 mb-5 overflow-x-auto w-full image-gallery'>
                <img src={productcard1} alt=''/>
                <img src={productcard2} alt=''/>
                <img src={productcard3} alt=''/>
                <img src={productcard4} alt=''/>
                <img src={productcard3} alt=''/>
                <img src={productcard4} alt=''/>
                <img src={productcard5} alt=''/>
              </div> */}
             <div className="flex space-x-6 overflow-x-auto p-6  image-gallery mb-4 w-[1050px]">
                {products.map((product, index) => (
                  <div key={index} className="min-w-[250px] bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="relative cursor-pointer" onClick={()=>{navigate('/product')}}>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-48 w-full object-cover"
                      />
                      
                    </div>

                    {/* Product Info */}
                    <div className="p-4 text-center">
                      <h3 className="text-gray-700 font-bold text-lg">{product.name}</h3>
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        {/* {product.price.original && (
                          <span className="text-gray-400 line-through">{product.price.original}</span>
                        )} */}
                        <span className="text-black font-bold">{product.price.current}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center items-center mt-2">
                        {Array(product.rating)
                          .fill()
                          .map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-black-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              stroke="none"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                      </div>

                      {/* Add to Cart Button */}

                      <button className="bg-black text-white px-4 py-2 rounded-lg mt-4" onClick={() => addToCart(product.id, 1)}>

                     

                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex gap-4 mb-4'>
                <img src={card1} alt=''/>
                <img src={card2} alt=''/>
                <img src={card3} alt=''/>
                <img src={card4} alt=''/>
              </div>
            </div>
            <div >
              <img src={Group} alt=' ' className='w-full'/>
            </div>
            <div className="relative">
              <img src={paste} alt=" " className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <div className="text-4xl text-black font-bold mb-4">Join Our Newsletter</div>
                <div className="text-md text-black mb-4">Sign up for deals, new products, and promotions</div>
                <div className="flex justify-between text-black items-center space-x-2">
                  <AiOutlineMail className="text-2xl" />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="px-4 py-2   text-black bg-transparent rounded-md outline-none"
                  />
                  <button className="text-gray-400 font-semibold">Signup</button>
                  
                </div>
                <div className="bottom-0 left-0 w-80  h-[2px] bg-gray-400"></div>
              </div>
            </div>
            <div className='bg-black text-white h-[300px]'>
              <div className='mt-4'>
              <div className='flex justify-around py-5 '>
                <div className='flex gap-8 items-center'>
                  <div className='text-xl font-bold'>3legant<b className='text-gray-400'>.</b></div>
                  <div className="h-6 border-1 border-gray-400"></div>
                  <div className='text-md'>Git & Decoration Store</div>
                </div>
                < div className='flex gap-5' >
                  <Link className='text-white no-underline'>Home</Link>
                  <Link className='text-white no-underline'>Shop</Link>
                  <Link className='text-white no-underline'>Product</Link>
                  <Link className='text-white no-underline'>Blog</Link>
                  <Link className='text-white no-underline'>Contact Us</Link>
                </div>
              </div>
              <div className="bottom-0 left-0 w-[1150px] ml-48  h-[0.9px] bg-gray-400"></div>
              <div className='flex justify-around items-center pt-5'>
                <div className='flex gap-16 text-white items-center '>
                  <div className='text-sm '>Copyright © 2023 3legant. All rights reserved</div>
                  <div  className='text-sm font-bold '>Privacy Plolicy</div>
                  <div className='text-sm font-bold '>Terms of Use</div>
                </div>
                <div className='flex gap-10 items-center'>
                <IoLogoInstagram style={{'fontSize':'30px'}}/>
                <FiFacebook style={{'fontSize':'30px'}}/>
                <TbBrandYoutube style={{'fontSize':'30px'}} />
                </div>
              </div>
              </div>
              
            </div></>):(
              <Shop/>
            )}
        </div>
    
  );
}

export default Main_page;
