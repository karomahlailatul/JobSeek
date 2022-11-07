import { useDispatch } from "react-redux";
import { useState, Fragment } from "react";
import { deleteRecruiterJobDeleteJob } from "../../app/redux/Slice/RecruiterJobDeleteJobSlice";
import PreLoader from "../PreLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../WindowsSize";

import Modal from "react-bootstrap/Modal";

const ModalView = ({
  // => props default
  modalType,
  // isLoading,
  setIsLoading,
  token,
  refreshToken,

  // => props  job delete
  dataCheckBoxValueList,
  dispatchGetRecruiterJobMyJob,
  setCheckBoxValueList,
}) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteSelectedJob = async (e) => {
    await e.preventDefault();
    setIsLoading(true);
    dispatch(deleteRecruiterJobDeleteJob({ token, refreshToken, dataCheckBoxValueList }))
      .unwrap()
      .then(() => {
        dispatchGetRecruiterJobMyJob();
        setIsLoading(false);
        setCheckBoxValueList([]);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const size = useWindowSize();

  if (modalType == "delete-selected-job") {
    return (
      <Fragment>
        {dataCheckBoxValueList ? (
          <Fragment>
            <div className="col-2 d-flex justify-content-center align-items-center ps-1">
              <button className="btn btn-danger w-100" onClick={handleShowModal}>
                {size.width > 991 ? (
                  <Fragment>
                    <FontAwesomeIcon icon={faTrash} className="" />
                    <span className="ps-2">Delete</span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <FontAwesomeIcon icon={faTrash} className="" />
                  </Fragment>
                )}
              </button>
            </div>

            <Modal backdrop="static" size="sm" show={showModal} onHide={handleCloseModal} centered>
              <Modal.Body>
                <form id="form-delete-selected-job" onSubmit={handleDeleteSelectedJob}>
                  <div className="mb-3">
                    <h5>Are sure want to delete Job ?</h5>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-success w-100 me-1" onClick={handleCloseModal}>
                      <FontAwesomeIcon icon={faArrowLeft} className="" />
                      <span className="ps-2">Close</span>
                    </button>
                    <button type="submit" className="btn btn-danger text-light  w-100  ms-1">
                      <FontAwesomeIcon icon={faTrash} className="" />
                      <span className="ps-2">Confirm</span>
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </Fragment>
        ) : null}
      </Fragment>
    );
  } else {
    return null;
  }
};

export default ModalView;
