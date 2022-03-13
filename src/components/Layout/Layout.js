import React from "react";

import AppHeader from "../AppHeader";
import Main from "../Main";
import Footer from "../Footer";
import Pagination from "../Pagination/Pagination";

function Layout({ children }) {
  return (
    <>
      <AppHeader />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
