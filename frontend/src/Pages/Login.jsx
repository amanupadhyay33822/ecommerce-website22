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
                   position: 'top-center',  // Use string for position
                    autoClose: 3000,
                  });
                navigate('/home');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
            toast.error('Login failed. Please check your credentials and try again.'); 
        }
    };

    return (
        <div className="grid grid-cols-2 ">
            <div className="flex flex-col justify-center items-center relative">
                <div className="logo-container absolute ">
                    <img src={Logo} alt="Logo" className="z-10" />
                </div>
                <div className="">
                    <img src={login_img} alt="Login" className="chair-image w-full " />
                </div>
            </div>

            <div className="flex w-64">
                <div className='flex-row top-[10rem] px-10 absolute'>
                    <div className="font-semibold text-3xl mb-4">Sign In</div>
                    <div className="text-[12px]">
                        Don't have an account yet? <a href='/register' className="text-green-500 font-semibold text-sm no-underline">Sign up </a>
                    </div>
                    <div className='mt-2 mb-2 flex flex-col w-full'>
                        <input 
                            type="text" 
                            className='outline-none border-collapse bottom-1 border-b-2 w-96 placeholder:text-md p-3' 
                            placeholder='Your email address'
                            value={userData.email}
                            onChange={(e) => setData({ ...userData, email: e.target.value })}
                        />
                    </div>
                    <div className='mt-2 mb-5 flex flex-col'>
                        <input
                            id="password"
                            name="password"
                            type={showPwd ? "text" : "password"}
                            required
                            value={userData.password}
                            onChange={(e) => setData({ ...userData, password: e.target.value })}
                            className='outline-none border-collapse bottom-1 border-b-2 w-96 placeholder:text-md p-3'
                            placeholder="Password"
                        />
                        <div className="absolute pt-[20px] right-0 pr-[50px] flex items-center cursor-pointer">
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
                        <div className='flex justify-center items-center gap-4 text-md'>
                            <input type="checkbox" className="w-3 h-3 text-green-500 accent-blue-500 scale-150" />
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
            <ToastContainer /> 
        </div>
    );
};

export default Login;
