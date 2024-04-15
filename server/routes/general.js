import express from "express";
import { getUser, getClient } from "../controllers/general.js";
    

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/client/:id", getClient);
// router.get("/dashboard", getDashboardStats);

export default router;