import express from "express";
import {
  getCustomers,
  getActions,
  addCustomer,
  updateCustomer,
  removeCustomer,
  updateAction,
} from "../controllers/client.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.post("/customers/add", addCustomer);
router.put("/customers/update", updateCustomer);
router.delete("/customers/remove/:id", removeCustomer);
router.get("/actions", getActions);
router.put("/actions/update", updateAction);
export default router;
