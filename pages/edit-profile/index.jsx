import Head from "next/head";
import React, { useEffect, Fragment } from "react";
import Navbar from "../../components/navbar/index";
import Footer from "../../components/footer/index";
import Image from "next/image";
import UploadImage from "../../assets/images/upload_image.png";

import ImageProfile from "../../assets/images/profile.png";
const Profile = () => {
  return (
    <div>
      <style global jsx>{``}</style>
      <Head>
        <title>Edit Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Fragment>
        <Navbar />
        <div className="container">
          <div className="row mt-3 justify-content-center">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <Image
                    src={ImageProfile}
                    layout="responsive"
                    width="1"
                    height="1"
                    alt="Profile"
                  />
                  <h3>Rifqi Ahmad Pratama</h3>
                  <h5>Web Developer</h5>
                  <p>Bandung, Jawa Barat</p>
                  <p>Freelancer</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum erat orci, mollis nec gravida sed, ornare quis
                    urna. Curabitur eu lacus fringilla, vestibulum risus at.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="card">
                <div className="card-body">
                  <h3>Data Diri</h3>
                  <hr />
                  <form
                    //   onSubmit={handleCreate}
                    className="w-100 form-sign-up"
                  >
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="nama"
                        className="form-input form-control"
                        id="nama"
                        placeholder="Masukan nama lengkap"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="job" className="form-label">
                        Job Desk
                      </label>
                      <input
                        type="text"
                        name="job"
                        className="form-input form-control"
                        id="job"
                        placeholder="Masukan job desk"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="domisili" className="form-label">
                        Domisili
                      </label>
                      <input
                        type="text"
                        name="domosili"
                        className="form-input form-control"
                        id="domosili"
                        placeholder="Masukan domosili"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="kerja" className="form-label">
                        Tempat Kerja
                      </label>
                      <input
                        type="text"
                        name="kerja"
                        className="form-input form-control"
                        id="kerja"
                        placeholder="Masukan Tempat Kerja"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="deskripsi" className="form-label">
                        Deskripsi Singkat
                      </label>
                      <textarea
                        type="text"
                        name="kerja"
                        className="form-input form-control"
                        id="kerja"
                        placeholder="Tuliskan Deskripsi Singkat"
                        // onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-body">
                  <h3>Skill</h3>
                  <hr />
                  <form
                    //   onSubmit={handleCreate}
                    className="w-100 form-sign-up"
                  >
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Skill
                      </label>
                      <input
                        type="text"
                        name="nama"
                        className="form-input form-control"
                        id="nama"
                        placeholder="Java"
                        // onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h3>Pengalaman Kerja</h3>
                  <hr />
                  <form
                    //   onSubmit={handleCreate}
                    className="w-100 form-sign-up"
                  >
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Posisi
                      </label>
                      <input
                        type="text"
                        name="nama"
                        className="form-input form-control"
                        id="nama"
                        placeholder="Posisi"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="row g-2">
                      <div className="col-md">
                        <div className="mb-2">
                          <label htmlFor="nama" className="form-label">
                            Nama perusahaan
                          </label>
                          <input
                            type="text"
                            name="nama"
                            className="form-input form-control"
                            id="nama"
                            placeholder="Posisi"
                            // onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md">
                        <div className="mb-2">
                          <label htmlFor="nama" className="form-label">
                            Bulan/tahun
                          </label>
                          <input
                            type="text"
                            name="nama"
                            className="form-input form-control"
                            id="nama"
                            placeholder="Januari 2020"
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="deskripsi" className="form-label">
                        Deskripsi Singkat
                      </label>
                      <textarea
                        type="text"
                        name="kerja"
                        className="form-input form-control"
                        id="kerja"
                        placeholder="Tuliskan Deskripsi Singkat"
                        // onChange={handleChange}
                      />
                    </div>
                    <hr className="mt-3" />

                    <div className="row justify-content-center">
                      <button type="button" className="btn btn-outline-warning">
                        Tambah Pegalaman Kerja
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-body">
                  <h3>Portofolio</h3>
                  <hr />
                  <form
                    //   onSubmit={handleCreate}
                    className="w-100 form-sign-up"
                  >
                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Nama Aplikasi
                      </label>
                      <input
                        type="text"
                        name="nama"
                        className="form-input form-control"
                        id="nama"
                        placeholder="Masukan nama aplikasi"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Link repository
                      </label>
                      <input
                        type="text"
                        name="nama"
                        className="form-input form-control"
                        id="nama"
                        placeholder="Masukan link repository"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Type portofolio
                      </label>
                      <div className="container row">
                        <div className="form-check col-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault1"
                          >
                            Aplikasi mobile
                          </label>
                        </div>
                        <div className="form-check col-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Aplikasi web
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <label htmlFor="nama" className="form-label">
                        Upload Gambar
                      </label>
                      <Image
                        src={UploadImage}
                        layout="responsive"
                        width="2"
                        height="1"
                        alt="Profile"
                      />
                    </div>
                    <hr className="mt-3" />
                    <div className="row justify-content-center">
                      <button type="button" className="btn btn-outline-warning">
                        Tambah Portofolio
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    </div>
  );
};

export default Profile;
