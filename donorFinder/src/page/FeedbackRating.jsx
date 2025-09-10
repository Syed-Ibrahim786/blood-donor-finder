import { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("https://bloodnet-du9t.onrender.com/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
      },
      body: JSON.stringify({ rating, feedback }),
    });

    if (res.ok) {
      setMessage("✅ Thanks for your feedback!");
      setRating(0);
      setFeedback("");
    } else {
      setMessage("❌ Error submitting feedback");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Feedback & Rating</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div className="flex gap-2 text-3xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={star <= rating ? "text-yellow-500" : "text-gray-400"}
            >
              ★
            </button>
          ))}
        </div>

        {/* Feedback Text */}
        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-2 border rounded h-24"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Submit Feedback
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
