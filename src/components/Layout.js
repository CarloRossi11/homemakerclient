import React from "react";
// import Header from "./header";
import Footer from "./Footer";

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      {/* <Header /> */}
      <main className="layout">{children}</main>
      <Footer />
    </>
  );
}
