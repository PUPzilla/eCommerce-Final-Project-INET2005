import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/Nav.jsx';

const App = () => {

  return (
    <>
      <div>
        <NavBar />
        <main>
        <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
