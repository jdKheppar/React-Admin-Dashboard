import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlyApprovalsTotal: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalApprovals: Number,
        totalRequests: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalApprovals: Number,
        totalRequests: Number,
      },
    ],
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;