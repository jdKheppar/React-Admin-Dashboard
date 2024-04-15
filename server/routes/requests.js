import express from "express";
import { getRequests } from "../controllers/requests.js";

const router = express.Router();

router.get("/requests", getRequests);

export default router;