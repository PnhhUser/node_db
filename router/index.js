import { Router } from "express";

const router = Router();

// api
import apiUser from "./api/user.api.js";
import apiCategory from "./api/category.api.js";
import apiAuth from "./api/auth.api.js";

const apiName = "/api";

router.use(apiName, apiUser);
router.use(apiName, apiCategory);
router.use(apiAuth);

// view
router.get("/", (req, res) => {
  return res.send("hi");
});

export default router;
