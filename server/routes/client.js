import express from "express";
import { getCustomers, getActions, addCustomer, updateCustomer, updateAction } from "../controllers/client.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/add", addCustomer);
router.get("/customers/update/:id", updateCustomer)
router.get("/actions", getActions);
router.get("/actions/update/:id", updateAction)
export default router;
