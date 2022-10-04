// import Head from "next/head";
import { Fragment } from "react";
import Image from "next/image";
// import ImageFooter from "../../assets/images/home_1.png";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
const HomeSwiper = () => {
  return (
    <Fragment>
      <Swiper
        className="container mt-5 mb-5"
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        modules={[ Navigation]}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
          1400: {
            slidesPerView: 4,
          },
        }}
        // pagination={{ clickable: true }}
        navigation={true}
      >
        <SwiperSlide className="py-3 px-3">
          <div className="Card shadow">
            <div className="d-flex justify-content-center align-items-center my-3"> 
                <Image src={"/assets/images/home_1.png"} layout="fixed" height={180} width={180} alt="" className="rounded-circle" />
            </div>
            <div className="container">
              <div className="d-flex justify-content-center">
              <h3 className="mb-2">Biskop Endrew</h3>
              </div>
              <div className="d-flex justify-content-center">
              <h6 className="text-muted mb-3">Front End at. PT Muara Murni</h6>
              </div>
              <div className="d-flex justify-content-center text-center">
              <h6 className="">Thank you JobSeek. I can find a job according to my skills.</h6>
              </div>
            </div>
            
          </div>
        </SwiperSlide>
        <SwiperSlide className="py-3 px-3">
          <div className="Card shadow">
            <div className="d-flex justify-content-center align-items-center my-3"> 
                <Image src={"/assets/images/home_1.png"} layout="fixed" height={180} width={180} alt="" className="rounded-circle" />
            </div>
            <div className="container">
              <div className="d-flex justify-content-center">
              <h3 className="mb-2">Biskop Endrew</h3>
              </div>
              <div className="d-flex justify-content-center">
              <h6 className="text-muted mb-3">Front End at. PT Muara Murni</h6>
              </div>
              <div className="d-flex justify-content-center text-center">
              <h6 className="">Thank you JobSeek. I can find a job according to my skills.</h6>
              </div>
            </div>
            
          </div>
        </SwiperSlide>
        <SwiperSlide className="py-3 px-3">
          <div className="Card shadow">
            <div className="d-flex justify-content-center align-items-center my-3"> 
                <Image src={"/assets/images/home_1.png"} layout="fixed" height={180} width={180} alt="" className="rounded-circle" />
            </div>
            <div className="container">
              <div className="d-flex justify-content-center">
              <h3 className="mb-2">Biskop Endrew</h3>
              </div>
              <div className="d-flex justify-content-center">
              <h6 className="text-muted mb-3">Front End at. PT Muara Murni</h6>
              </div>
              <div className="d-flex justify-content-center text-center">
              <h6 className="">Thank you JobSeek. I can find a job according to my skills.</h6>
              </div>
            </div>
            
          </div>
        </SwiperSlide>
        <SwiperSlide className="py-3 px-3">
          <div className="Card shadow">
            <div className="d-flex justify-content-center align-items-center my-3"> 
                <Image src={"/assets/images/home_1.png"} layout="fixed" height={180} width={180} alt="" className="rounded-circle" />
            </div>
            <div className="container">
              <div className="d-flex justify-content-center">
              <h3 className="mb-2">Biskop Endrew</h3>
              </div>
              <div className="d-flex justify-content-center">
              <h6 className="text-muted mb-3">Front End at. PT Muara Murni</h6>
              </div>
              <div className="d-flex justify-content-center text-center">
              <h6 className="">Thank you JobSeek. I can find a job according to my skills.</h6>
              </div>
            </div>
            
          </div>
        </SwiperSlide>
        <SwiperSlide className="py-3 px-3">
          <div className="Card shadow">
            <div className="d-flex justify-content-center align-items-center my-3"> 
                <Image src={"/assets/images/home_1.png"} layout="fixed" height={180} width={180} alt="" className="rounded-circle" />
            </div>
            <div className="container">
              <div className="d-flex justify-content-center">
              <h3 className="mb-2">Biskop Endrew</h3>
              </div>
              <div className="d-flex justify-content-center">
              <h6 className="text-muted mb-3">Front End at. PT Muara Murni</h6>
              </div>
              <div className="d-flex justify-content-center text-center">
              <h6 className="">Thank you JobSeek. I can find a job according to my skills.</h6>
              </div>
            </div>
            
          </div>
        </SwiperSlide>
     
      </Swiper>
    </Fragment>
  );
};

export default HomeSwiper;
