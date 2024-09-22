import { Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import {
  createUserValidator,
  updateUserValidator,
} from "../../validator/user.validator.js";
import { STATUS } from "../../constants/status.constant.js";
import { User } from "../../mongodb/models/user.model.js";
import {
  createDoc,
  findAll,
  findById,
  sendError,
  updateDoc,
} from "../../utils/index.js";

const router = Router();

// -----------------------------------------------------------------------
router.get("/users", async (req, res, next) => {
  const users = await findAll();

  res.status(STATUS.OK.status_number).json({
    users,
  });
});

// -----------------------------------------------------------------------
router.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await findById(id);

    if (!user) {
      sendError("not find user id", STATUS.BAD_REQUEST.status_number);
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    return next(error);
  }
});

// ----------------------------------------------------------------------
router.post(
  "/user",
  checkSchema(createUserValidator),
  async (req, res, next) => {
    try {
      const { body } = req;

      const validate = validationResult(req).array();

      if (validate.length !== 0) {
        sendError(validate[0].msg, STATUS.BAD_REQUEST.status_number);
      }

      const user = await createDoc(User, body);

      res.status(STATUS.OK.status_number).json({
        user,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// ----------------------------------------------------------------------
router.put(
  "/user/:id",
  checkSchema(updateUserValidator),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const { body } = req;

      const validate = validationResult(req).array();

      if (validate.length !== 0) {
        sendError(validate[0].msg, STATUS.BAD_REQUEST.status_number);
      }

      const result = await updateDoc(User, id, body);

      if (!result) {
        sendError("not find user id", STATUS.BAD_REQUEST.status_number);
      }

      const user = await User.findById(id);

      res.status(STATUS.OK.status_number).json({
        user,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// --------------------------------------------------------------------
router.delete("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      sendError("not find user id", STATUS.BAD_REQUEST.status_number);
    }

    res.status(STATUS.OK.status_number).json({
      user,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
