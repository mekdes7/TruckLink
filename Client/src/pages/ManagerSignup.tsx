import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

async function registerLogisticsManager({ email, password }: { email: string; password: string }) {
  try {
    const res = await fetch("https://trucklink.onrender.com/api/manager/registerManager", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to register");

    return true;
  } catch (error: any) {
    toast({ title: "Error", description: error.message, variant: "destructive" });
    return false;
  }
}


const LogisticsManagerSignup = () => {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const errs: typeof errors = {};
  if (!form.email) errs.email = "Email is required";
  if (!form.password) errs.password = "Password is required";
  if (form.password && form.password.length < 6) errs.password = "Password too short";
  if (form.password !== form.confirm) errs.confirm = "Passwords must match";
  setErrors(errs);

  if (Object.keys(errs).length > 0) return;

  
  const success = await registerLogisticsManager({ email: form.email, password: form.password });

  if (success) {
    toast({ title: "Registration Successful", description: "You can now sign in" });
    navigate("/manager/login");
  } else {
    toast({ title: "Registration Failed", description: "Try again", variant: "destructive" });
  }
};


  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white p-2 flex flex-col items-center font-sans text-black animate-fade-in">

      <div className="mb-8 flex justify-center">
        <img
          src="/TruckLink_Logo.jpg"
          alt="TruckLink logo"
          className="h-20 w-25 object-contain rounded-lg shadow-md"
          draggable={false}
        />
      </div>

    
      <div className="w-full max-w-md bg-white/25 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-md p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold drop-shadow-md">Create Account</h1>
          <p className="text-black/80 text-sm">Sign up as a Logistics Manager</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              className="rounded-full text-black"
              required
            />
            {errors.email && <p className="text-destructive text-xs pl-2">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="rounded-full text-black"
              required
            />
            {errors.password && <p className="text-destructive text-xs pl-2">{errors.password}</p>}
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
              className="rounded-full text-black"
              required
            />
            {errors.confirm && <p className="text-destructive text-xs pl-2">{errors.confirm}</p>}
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-blue-400 text-black font-bold shadow-md hover:bg-blue-300/70 active:scale-95 transition px-6 py-3"
          >
            Register
          </Button>
        </form>

        <div className="text-center space-y-3 text-sm text-black/80">
          <p>
            Already have an account?{" "}
            <Link to="/manager/login" className="underline font-semibold text-indigo-900 hover:text-indigo-700">
              Sign in
            </Link>
          </p>
          <p>
            <Link to="/driver/signup" className="underline text-indigo-900/70 text-xs hover:text-indigo-700">
              Want to sign up as a driver?
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LogisticsManagerSignup;
