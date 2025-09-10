import { useState } from "react";

export default function BecomeDonorButton() {
  const [showPopup, setShowPopup] = useState(false);

  async function handleBecomeDonor() {
    const res = await fetch("https://bloodnet-du9t.onrender.com/donor/register", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
      },
    });

    if (res.status === 204) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleBecomeDonor}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
      >
        Become Donor
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-600">
              🎉 Congratulations!
            </h2>
            <p>You are now a donor.</p>
          </div>
        </div>
      )}
    </div>
  );
}
