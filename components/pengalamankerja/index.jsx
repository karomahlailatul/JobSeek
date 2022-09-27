import Head from "next/head";
import React, { useEffect, Fragment } from "react";
import Image from "next/image";
import ImageFooter from "../../assets/images/toko.png";

const pengalamankerja = () => {
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <Image
            src={ImageFooter}
            layout="responsive"
            width="1"
            height="1"
            alt="Profile"
          />
        </div>
        <div className="col-10">
          <h3>Engineer</h3>
          <h5>Tokopedia</h5>
          <p>July 2019 - Januari 2020 6 months</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu
            lacus fringilla, vestibulum risus at.
          </p>
        </div>

        <div className="col-2">
          <Image
            src={ImageFooter}
            layout="responsive"
            width="1"
            height="1"
            alt="Profile"
          />
        </div>
        <div className="col-10">
          <h3>Web Developer</h3>
          <h5>Tokopedia</h5>
          <p>July 2019 - Januari 2020 6 months</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu
            lacus fringilla, vestibulum risus at.
          </p>
        </div>
      </div>
    </div>
  );
};

export default pengalamankerja;
