import React from 'react'
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer.js"
import { Outlet } from 'react-router-dom';
import { DataProvider } from './context/DataContext.js';

const Layout = () => {

  return (
    <div className="App">
          <Header
            title='React JS Blog'    
          />
          <DataProvider>
            <Nav />
            <Outlet />  
            <Footer />  
          </DataProvider>  
    </div>
  )
}

export default Layout
