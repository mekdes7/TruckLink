import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

function authenticateLogisticsManager({ email, password }: { email: string; password: string }) {
  if (!email || !password) return false;
  localStorage.setItem("logistics_manager_logged_in", "1");
  return true;
}

export default function LogisticsManagerLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: typeof errors = {};
    if (!form.email) validationErrors.email = "Email is required";
    if (!form.password) validationErrors.password = "Password is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    if (authenticateLogisticsManager(form)) {
      toast({ title: "Welcome back!", description: "You’re logged in as Logistics Manager." });
      navigate("/");
    } else {
      toast({ title: "Login failed", description: "Please check your credentials.", variant: "destructive" });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-cyan-50 to-blue-100 px-6 py-1 font-sans">
      <section className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10 sm:p-12 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/TruckLink_Logo.jpeg"
            alt="TruckLink Logo"
            className="h-16 w-auto object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Logistics Manager Login
        </h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <Input
              placeholder="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              className="h-12 px-4 text-lg rounded-xl shadow-inner bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="h-12 px-4 text-lg rounded-xl shadow-inner bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl font-bold bg-gradient-to-tr from-blue-700 via-cyan-600 to-blue-400 text-white hover:from-blue-800 hover:to-cyan-500 transition-transform duration-200 hover:scale-105 shadow-lg"
          >
            Sign In
          </Button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            to="/"
            className="underline text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>
        <div className="mt-2 text-center text-xs text-blue-600">
          <Link
            to="/driver/login"
            className="underline hover:text-blue-800 font-medium transition-colors"
          >
            Login as Driver
          </Link>
        </div>
      </section>
    </main>
  );
}
