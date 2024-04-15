import express from "express";
import { getCustomers, getActions } from "../controllers/client.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/actions", getActions);

export default router;
