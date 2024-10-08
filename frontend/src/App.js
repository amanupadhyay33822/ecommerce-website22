import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Main_page from './Pages/Main_page';
import Booking from './Pages/Booking';
import Shop from './Pages/Shop';
import Products from './Pages/Products';
import OrderDetails from './Components/OrderDetails';
import ContactUs from './Components/ContactUs';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
 
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path='/home' element={<Main_page/>}/>
        <Route path ='/shop' element={<Shop/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/product' element={<Products/>}/>
        <Route path='/xyz' element={<OrderDetails/>}/>
        <Route path='/contactus'element={<ContactUs/>}/>
        
      </Routes>
    </Router>
  
  );
}

export default App;
