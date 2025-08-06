import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const roles = [
  { title: " Driver", url: "/driver/signup" },
  { title: "Logistics Manager", url: "/manager/login" },
];

export default function Landing() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-300 to-white p-6 font-sans text-black">
      <section className="w-full max-w-sm bg-white/25 backdrop-blur-md rounded-3xl border border-white/30 shadow-lg p-8 space-y-8 animate-fade-in">
    
        <div className="flex justify-center">
          <img
            src="/TruckLink_Logo.jpg"
            alt="TruckLink logo"
            className="h-20 w-25 object-contain rounded-lg shadow-md"
            draggable={false}
          />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-extrabold drop-shadow-md tracking-tight">
            TruckLink
          </h1>
          <p className="text-sm text-black/70 font-medium mt-1">
            Jobs on Wheels. Delivered Fast.
          </p>
        </div>

        <div className="text-center">
          <p className="text-xs text-black/70 mb-5 italic">Select your role</p>
          <div className="flex flex-col gap-4">
            {roles.map(({ title, url }) => (
              <Link key={url} to={url} aria-label={`Sign up as ${title}`}>
                <Button
                  className="w-full rounded-full bg-white text-black font-bold shadow-md hover:bg-blue-300/70 active:scale-95 transition px-6 py-3"
                >
                  {title}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <footer className="text-center text-[10px] text-black/50 pt-6 border-t border-white/30 select-none">
          © 2025 TruckLink. Built for the road.
        </footer>
      </section>
    </main>
  );
}
