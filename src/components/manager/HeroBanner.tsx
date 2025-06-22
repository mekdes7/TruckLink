
import { Briefcase } from "lucide-react";

const HeroBanner = () => (
  <div className="relative mb-10 w-full rounded-[2.5rem] shadow-xl overflow-hidden bg-gradient-to-tr from-blue-900 via-cyan-700/90 to-cyan-300/70 min-h-[165px] flex items-center justify-between px-10 py-12 animate-fade-in space-x-4">
    {/* Glowing floating highlight */}
    <div className="absolute -z-10 inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_60%_70%,rgba(0,145,255,0.13),rgba(0,0,40,0)_80%)]" />
    {/* Hero left */}
    <div className="flex items-center gap-6">
      <div className="relative">
        <img
          src="/TruckLink_Logo.jpeg"
          alt="TruckLink"
          className="h-28 w-28 object-cover rounded-3xl shadow-2xl border-4 border-cyan-50"
          draggable={false}
        />
        {/* Glow behind truck image */}
        <span className="absolute -z-10 top-3 left-3 w-20 h-20 bg-cyan-300 blur-3xl opacity-30 rounded-full" />
      </div>
      <div className="text-white/95">
        <h2 className="text-4xl font-playfair font-black drop-shadow-xl flex items-center tracking-tight gap-3">
          <Briefcase className="inline-block mb-1 blur-[0.5px] text-cyan-300 drop-shadow-xl" size={40} />
          TruckLink
        </h2>
        <p className="mt-2 text-2xl font-semibold drop-shadow font-playfair">Manager Dashboard</p>
        <p className="mt-2 text-md opacity-90 leading-tight font-light">
          Efficient logistics, <span className="bg-white/20 rounded px-2">maximum</span> style.<br />
          See jobs, drivers & payments in a glance.
        </p>
      </div>
    </div>
    {/* Illustration right */}
    <div className="hidden lg:block relative">
      <img
        src="/TruckLink_Logo.jpeg"
        alt="Logistics"
        className="h-36 rounded-3xl shadow-2xl object-cover border-4 border-cyan-50 blur-[0.5px]"
        draggable={false}
      />
      {/* Gradient fade right edge */}
      <span className="absolute top-0 right-0 h-full w-2 bg-gradient-to-r from-transparent to-cyan-700/40 rounded-r-3xl" />
    </div>
    {/* Color band for extra polish */}
    <div className="absolute left-0 right-0 bottom-0 h-3 bg-gradient-to-r from-blue-800 via-cyan-300 to-green-200 opacity-70 rounded-b-3xl" />
  </div>
);

export default HeroBanner;

