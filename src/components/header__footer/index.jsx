import React from "react";
//import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function HeaderFooter() {
  return (
      <>
        {/* <Header history={this.props.history} /> */}
        <Outlet/>
        <Footer />
      </>
  )
}

export default HeaderFooter



