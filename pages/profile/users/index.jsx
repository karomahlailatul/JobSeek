import  { Fragment } from 'react'

const ProfileUser = () => {
  return (
    <Fragment>
        <div class="container container-profile-customer">
            <div class="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid">
                <div
                    class="col-xl-3 col-lg-3 col-md-12 col-sm-12 d-xl-grid d-lg-grid d-md-flex d-sm-flex my-xl-5 my-lg-5 mt-md-5 mt-sm-5">
                    <div class="col-xl-12 col-lg-12 col-md-6 col-sm-6 d-flex my-auto mx-auto">
                        <div
                            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center align-items-center">
                            {/* <img class="photo-profile-side" src="./assets/images/profile.jpg" alt="profile" /> */}
                        </div>
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 my-auto">
                            <p class="my-auto fw-bold">Johanes Mikael</p>
                            <p class="text-muted my-auto">
                                {/* <img class="me-2" src="./assets/images/icons/edit.svg" alt="" /> */}
                                <small>Change
                                    profile</small>
                            </p>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-6 col-sm-6 my-xl-5 my-lg-5 mb-md-5 mb-sm-5 ">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12 ">

                                    <div class="nav nav-pills d-grid" id="v-pills-tab" role="tablist"
                                        aria-orientation="vertical">
                                        <a class="nav-link active" id="v-pills-profile-tab" data-bs-toggle="pill"
                                            data-bs-target="#v-pills-profile" type="button" role="tab"
                                            aria-controls="v-pills-profile" aria-selected="true">
                                            {/* <img class="me-1" src="./assets/images/icons/my_account.svg" alt="i" /> */}
                                            <span>My
                                                account</span>
                                        </a>

                                        <a class="nav-link" id="v-pills-address-tab" data-bs-toggle="pill"
                                            data-bs-target="#v-pills-address" type="button" role="tab"
                                            aria-controls="v-pills-address" aria-selected="true">
                                            {/* <img class="me-1" src="./assets/images/icons/shipping.svg" alt="" /> */}
                                            <span>Shipping
                                                Address</span>
                                        </a>

                                        <a class="nav-link" id="v-pills-order-tab" data-bs-toggle="pill"
                                            data-bs-target="#v-pills-order" type="button" role="tab"
                                            aria-controls="v-pills-order" aria-selected="true">
                                            {/* <img class="me-1" src="./assets/images/icons/order.svg" alt="" /> */}
                                            <span>My
                                                Order</span>
                                        </a>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>


                <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12  bg-light">
                    <div class="container">
                        <div class="col-12 w-auto bg-white mx-3 my-5 py-3 px-3">
                            <div class="tab-content" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-profile" role="tabpanel"
                                    aria-labelledby="v-pills-profile-tab" data-toggle="button">
                                    <row class="">
                                        <div class="container-fluid">
                                            <div class="col-12 justify-content-start">
                                                <h4 class="modal-title fw-bold " id="modalProfileLabel">
                                                    My Profile</h4>
                                                <h6 class="text-muted my-2" id="modalProfileLabel">
                                                    Manage your profile information</h6>
                                            </div>
                                            <hr/>
                                            <div
                                                class="col-12 d-xl-flex d-lg-flex flex-xl-row-reverse flex-lg-row-reverse d-md-grid d-sm-grid justify-content-start my-3">
                                                <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                                    <div class="col-12 d-flex justify-content-center my-3">
                                                        {/* <img class="photo-profile" src="./assets/images/profile.jpg"
                                                            alt="profile" /> */}
                                                    </div>
                                                    <div class="col-12 d-flex justify-content-center">
                                                        <button type="button"
                                                            class="btn btn-outline-secondary rounded-pill"
                                                            data-bs-toggle="modal" data-bs-target="#modalAddress">Select
                                                            Image</button>
                                                    </div>


                                                </div>
                                                <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                                    <div class="col-12 d-flex justify-content-start my-3">
                                                        <div class="col-5 d-flex justify-content-end ">
                                                            <label for="exampleFormControlInput1"
                                                                class="fs-6 text-muted form-label my-auto mx-5">Name</label>
                                                        </div>
                                                        <input type="name" class="form-control"
                                                            id="exampleFormControlInput1" placeholder=""/>
                                                    </div>
                                                    <div class="col-12 d-flex justify-content-start my-3">
                                                        <div class="col-5 d-flex justify-content-end ">
                                                            <label for="exampleFormControlInput1"
                                                                class="fs-6 text-muted form-label my-auto mx-5">Email</label>
                                                        </div>
                                                        <input type="email" class="form-control"
                                                            id="exampleFormControlInput1" placeholder=""/>
                                                    </div>
                                                    <div class="col-12 d-flex justify-content-start my-3">
                                                        <div class="col-5 d-flex justify-content-end ">
                                                            <label for="exampleFormControlInput1"
                                                                class="fs-6 text-muted form-label my-auto mx-5">Phone
                                                                Number</label>
                                                        </div>
                                                        <input type="phone" class="form-control"
                                                            id="exampleFormControlInput1" placeholder=""/>
                                                    </div>

                                                    <div class="col-12 d-flex justify-content-start my-3">
                                                        <div class="col-5 d-flex justify-content-end ">
                                                            <label for="exampleFormControlInput1"
                                                                class="fs-6 text-muted form-label my-auto mx-5">Gender</label>
                                                        </div>
                                                        <div class="col-6 d-flex justify-content-between">
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio"
                                                                    name="inlineRadioOptions" id="inlineRadio1"
                                                                    value="option1"/>
                                                                <label class="form-check-label my-auto"
                                                                    for="inlineRadio1">Men</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio"
                                                                    name="inlineRadioOptions" id="inlineRadio2"
                                                                    value="option2"/>
                                                                <label class="form-check-label my-auto"
                                                                    for="inlineRadio2">Women</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="col-12 d-flex justify-content-start my-3">
                                                        <div class="col-5 d-flex justify-content-end ">
                                                            <label for="exampleFormControlInput1"
                                                                class="fs-6 text-muted form-label my-auto mx-5">Date of
                                                                Birth</label>
                                                        </div>
                                                        <select class="form-select me-2"
                                                            aria-label="Default select example">
                                                            <option selected>Day</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                            <option value="24">24</option>
                                                            <option value="25">25</option>
                                                            <option value="26">26</option>
                                                            <option value="27">27</option>
                                                            <option value="28">28</option>
                                                            <option value="29">29</option>
                                                            <option value="30">30</option>
                                                            <option value="31">31</option>
                                                        </select>
                                                        <select class="form-select me-2"
                                                            aria-label="Default select example">
                                                            <option selected>Month</option>
                                                            <option value="1">January</option>
                                                            <option value="2">February</option>
                                                            <option value="3">March</option>
                                                            <option value="4">April</option>
                                                            <option value="5">May</option>
                                                            <option value="6">June</option>
                                                            <option value="7">July</option>
                                                            <option value="8">August</option>
                                                            <option value="9">September</option>
                                                            <option value="10">October</option>
                                                            <option value="11">November</option>
                                                            <option value="12">December</option>
                                                        </select>
                                                        <select class="form-select" aria-label="Default select example">
                                                            <option selected>Year</option>
                                                            <option value="1900">1901</option>
                                                            <option value="1901">1901</option>
                                                            <option value="1902">1902</option>
                                                            <option value="1903">1903</option>
                                                            <option value="1904">1904</option>
                                                            <option value="1905">1905</option>
                                                            <option value="1906">1906</option>
                                                            <option value="1907">1907</option>
                                                            <option value="1908">1908</option>
                                                            <option value="1909">1909</option>
                                                            <option value="1910">1910</option>
                                                            <option value="1911">1911</option>
                                                            <option value="1912">1912</option>
                                                            <option value="1913">1913</option>
                                                            <option value="1914">1914</option>
                                                            <option value="1915">1915</option>
                                                            <option value="1916">1916</option>
                                                            <option value="1917">1917</option>
                                                            <option value="1918">1918</option>
                                                            <option value="1919">1919</option>
                                                            <option value="1920">1920</option>
                                                            <option value="1921">1921</option>
                                                            <option value="1922">1922</option>
                                                            <option value="1923">1923</option>
                                                            <option value="1924">1924</option>
                                                            <option value="1925">1925</option>
                                                            <option value="1926">1926</option>
                                                            <option value="1927">1927</option>
                                                            <option value="1928">1928</option>
                                                            <option value="1929">1929</option>
                                                            <option value="1930">1930</option>
                                                            <option value="1931">1931</option>
                                                            <option value="1932">1932</option>
                                                            <option value="1933">1933</option>
                                                            <option value="1934">1934</option>
                                                            <option value="1935">1935</option>
                                                            <option value="1936">1936</option>
                                                            <option value="1937">1937</option>
                                                            <option value="1938">1938</option>
                                                            <option value="1939">1939</option>
                                                            <option value="1940">1940</option>
                                                            <option value="1941">1941</option>
                                                            <option value="1942">1942</option>
                                                            <option value="1943">1943</option>
                                                            <option value="1944">1944</option>
                                                            <option value="1945">1945</option>
                                                            <option value="1946">1946</option>
                                                            <option value="1947">1947</option>
                                                            <option value="1948">1948</option>
                                                            <option value="1949">1949</option>
                                                            <option value="1950">1950</option>
                                                            <option value="1951">1951</option>
                                                            <option value="1952">1952</option>
                                                            <option value="1953">1953</option>
                                                            <option value="1954">1954</option>
                                                            <option value="1955">1955</option>
                                                            <option value="1956">1956</option>
                                                            <option value="1957">1957</option>
                                                            <option value="1958">1958</option>
                                                            <option value="1959">1959</option>
                                                            <option value="1960">1960</option>
                                                            <option value="1961">1961</option>
                                                            <option value="1962">1962</option>
                                                            <option value="1963">1963</option>
                                                            <option value="1964">1964</option>
                                                            <option value="1965">1965</option>
                                                            <option value="1966">1966</option>
                                                            <option value="1967">1967</option>
                                                            <option value="1968">1968</option>
                                                            <option value="1969">1969</option>
                                                            <option value="1970">1970</option>
                                                            <option value="1971">1971</option>
                                                            <option value="1972">1972</option>
                                                            <option value="1973">1973</option>
                                                            <option value="1974">1974</option>
                                                            <option value="1975">1975</option>
                                                            <option value="1976">1976</option>
                                                            <option value="1977">1977</option>
                                                            <option value="1978">1978</option>
                                                            <option value="1979">1979</option>
                                                            <option value="1980">1980</option>
                                                            <option value="1981">1981</option>
                                                            <option value="1982">1982</option>
                                                            <option value="1983">1983</option>
                                                            <option value="1984">1984</option>
                                                            <option value="1985">1985</option>
                                                            <option value="1986">1986</option>
                                                            <option value="1987">1987</option>
                                                            <option value="1988">1988</option>
                                                            <option value="1989">1989</option>
                                                            <option value="1990">1990</option>
                                                            <option value="1991">1991</option>
                                                            <option value="1992">1992</option>
                                                            <option value="1993">1993</option>
                                                            <option value="1994">1994</option>
                                                            <option value="1995">1995</option>
                                                            <option value="1996">1996</option>
                                                            <option value="1997">1997</option>
                                                            <option value="1998">1998</option>
                                                            <option value="1999">1999</option>
                                                            <option value="2001">2001</option>
                                                            <option value="2002">2002</option>
                                                            <option value="2003">2003</option>
                                                            <option value="2004">2004</option>
                                                            <option value="2005">2005</option>
                                                            <option value="2006">2006</option>
                                                            <option value="2007">2007</option>
                                                            <option value="2008">2008</option>
                                                            <option value="2009">2009</option>
                                                            <option value="2010">2010</option>
                                                            <option value="2011">2011</option>
                                                            <option value="2012">2012</option>
                                                            <option value="2013">2013</option>
                                                            <option value="2014">2014</option>
                                                            <option value="2015">2015</option>
                                                            <option value="2016">2016</option>
                                                            <option value="2017">2017</option>
                                                            <option value="2018">2018</option>
                                                            <option value="2019">2019</option>
                                                            <option value="2020">2020</option>
                                                            <option value="2021">2021</option>
                                                            <option value="2022">2022</option>

                                                        </select>
                                                    </div>
                                                    <div class="col-12 d-flex justify-content-center my-4">
                                                        <button type="button" class="btn-save-profile  rounded-pill "
                                                            data-bs-toggle="modal" data-bs-target="#modalAddress">
                                                            Save</button>
                                                    </div>


                                                </div>


                                            </div>

                                        </div>

                                    </row>

                                </div>

                                <div class="tab-pane fade show" id="v-pills-address" role="tabpanel"
                                    aria-labelledby="v-pills-address-tab" data-toggle="button">

                                    <row class="my-5">
                                        <div class="container-fluid">
                                            <div class="col-12 justify-content-start ">
                                                <h4 class="modal-title fw-bold" id="modalAddressLabel">
                                                    Choose another address</h4>
                                                <h6 class="text-muted my-2" id="modalAddressLabel">
                                                    Manage your shipping address</h6>
                                            </div>
                                            <hr/>
                                            <div class="mx-5 mt-5 mb-4">
                                                <div class="col-12 d-flex justify-content-center my-3 ">
                                                    <button
                                                        class="btn-new-address col d-flex justify-content-center align-items-center text-center"
                                                        data-bs-toggle="modal" data-bs-target="#modalNewAddress"
                                                        data-bs-dismiss="modal" type="button">
                                                        <p class="text-muted my-auto">Add New Address</p>
                                                    </button>
                                                </div>
                                                <div class="col-12 justify-content-start mb-4">
                                                    <div class="list-group my-4">
                                                        <a href="#" data-bs-dismiss="modal"
                                                            class="list-group-item list-group-item-action active my-3"
                                                            aria-current="true">
                                                            <h5 class="my-2 mx-2">Andreas Jane</h5>
                                                            <h6 class="my-2 mx-2">
                                                                <small>
                                                                    Perumahan Sapphire Mediterania,
                                                                    Wiradadi, Kec. Sokaraja, Kabupaten
                                                                    Banyumas, Jawa Tengah, 53181
                                                                    [Tokopedia Note: blok c
                                                                    16] Sokaraja, Kab. Banyumas, 53181
                                                                </small>
                                                            </h6>
                                                            <button
                                                                class="btn-change-address d-flex justify-content-start align-items-start text-start"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#modalChangeAddress"
                                                                data-bs-dismiss="modal" type="link">
                                                                <p class="fw-bold text-danger my-auto text-danger">
                                                                    Change
                                                                    Address</p>
                                                            </button>
                                                        </a>
                                                        <a href="#" data-bs-dismiss="modal"
                                                            class="list-group-item list-group-item-action my-3"
                                                            aria-current="true">
                                                            <h5 class="my-2 mx-2">Andreas Jule</h5>
                                                            <h6 class="my-2 mx-2">
                                                                <small>
                                                                    Perumahan Sapphire Mediterania,
                                                                    Wiradadi, Kec. Sokaraja, Kabupaten
                                                                    Banyumas, Jawa Tengah, 53181
                                                                    [Tokopedia Note: blok c
                                                                    16] Sokaraja, Kab. Banyumas, 53181
                                                                </small>
                                                            </h6>
                                                            <button
                                                                class="btn-change-address d-flex justify-content-start align-items-start text-start"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#modalChangeAddress"
                                                                data-bs-dismiss="modal" type="link">
                                                                <p class="fw-bold text-danger my-auto text-danger">
                                                                    Change
                                                                    Address</p>
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </row>

                                    <div class="modal fade" id="modalNewAddress" data-bs-backdrop="static"
                                        data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalNewAddressLabel"
                                        aria-hidden="true">
                                        <div class="modal-dialog modal-xl">
                                            <div class="modal-content">

                                                <div class="modal-body">
                                                    <div class="container-fluid">
                                                        <div class="row">
                                                            <div class="col-12 d-flex justify-content-end ">
                                                                <button type="button" class="btn-close"
                                                                    data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-center my-2">
                                                                <h4 class="modal-title fw-bold "
                                                                    id="modalNewAddressLabel">Add new address</h4>
                                                            </div>
                                                            <div class="col-12 justify-content-center my-2 ">
                                                                <label for="exampleFormControlInput1"
                                                                    class="fs-6 text-muted form-label">Save address
                                                                    as (ex : home address, office address)</label>
                                                                <input type="email" class="form-control"
                                                                    id="exampleFormControlInput1" placeholder="Rumah"/>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-between my-2 ">
                                                                <div class="col-6">
                                                                    <div class="col-11">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">Recipient`s
                                                                            name</label>
                                                                        <input type="email" class="form-control"
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>

                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="col-12">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">Recipient`s
                                                                            telephone number</label>
                                                                        <input type="email" class="form-control"
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-between  my-2 ">
                                                                <div class="col-6">
                                                                    <div class="col-11">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">Address
                                                                        </label>
                                                                        <input type="email" class="form-control "
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="col-12">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">Postal
                                                                            code</label>
                                                                        <input type="email" class="form-control"
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-between my-2 ">
                                                                <div class="col-6">
                                                                    <div class="col-11">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">City
                                                                            or
                                                                            Subdistrict</label>
                                                                        <input type="email" class="form-control"
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 d-flex my-2">
                                                                <div class="form-check">
                                                                    <input type="checkbox" class="form-check-input"
                                                                        id="customControlInline" />
                                                                    <label class="form-check-label mt-1 mb-1"
                                                                        for="customControlInline">Remember my
                                                                        preference</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-end my-2">
                                                                <div class="col-6 d-flex justify-content-center">
                                                                    <button
                                                                        class="btn-cancel-address rounded-pill me-1 w-100"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#modalAddress"
                                                                        data-bs-dismiss="modal" type="button">
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        class="btn-save-address rounded-pill ms-1 w-100"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#modalAddress"
                                                                        data-bs-dismiss="modal" type="button">
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal fade" id="modalChangeAddress" data-bs-backdrop="static"
                                        data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalChangeAddressLabel"
                                        aria-hidden="true">
                                        <div class="modal-dialog modal-xl">
                                            <div class="modal-content">

                                                <div class="modal-body">
                                                    <div class="container-fluid">
                                                        <div class="row">
                                                            <div class="col-12 d-flex justify-content-end ">
                                                                <button type="button" class="btn-close"
                                                                    data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-center my-2">
                                                                <h4 class="modal-title fw-bold "
                                                                    id="modalChangeAddressLabel">Change address</h4>
                                                            </div>
                                                            <div class="col-12 justify-content-center my-2 ">
                                                                <label for="exampleFormControlInput1"
                                                                    class="fs-6 text-muted form-label">Save address
                                                                    as (ex : home address, office address)</label>
                                                                <input type="email" class="form-control"
                                                                    id="exampleFormControlInput1" placeholder="Rumah"/>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-between my-2 ">
                                                                <div class="col-6">
                                                                    <div class="col-11">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">Recipient`s
                                                                            name</label>
                                                                        <input type="email" class="form-control"
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>

                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="col-12">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">Recipient`s
                                                                            telephone number</label>
                                                                        <input type="email" class="form-control"
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-between  my-2 ">
                                                                <div class="col-6">
                                                                    <div class="col-11">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">Address
                                                                        </label>
                                                                        <input type="email" class="form-control "
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>
                                                                </div>
                                                                <div class="col-6">
                                                                    <div class="col-12">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">Postal
                                                                            code</label>
                                                                        <input type="email" class="form-control"
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-between my-2 ">
                                                                <div class="col-6">
                                                                    <div class="col-11">
                                                                        <label for="exampleFormControlInput1"
                                                                            class="fs-6 text-muted form-label">City
                                                                            or
                                                                            Subdistrict</label>
                                                                        <input type="email" class="form-control"
                                                                            id="exampleFormControlInput1"
                                                                            placeholder=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 d-flex my-2">
                                                                <div class="form-check">
                                                                    <input type="checkbox" class="form-check-input"
                                                                        id="customControlInline" />
                                                                    <label class="form-check-label mt-1 mb-1"
                                                                        for="customControlInline">Remember my
                                                                        preference</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 d-flex justify-content-end my-2">
                                                                <div class="col-6 d-flex justify-content-center">
                                                                    <button
                                                                        class="btn-cancel-address rounded-pill me-1 w-100"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#modalAddress"
                                                                        data-bs-dismiss="modal" type="button">
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        class="btn-save-address rounded-pill ms-1 w-100"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#modalAddress"
                                                                        data-bs-dismiss="modal" type="button">
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane fade show" id="v-pills-order" role="tabpanel"
                                    aria-labelledby="v-pills-order-tab" data-toggle="button">
                                    <row class="">
                                        <div class="container-fluid container-nav-pills">
                                            <div class="col-12 justify-content-start">
                                                <h4 class="modal-title fw-bold " id="modalProfileLabel">
                                                    My Order</h4>

                                            </div>
                                            <div class="nav d-flex-column nav-pills justify-content-start mt-2"
                                                id="v-pills-tab" role="tablist" aria-orientation="horizontal">

                                                <a class="nav-link active" id="v-pills-allitem-tab"
                                                    data-bs-toggle="pill" data-bs-target="#v-pills-allitem"
                                                    type="button" role="tab" aria-controls="v-pills-allitem"
                                                    aria-selected="true">
                                                    All items</a>

                                                <a class="nav-link" id="v-pills-notpaid-tab" data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-notpaid" type="button" role="tab"
                                                    aria-controls="v-pills-notpaid" aria-selected="true"> Not paid
                                                    yet</a>

                                                <a class="nav-link" id="v-pills-packed-tab" data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-packed" type="button" role="tab"
                                                    aria-controls="v-pills-packed" aria-selected="true"> Packed</a>

                                                <a class="nav-link" id="v-pills-sent-tab" data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-sent" type="button" role="tab"
                                                    aria-controls="v-pills-sent" aria-selected="true"> Sent</a>

                                                <a class="nav-link" id="v-pills-completed-tab" data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-completed" type="button" role="tab"
                                                    aria-controls="v-pills-completed" aria-selected="true">
                                                    Completed</a>

                                                <a class="nav-link" id="v-pills-cancel-tab" data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-cancel" type="button" role="tab"
                                                    aria-controls="v-pills-cancel" aria-selected="true"> Order
                                                    Cancel</a>

                                            </div>
                                            <hr/>

                                            <div class="tab-content" id="v-pills-tabContent">

                                                <div class="tab-pane fade show active" id="v-pills-allitem"
                                                    role="tabpanel" aria-labelledby="v-pills-allitem-tab"
                                                    data-toggle="button">
                                                    <div class="vh-100">
                                                        tab all item
                                                    </div>
                                                </div>

                                                <div class="tab-pane fade show" id="v-pills-notpaid" role="tabpanel"
                                                    aria-labelledby="v-pills-notpaid-tab" data-toggle="button">
                                                    <div class="vh-100">
                                                        tab not paid
                                                    </div>
                                                </div>

                                                <div class="tab-pane fade show" id="v-pills-packed" role="tabpanel"
                                                    aria-labelledby="v-pills-packed-tab" data-toggle="button">
                                                    <div class="vh-100">
                                                        tab picked
                                                    </div>
                                                </div>

                                                <div class="tab-pane fade show" id="v-pills-sent" role="tabpanel"
                                                    aria-labelledby="v-pills-sent-tab" data-toggle="button">
                                                    <div class="vh-100">
                                                        tab sent
                                                    </div>
                                                </div>

                                                <div class="tab-pane fade show" id="v-pills-completed" role="tabpanel"
                                                    aria-labelledby="v-pills-completed-tab" data-toggle="button">
                                                    <div class="vh-100">
                                                        tab completed
                                                    </div>
                                                </div>

                                                <div class="tab-pane fade show" id="v-pills-cancel" role="tabpanel"
                                                    aria-labelledby="v-pills-cancel-tab" data-toggle="button">
                                                    <div class="vh-100">
                                                        tab order cancel
                                                    </div>
                                                </div>




                                            </div>


                                        </div>

                                    </row>
                                </div>



                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ProfileUser