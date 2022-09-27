import { Fragment } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export async function getServerSideProps(context) {
  const id = context.query.id;

  // console.log(test)

  const res = await axios.get(process.env.REACT_APP_API_BACKEND + "job/fulldata/" + id);
  return {
    props: { result: res.data.data[0] },
  };
}

const JobDetails = ({ result }) => {
  const router = useRouter();
  return (
    <Fragment>
      <div className="container text-center ">
        <div className="col-12  ">
          <h2 className="fs-4 fw-bold">Informasi Job</h2>
        </div>
        <div className="col-12 my-4">
          <h2 className="fs-5 fw-bold">Job Name</h2>
          <h2 className="fs-6 fw-bold text-danger">{result.name}</h2>
        </div>
        <div className="col-12 my-4">
          <h2 className="fs-5 fw-bold">Company</h2>
          <h2 className="fs-6 fw-bold text-danger">{result.company}</h2>
        </div>
        <div className="col-12 my-4">
          <h2 className="fs-5 fw-bold">Position</h2>
          <h2 className="fs-6 fw-bold text-danger">{result.position}</h2>
        </div>
        <div className="col-12 my-4">
          <h2 className="fs-5 fw-bold">Description</h2>
          <p className="fs-6 text-muted ">
            <small> {result.description}</small>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default JobDetails;
