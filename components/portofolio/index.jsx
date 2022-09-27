import Head from "next/head";
import React, { useEffect, Fragment } from "react";
import Image from "next/image";
import ImageFooter from "../../assets/images/home_1.png";

const Porto = () => {
  return (
    <div>
      <div className="row row-cols-2 row-cols-lg-3 align-items-center g-5">
        <div className="col categories">
          <div className="card card-1 text-center d-flex flex-colum">
            <Image
              src={ImageFooter}
              layout="responsive"
              width="1"
              height="1"
              alt="Profile"
            />
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <a href="/category/{category[0].id}">
                <p className="font-category"></p>
              </a>
            </div>
          </div>
        </div>
        <div className="col categories">
          <div className="card card-2">
            <Image
              src={ImageFooter}
              layout="responsive"
              width="1"
              height="1"
              alt="Profile"
            />
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <p className="font-category"></p>
            </div>
          </div>
        </div>
        <div className="col categories">
          <div className="card card-3">
            <Image
              src={ImageFooter}
              layout="responsive"
              width="1"
              height="1"
              alt="Profile"
            />
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <p className="font-category"></p>
            </div>
          </div>
        </div>
        <div className="col categories">
          <div className="card card-3">
            <Image
              src={ImageFooter}
              layout="responsive"
              width="1"
              height="1"
              alt="Profile"
            />
            <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
              <p className="font-category"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Porto;
