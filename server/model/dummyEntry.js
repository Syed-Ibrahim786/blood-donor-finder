import mongoose from "mongoose";
import dotenv from "dotenv";
import BloodRequest from "./BloodRequest.js";
import DonorAndBenficiary from "./userModel.js";

dotenv.config();

try {
  

  // Create a dummy blood request
  const bloodRequest = await BloodRequest.create([{
    requester: "68677f86fd80cfe65e8a7a2a",
    recipients: ["68678616c88f307d7d1c5cc5"],
    hospitalName: "Apollo Hospital, Chennai",
    acceptedBy: "68678616c88f307d7d1c5cc5",
    status: "fulfilled",
  },
{
    requester: "68678616c88f307d7d1c5cc5",
    recipients: ["68677f86fd80cfe65e8a7a2a"],
    hospitalName: "Apollo Hospital, Chennai",
    acceptedBy: "68678616c88f307d7d1c5cc5",
    status: "fulfilled",
  }]);

  console.log("🩸 Dummy BloodRequest Created:", bloodRequest);

  // Delete users with empty name (clean-up)
  const deleteResult = await DonorAndBenficiary.deleteMany({ name: "" });
  console.log(`🧹 Deleted ${deleteResult.deletedCount} user(s) with empty name`);

  process.exit(0);
} catch (err) {
  console.error("❌ Error:", err);
  process.exit(1);
}
