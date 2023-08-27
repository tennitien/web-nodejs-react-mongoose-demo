import React from 'react';
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';

export default function Root() {
  return (
    <>
      <Navbar />
      <Header />
      <div className='container'>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
