import { Router } from "express";

import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

router.route("/").get((req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "success"));
});

export default router;
