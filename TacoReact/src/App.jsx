import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/Nav';
import { useCookies } from 'react-cookie';

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['cartItems']);

  function addProduct(product_id) {
    if(cookies.product_id){
      setCookie('cartItems', cookies.cartItems + ',' + product_id, { maxAge: 3600 });
    } else {
      setCookie('cartItems', product_id, { maxAge: 3600 });
    }
  }

  function removeCookie(){
    removeCookie('cartItems');
  }

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
