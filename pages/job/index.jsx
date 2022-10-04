import  { Fragment ,useState , useEffect} from 'react'

import Card from "react-bootstrap/Card";
import axios from "axios";

// import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Job = () => {
  
  // const router = useRouter();
  const keyword = ""
  const [job, setJob] = useState([]);
  const getJob = async () => {
    await axios
      .get(process.env.REACT_APP_API_BACKEND + "job/fulldata?search=" + keyword)
      //  .get(process.env.REACT_APP_API_BACKEND + "product?search=" + search + "&sortby=name&sort=" + sort + "&page=1&limit=24")
      .then((response) => {
        setJob(response.data.data);
        // setProductsPagination(response.data.pagination);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(keyword);
  };

  useEffect(() => {
   getJob();
  }, [keyword])

  console.log(job)
  
  return (
    <Fragment>
<div className="container">
          <div className="row-new">
            <div className="row">
              <div className="col-md-12 justify-content-center">
                <div className="row">
                  <h1 className="fw-bold">Find : {keyword}</h1>
                  {/* <p className="fs-6 text-muted">Total product {productsPagination.totalData}</p> */}
                </div>
              </div>


              <div className="col-12 my-3">
                <div className="row  d-flex px-2">
                  {job.map((item) => (
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 my-2 link-product " key={item.id}>
                    <Link  href={`/job/${item.id}`} >
                      <Card className="container border rounded text-center">
                       
                          <div className="d-flex justify-content-center out-img-product my-2">
                            {/* <img referrerPolicy="no-referrer" className="img-product" src={item.logo} alt="" />{" "} */}
                           <Image
                                  referrerPolicy="no-referrer"
                                  width={140}
                                  height={140}
                                  layout="fixed"
                                  src={item.logo}
                                  alt=""
                                  className=""
                                />

                          
                          </div>
                          <h6 className="text-dark fw-bold title-product ">{item.name}</h6>
                          
                          <h6 className="text-danger">{item.company}</h6>
                          <p className="fs-6 text-muted">
                            <small>{item.position}</small>
                          </p>
                          {/* <img className="mb-3" crossOrigin="anonymous" src={require("../../assets/images/product/stars.png")} alt="" /> */}
                       
                      </Card>
                    </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

    </Fragment>
  )
}

export default Job