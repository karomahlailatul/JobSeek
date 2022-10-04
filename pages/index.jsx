// import Head from "next/head";
import {  Fragment } from "react";
// import Navbar from "../../components/navbar/index";
import HomeSwiper from "../components/homeSwiper";
import Image from "next/image";
// import ImageProfile from "../assets/images/home_1.png";
//import { SwiperSlide } from "swiper";

const Home = () => {
  return (
    <Fragment>
      {/* <Navbar /> */}
      <div className="container ">
        <div className="row mt-3 justify-content-center">
          <div className="col-6 d-flex align-items-center">
            <div>
              <h2>
                Find The country`s best talent for industrial revolution 4.0
              </h2>
              <p className="mt-2">
                We provide a talented workforce who are ready to advance
                industry 4.0
              </p>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-success mt-3 px-5 py-3"
                >
                  Started Now
                </button>{" "}
              </div>
            </div>
          </div>
          <div className="col-6">
            <Image
              src={"/assets/images/home_1.png"}
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-6">
            <Image
              src={"/assets/images/home_2.png"}
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </div>
        
          <div className="col-6 d-flex align-items-center">
            <div>
              <h2>Why must find talent on JobSeek</h2>
              <div className="d-flex text-center mt-3 mb-3">
                <Image
                  src={"/assets/icons/checkbox.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; Independent</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                  src={"/assets/icons/checkbox.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; Competent</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                  src={"/assets/icons/checkbox.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; Skilled</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                  src={"/assets/icons/checkbox.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; Ready to work</p>
              </div>
              
              
            </div>
          </div>
        </div>

        <div className="row mt-3 justify-content-center">
        <div className="col-6 d-flex align-items-center">
            <div className="col-12">
              <h2>Why must find talent on JobSeek</h2>
              <div className="d-flex">
              <div className="col-6">
              <div className="d-flex text-center mt-3 mb-3">
                <Image
                  src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; Java</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; Kotlin</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                 src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; PHP</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
               src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; JavaScript</p>
              </div>
              </div>
              <div className="col-6">
              <div className="d-flex text-center mt-3 mb-3">
                <Image
                 src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; Golang</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                 src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; C++</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                 src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; Ruby</p>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                 src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="my-auto">&nbsp; C#</p>
              </div>
              
              </div>
              </div>
              <div className="d-flex text-center mb-3">
                <Image
                  src={"/assets/icons/checkbox_2.svg"}
                  alt=""
                  width={28}
                  height={28}
                />
                
                <p className="my-auto text-truncate ">&nbsp;10+ More Programming Language</p>
              </div>
              
             
              
              
            </div>
          </div>
          <div className="col-6">
            <Image
              src={"/assets/images/home_3.png"}
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <HomeSwiper />
    </Fragment>
  );
};

export default Home;
