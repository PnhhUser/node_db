import { Router } from "express";
import { User } from "../../mongodb/models/user.model.js";
import { createDoc, sendError } from "../../utils/index.js";
import { checkSchema } from "express-validator";
import { STATUS } from "../../constants/status.constant.js";

const router = Router();

// --------------------------------------------------------------------------
router.post(
  "/login",
  checkSchema({
    username: {
      isLength: {
        options: {
          min: 5,
          max: 32,
        },
        errorMessage: "username length greater than 5 and less than 32",
      },
    },
    password: {
      isLength: {
        options: {
          min: 5,
        },
      },
      errorMessage: "The password must be at least 5 characters",
    },
  }),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });

      if (!existingUser) {
        sendError("not found user", STATUS.BAD_REQUEST.status_number);
      }

      if (password !== existingUser.password) {
        sendError("password dose not match", STATUS.BAD_REQUEST.status_number);
      }

      existingUser.password = "";

      res.json({
        existingUser,
        secrect_key: req.signedCookies.COOKIE_SECRET_KEY,
      });
    } catch (error) {
      return next(error);
    }
  }
);

// --------------------------------------------------------------------------
router.post(
  "/register",
  checkSchema({
    username: {
      isLength: {
        options: {
          min: 5,
          max: 32,
        },
        errorMessage: "username length greater than 5 and less than 32",
      },
    },
    password: {
      isLength: {
        options: {
          min: 5,
        },
      },
      errorMessage: "The password must be at least 5 characters",
    },
  }),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        sendError("already exist username", STATUS.BAD_REQUEST.status_number);
      }

      await createDoc(User, { username, password });

      res.cookie(
        process.env.COOKIE_SECRET_KEY,
        process.env.COOKIE_SECRET_VALUE,
        {
          expires: new Date(Date.now() + 1 * 3600000),
          signed: true,
          secure: true,
          httpOnly: true,
        }
      );

      res.json({
        secrect_key: req.signedCookies.COOKIE_SECRET_KEY,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
