import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/Nav';
import './index.css';

export default function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <div>
        <NavBar isLoggedIn={isLoggedIn} />
        <main>
        <Outlet context={setLoggedIn} />
        </main>
      </div>
    </>
  );
};
