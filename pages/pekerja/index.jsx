import Head from "next/head";
import React, { useEffect, Fragment } from "react";
import Navbar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import SearchPekerja from "../../components/searchPekerja";
//import { SwiperSlide } from "swiper";

const Pekerja = () => {
  return (
    <div>
      <style global jsx>{``}</style>
      <Head>
        <title>Pekerja</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Fragment>
        <Navbar />
        <div className="container ">
          <SearchPekerja />
        </div>
        <Footer />
      </Fragment>
    </div>
  );
};

export default Pekerja;
