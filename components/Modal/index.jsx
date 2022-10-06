import { useDispatch } from "react-redux";

import { useState, Fragment } from "react";

import { deleteRecruiterJobDeleteJob } from "../../app/redux/Slice/RecruiterJobDeleteJobSlice";

import PreLoader from "../PreLoader";

const Modal = ({ modalType, dataCheckBoxValueList, dispatchGetRecruiterJobMyJob }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  // console.log(dataCheckBoxValueList)

  const handleDeleteSelectedJob = async (e) => {
    await e.preventDefault();
    setIsLoading(true);
    dispatch(deleteRecruiterJobDeleteJob(dataCheckBoxValueList))
      .unwrap()
      .then(() => {
        // if (item.statusCode === 200) {
        dispatchGetRecruiterJobMyJob();
        setIsLoading(false);
        // }
      });

    document.getElementById("close-modal").click();
  };

  // console.log(dataCheckBoxValueList);
  if (modalType == "delete-selected-job") {
    return (
      <Fragment>
        <PreLoader isLoading={isLoading} />
        <div className="col-2 d-flex justify-content-center align-items-center">
          <button className="btn btn-danger rounded-pill px-4" alt="Edit Icon" data-bs-toggle="modal" data-bs-target="#modal" style={{ display: dataCheckBoxValueList ? "block" : "none" }}>
            Delete
          </button>
        </div>

        <div className="modal fade" id="modal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <form id="form-delete-selected-job" onSubmit={handleDeleteSelectedJob}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Delete Selected Job
                  </h5>
                  <button
                    type="button"
                    id="close-modal"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    // onClick={(e) => {
                    //   setPreviewEdit();
                    //   setNewPhotoEdit();
                    //   document.getElementById("form-edit-recipes").reset();
                    // }}
                  ></button>
                </div>

                <div className="modal-body">
                  <h4>Are sure want to delete Selected Job ?</h4>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    // onClick={(e) => {
                    //   setPreviewEdit();
                    //   setNewPhotoEdit();
                    //   document.getElementById("form-edit-recipes").reset();
                    // }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-danger text-light">
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default Modal;
