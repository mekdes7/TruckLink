
import { Lock, UserPlus, User } from "lucide-react";

type AuthHeroProps = {
  title: string;
  subtitle: string;
  icon: "login" | "signup" | "manager" | "driver";
};

const iconMap = {
  login: <Lock size={36} className="text-white drop-shadow-lg" />,
  signup: <UserPlus size={36} className="text-white drop-shadow-lg" />,
  manager: <User size={36} className="text-white drop-shadow-lg" />,
  driver: <User size={36} className="text-white drop-shadow-lg" />,
};

const imageMap = {
  manager:
    "/TruckLink_Logo.jpeg",
  driver:
    "/TruckLink_Logo.jpeg",
  default:
    "/TruckLink_Logo.jpeg",
};

export default function AuthHero({ title, subtitle, icon }: AuthHeroProps) {
  return (
    <div className="
      relative w-full overflow-visible rounded-3xl mb-8 shadow-xl
      bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400
      px-8 pt-12 pb-10 flex flex-col items-center gap-3
      animate-fade-in
      before:content-[''] before:absolute before:-top-8 before:left-1/2 before:-translate-x-1/2 before:w-44 before:h-44 before:rounded-full before:bg-white/10 before:blur-3xl before:z-0
    ">
      <div className="absolute top-6 left-6 z-10 hidden md:block">
        <img
          src={imageMap[icon] || imageMap["default"]}
          alt=""
          className="h-20 w-20 rounded-2xl object-cover shadow-lg border-4 border-white/60"
          draggable={false}
        />
      </div>
      <div className="flex flex-col items-center gap-2 z-20">
        <div className="bg-white/30 rounded-full p-5 flex items-center justify-center shadow-xl mb-4">{iconMap[icon]}</div>
        <h1 className="font-extrabold text-4xl sm:text-5xl text-white tracking-tight drop-shadow-lg leading-tight font-playfair">
          TruckLink
        </h1>
        <h2 className="text-xl sm:text-2xl text-white font-semibold tracking-wide mb-2 drop-shadow">
          {title}
        </h2>
        <span className="text-white/90 text-base sm:text-lg font-light text-center max-w-md">
          {subtitle}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-cyan-200/10 to-blue-200/0 pointer-events-none rounded-3xl" />
      <div className="absolute left-0 right-0 bottom-0 h-2 bg-gradient-to-r from-blue-800 via-cyan-300 to-green-200 opacity-60 pointer-events-none rounded-b-3xl" />
    </div>
  );
}
