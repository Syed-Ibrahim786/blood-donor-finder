// import BloodRequest from "./bloodRequestjs"
// async function createDummy(){
//     await BloodRequest.create(
//     {
//   requester: "68677f86fd80cfe65e8a7a2a",
//   recipients: [
//     "68678616c88f307d7d1c5cc5"
//   ],
//   hospitalName: "Apollo Hospital, Chennai",
  
//   status: "pending", // optional, default is "pending"
// }
// )
// }

// createDummy()

import mongoose from "mongoose";
import dotenv from "dotenv";
import BloodRequest from "./BloodRequest.js";

dotenv.config();
await mongoose.connect(process.env.MONGODB_URL);

// ✅ Replace with real user ObjectIds from your DB


async function createDummy() {
  try {
    const result = await BloodRequest.create(
        {
  requester: "68678616c88f307d7d1c5cc5",
  recipients: [
    "68677f86fd80cfe65e8a7a2a"
  ],
  hospitalName: "Apollo Hospital, Chennai",
  
  status: "fulfilled", // optional, default is "pending"
},
{
  requester: "68678616c88f307d7d1c5cc5",
  recipients: [
    "68677f86fd80cfe65e8a7a2a"
  ],
  hospitalName: "Apollo Hospital, Chennai",
  
  status: "pending", // optional, default is "pending"
}

    );
    console.log("✅ Dummy BloodRequest created:", result);
    process.exit();
  } catch (err) {
    console.error("❌ Error creating dummy:", err);
    process.exit(1);
  }
}

createDummy();

