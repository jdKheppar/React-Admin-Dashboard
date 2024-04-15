import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    request_num: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    account_num: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Address: {
      type: String,
      required: true,
      trim: true,
    },
    affiliation: {
      type: String,
      required: true,
      enum: ["Corporate", "Individual", "SME", "Non-Profit", "Government"],
    },
    market_segment: {
      type: String,
      required: true,
    },
    Internal_responsible: {
      type: String,
      required: true,
    },
    company_interlocutor: {
      type: String,
      required: true,
    },
    Activity_indicator: {
      type: Number,
      required: true,
    },
    Comment_CA: {
      type: String,
      trim: true,
    },
    supporting_document: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["customer"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);
export default Client;
