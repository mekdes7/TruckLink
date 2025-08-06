import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function getFeedbacks() {
  try {
    const feedbacks = localStorage.getItem("driver_feedbacks");
    return feedbacks ? JSON.parse(feedbacks) : [];
  } catch {
    return [];
  }
}
function storeFeedbacks(feedbacks) {
  localStorage.setItem("driver_feedbacks", JSON.stringify(feedbacks));
}

const DriverFeedback = () => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState(getFeedbacks());
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || text.length < 4) {
      setError("Please enter more detail (min 4 characters).");
      return;
    }
    const newFeedback = {
      message: text,
      date: new Date().toISOString(),
      id: Date.now(),
    };
    const updated = [newFeedback, ...feedbacks].slice(0, 5);
    setFeedbacks(updated);
    storeFeedbacks(updated);
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white p-5 flex flex-col items-center font-sans text-black">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-extrabold mb-8 drop-shadow-lg px-2">💬 Feedback & Support</h1>

        <Card className="mb-8 rounded-3xl shadow-2xl border border-white/40 backdrop-blur-md bg-white/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black drop-shadow-sm px-6 py-4">
              Submit Feedback or Issue
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Your feedback or complaint"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError("");
                }}
                autoFocus
                required
                className="text-black rounded-lg"
              />
              <div className="flex items-center space-x-5">
                <Button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white font-bold shadow-md hover:brightness-110 active:scale-95 transition px-6 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-400"
                >
                  Submit
                </Button>
                {submitted && (
                  <span className="text-green-600 font-semibold text-sm select-none">Submitted!</span>
                )}
                {error && (
                  <span className="text-red-600 font-semibold text-sm select-none">{error}</span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-2xl border border-white/40 backdrop-blur-md bg-white/25 animate-fade-in max-h-[320px] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black drop-shadow-sm px-6 py-4">
              Last 5 Submissions
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {feedbacks.length === 0 ? (
              <p className="italic text-black/70 text-center text-base py-10 px-4">
                No submissions yet.
              </p>
            ) : (
              <ul className="space-y-5 text-black text-base">
                {feedbacks.map((f) => (
                  <li
                    key={f.id}
                    className="p-4 rounded-2xl bg-gradient-to-r from-cyan-300/30 via-blue-400/30 to-indigo-500/30 shadow-sm flex flex-col break-words"
                  >
                    <p className="mb-2 font-medium">{f.message}</p>
                    <time className="text-xs text-black/70">{new Date(f.date).toLocaleString()}</time>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DriverFeedback;
