import { Router } from "express";
import { Category } from "../../mongodb/models/category.model.js";
import { STATUS } from "../../constants/status.constant.js";
import { checkSchema } from "express-validator";
import { categoryValidator } from "../../validator/category.validator.js";
import { createDoc } from "../../utils/index.js";

const router = Router();

// create category
router.post(
  "/category",
  checkSchema(categoryValidator),
  async (req, res, next) => {
    try {
      const { body } = req;

      const validate = validationResult(req).array();

      if (validate.length !== 0) {
        sendError(validate[0].msg, STATUS.BAD_REQUEST.status_number);
      }

      const cat = await createDoc(Category, body);

      res.status(STATUS.OK.status_number).json({
        cat,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
