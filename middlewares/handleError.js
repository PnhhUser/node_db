import { STATUS } from "../constants/status.constant.js";

function HandleError(err, req, res, next) {
  const error = {
    message: err.message || "Something went wrong!",
    status: err.status || STATUS.SERVER_ERROR.status_number,
  };

  res.status(error.status).json(error);
}

export default HandleError;
