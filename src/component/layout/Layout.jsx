import React from "react";
import { Fragment } from 'react';
import "./Layout.css";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import LiveChat from "../componentB/LiveChat";

const Layout = ({ children}) => {
   return (
      <Fragment>
         <Navbar />
         <main>{children}</main>
         <LiveChat  />
         <Footer />
      </Fragment>

   )
}

export default React.memo(Layout);