import mongoose from "mongoose";

const ActionSchema = new mongoose.Schema(
  {
    userId: String,
    details: String,
    actionType: String,
    comments: String,
  },
  { timestamps: true }
);

const Action = mongoose.model("Action", ActionSchema);
export default Action;