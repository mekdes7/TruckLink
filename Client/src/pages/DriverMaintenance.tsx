import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  "Engine",
  "Tire",
  "Oil",
  "Brake",
  "Lights",
  "Transmission",
];

const getReports = () => {
  try {
    const reports = localStorage.getItem("maintenance_reports");
    return reports ? JSON.parse(reports) : [];
  } catch {
    return [];
  }
};

const storeReports = (reports) => {
  localStorage.setItem("maintenance_reports", JSON.stringify(reports));
};

const DriverMaintenance = () => {
  const [form, setForm] = useState({ category: "", comment: "", photo: null });
  const [reports, setReports] = useState(getReports());
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handlePhoto = (e) => {
    setForm(f => ({
      ...f,
      photo: e.target.files && e.target.files[0] ? e.target.files[0].name : null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.comment || form.comment.length < 4) {
      setError("Select a category and enter a comment (min 4 chars).");
      return;
    }
    const newReport = {
      ...form,
      status: "Pending",
      date: new Date().toISOString(),
      id: Date.now()
    };
    const updated = [newReport, ...reports];
    setReports(updated);
    storeReports(updated);
    setForm({ category: "", comment: "", photo: null });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white p-6 flex flex-col items-center font-sans text-black">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-extrabold mb-8 drop-shadow-md px-2 text-center">🛠️ Maintenance Reporting</h1>

        <Card className="mb-8 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-md bg-white/25 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold drop-shadow-sm px-6 py-4">Report an Issue</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="category" className="mb-2 font-semibold text-black">Category</label>
                <select
                  id="category"
                  name="category"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  {CATEGORIES.map(c => (
                    <option value={c} key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="comment" className="mb-2 font-semibold text-black">Comment</label>
                <Input
                  id="comment"
                  name="comment"
                  placeholder="Describe issue"
                  value={form.comment}
                  onChange={handleChange}
                  required
                  className="rounded-lg text-black"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="photo" className="mb-2 font-semibold text-black">Upload Photo</label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="rounded-lg"
                />
                {form.photo && (
                  <span className="mt-1 text-xs text-black/70">{form.photo}</span>
                )}
              </div>

              {error && <div className="text-sm text-destructive font-semibold">{error}</div>}

              <Button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 text-indigo-900 font-bold shadow-md hover:brightness-110 active:scale-95 transition"
              >
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reported Issues */}
        <Card className="rounded-3xl shadow-2xl border border-white/30 backdrop-blur-md bg-white/20 animate-fade-in max-h-[320px] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold drop-shadow-sm px-6 py-4">Your Reports</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {reports.length === 0 ? (
              <p className="italic text-black/70 text-center text-base py-12">No reports yet.</p>
            ) : (
              <ul className="space-y-4 text-black text-base">
                {reports.slice(0, 5).map((r) => (
                  <li key={r.id} className="bg-gradient-to-r from-cyan-300/20 via-blue-400/20 to-indigo-500/20 rounded-xl p-4 shadow-md flex flex-col break-words">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{r.category}</span>
                      <time className="text-xs text-black/70">{new Date(r.date).toLocaleString()}</time>
                    </div>
                    <p className="mb-2 text-sm">{r.comment}</p>
                    <p className="text-xs text-black/70 mb-2">{r.photo ? `Photo: ${r.photo}` : "No photo"}</p>
                    <span
                      className={`text-xs font-semibold ${
                        r.status === "Pending"
                          ? "text-yellow-600"
                          : r.status === "Resolved"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {r.status}
                    </span>
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

export default DriverMaintenance;
