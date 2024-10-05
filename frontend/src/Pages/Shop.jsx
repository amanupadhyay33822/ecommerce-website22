import React,{useState} from 'react';
import home_shop from '../asserts/images/home_Shop.png';
import { IoIosArrowForward } from "react-icons/io";
import product1 from "../asserts/images/Product Card1.png";
import product2 from "../asserts/images/Product Card2.png";
import product3 from "../asserts/images/Product Card3.png";
import product4 from "../asserts/images/Product Card4.png";
import product5 from "../asserts/images/Product Card5.png";
import product6 from "../asserts/images/Product Card (6).png";
import product7 from "../asserts/images/Product Card (7).png";
import product8 from "../asserts/images/Product Card (8).png";
import product9 from "../asserts/images/Product Card (9).png";
import product10 from "../asserts/images/Product Card (10).png";
import product11 from "../asserts/images/Product Card (11).png";
import product12 from "../asserts/images/Product Card (12).png";
import Footer_top from '../Components/Footer_top';
import Footer from '../Components/Footer';
import Products from './Products';
import { FiGrid, FiList, FiAlignJustify } from 'react-icons/fi';
import { CiGrid2H } from "react-icons/ci";
import { CiGrid2V } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import { BsGrid3X3GapFill } from "react-icons/bs";
import Navbar from '../Components/Navbar';
import Cart from '../Components/Cart';

const Shop = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showmore,setShowMore]=useState(false)
  const [category, setCategory] = useState('Living Room');
  const [price, setPrice] = useState('All Price');
  const [viewType, setViewType] = useState('grid');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const toggleCart = () => {
    
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      {/* <Navbar onCartClick={toggleCart} />
      <Cart isOpen={isCartOpen} onClose={toggleCart} /> */}
      {!showmore ? (
      <>
      <div className="relative">
        <div className='mx-48 w-[1120px]'>
          <img src={home_shop} alt='' className='w-full h-auto' />
        </div>
        <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center text-center">
          <div className='text-[10px] flex items-center justify-center gap-2'>
            Home <IoIosArrowForward /> <b>Shop</b>
          </div>
          <div className="font-semibold text-4xl">Shop Page</div>
          <div>Let's design the place you always imagined</div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 ml-44 mr-44">
      
      <div className="flex gap-4">
        <div className='flex flex-col gap-2'>
          <div className='font-semibold'>Category</div>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="px-12 py-2 border border-gray-300 rounded-md text-md font-semibold focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Office">Office</option>
          </select>
        </div>
        

        <div className='flex flex-col gap-2'>
          <div className='font-semibold'>Price</div>
        <select
          value={price}
          onChange={handlePriceChange}
          className="px-12 py-2 border border-gray-300 rounded-md text-md font-semibold focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="All Price">All Price</option>
          <option value="Under $100">$100 and below</option>
          <option value="$100-$500">$100 - $500</option>
          <option value="Above $500">$500 and above</option>
        </select>
        </div>
        
      </div>

      
      <div className="flex items-center gap-3">
        <span className="font-semibold">Sort</span>

        
        <div className="flex flex-row-reverse gap-2">
          <CiGrid2H
            onClick={() => setViewType('grid')}
            size={24}
            className={`cursor-pointer ${viewType === 'grid' ? 'text-black font-bold' : 'text-gray-500'}`}
          />
          <CiGrid2V
            onClick={() => setViewType('list')}
            size={24}
            className={`cursor-pointer ${viewType === 'list' ? 'text-black font-bold' : 'text-gray-500'}`}
          />
          <IoGrid
            onClick={() => setViewType('justified')}
            size={24}
            className={`cursor-pointer ${viewType === 'justified' ? 'text-black font-bold' : 'text-gray-500'}`}
          />
          <BsGrid3X3GapFill
            onClick={() => setViewType('justified')}
            size={24}
            className={`cursor-pointer ${viewType === 'justified' ? 'text-black font-bold' : 'text-gray-500'}`}
          />
        </div>
      </div>
    </div>
      <div className='grid grid-cols-4 gap-4 mx-48 mt-4'>
        <img src={product1} className='mb-4' alt='' />
        <img src={product2} alt='' />
        <img src={product3} alt='' />
        <img src={product4} alt='' />
        <img src={product5} alt='' />
        <img src={product6} alt='' />
        <img src={product7} alt='' />
        <img src={product8} alt='' />
        <img src={product9} alt='' />
        <img src={product10} alt='' />
        <img src={product11} alt='' />
        <img src={product12} alt='' />
      </div>

      
      <div className='flex justify-center mt-4 mb-8 cursor-pointer' onClick={()=>{setShowMore(true)}}>
        <button className='border-2 border-black rounded-full py-2 px-8 text-black'>Show More</button>
      </div>
      </>):(
        <Products/>
      )}
      <Footer_top/>
      <Footer/>
    </div>
  );
}

export default Shop;
