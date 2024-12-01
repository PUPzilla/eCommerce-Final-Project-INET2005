import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/details'>Details</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/logout'>Logout</Link></li>
            <li><Link to='/cart'>Cart</Link></li>
            <li><Link to='/checkout'>Checkout</Link></li>
            <li><Link to='confirmation'>Confirmation</Link></li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
};
