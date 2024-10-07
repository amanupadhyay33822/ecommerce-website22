import React, { useState } from 'react';
import Logo from '../asserts/images/Logo.png';
import login_img from '../asserts/images/login_img.png';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [showPwd, setShowPwd] = useState(false);
    const [userData, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, userData);
            Cookies.set('token', response.data.token, { expires: 7 });
            if (response.status === 200) {
                toast.success('Login successful! Redirecting to home...',{
                   
                  });
                navigate('/home');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
            toast.error('Login failed. Please check your credentials and try again.'); 
        }
    };

    return (
        <div className="flex lg:flex-row flex-col">
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
            
            <div className="flex flex-col justify-center items-center relative">
                <div className="logo-container absolute ">
                    <img src={Logo} alt="Logo" className="z-10" />
                </div>
                <div className="">
                    <img src={login_img} alt="Login" className="chair-image w-full " />
                </div>
            </div>
            <div className="flex justify-center items-center  md:w-1/2 relative p-4 md:p-10">
                <div className='w-full max-w-sm'>
                    <div className="font-semibold text-3xl mb-4">Sign In</div>
                    <div className="text-[12px]">
                        Don't have an account yet? <a href='/register' className="text-green-500 font-semibold text-sm no-underline">Sign up </a>
                    </div>
                    <div className='mt-2 mb-2 flex flex-col w-full'>
                        <input 
                            type="text" 
                            className='outline-none border-b-2 border-gray-300 w-full placeholder:text-md p-3' 
                            placeholder='Your email address'
                            value={userData.email}
                            onChange={(e) => setData({ ...userData, email: e.target.value })}
                        />
                    </div>
                    <div className='mt-2 mb-5 flex flex-col relative'>
                        <input
                            id="password"
                            name="password"
                            type={showPwd ? "text" : "password"}
                            required
                            value={userData.password}
                            onChange={(e) => setData({ ...userData, password: e.target.value })}
                            className='outline-none border-b-2 border-gray-300 w-full placeholder:text-md p-3 pr-10'
                            placeholder="Password"
                        />
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 flex items-center cursor-pointer">
                            {showPwd ? (
                                <MdOutlineRemoveRedEye
                                    className="text-gray-500" style={{ fontSize: '20px' }}
                                    onClick={() => setShowPwd(false)}
                                />
                            ) : (
                                <FaRegEyeSlash
                                    className="text-gray-500" style={{ fontSize: '20px' }}
                                    onClick={() => setShowPwd(true)}
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-5 mb-3'>
                        <div className='flex justify-center items-center gap-2 text-md'>
                            <input type="checkbox" className="w-4 h-4 text-green-500 accent-blue-500" />
                            <div>Remember me</div>
                        </div>
                        <div className='text-md font-bold'>
                            Forget Password?
                        </div>
                    </div>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                    <div 
                        className='text-white bg-black rounded-md text-center py-3 mt-6 cursor-pointer'
                        onClick={handleLogin}
                    >
                        Sign In
                    </div>
                </div>
            </div>

            
           
        </div>
    );
};

export default Login;
