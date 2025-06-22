import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

function authenticateDriver({ email, password }: { email: string; password: string }) {
  if (!email || !password) return false;
  localStorage.setItem("driver_logged_in", "1");
  return true;
}

const DriverLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: typeof errors = {};
    if (!form.email) formErrors.email = "Email is required";
    if (!form.password) formErrors.password = "Password is required";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    if (authenticateDriver(form)) {
      toast({ title: "Login Successful", description: "Welcome, Driver!" });
      navigate("/driver/dashboard");
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials", variant: "destructive" });
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-white via-blue-300 to-white flex flex-col items-center justify-center px-6 py-10 animate-fade-in font-sans text-black">
      {/* Logo */}
      <div className="mb-10 flex justify-center">
        <img
          src="/TruckLink_Logo.jpeg"
          alt="TruckLink logo"
          className="h-20 w-28 object-contain rounded-2xl shadow-lg"
          draggable={false}
        />
      </div>

      {/* Card */}
      <section className="w-full max-w-sm bg-white/30 rounded-3xl shadow-2xl backdrop-blur-md p-8 space-y-8 border border-white/40">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold drop-shadow-md">Driver Login</h1>
          <p className="text-base text-black/80">Access your driver dashboard</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              className="rounded-full text-black"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              required
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-destructive text-sm pl-3 select-none"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="rounded-full text-black"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              required
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-destructive text-sm pl-3 select-none"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-blue-400 text-black font-bold shadow-md hover:bg-blue-300/70 active:scale-95 transition px-6 py-3"
          >
            Sign In
          </Button>
        </form>

        <div className="text-center space-y-3 text-sm">
          <p className="text-black/80">
            Don&apos;t have an account?{" "}
            <Link
              to="/driver/signup"
              className="underline font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Sign up
            </Link>
          </p>
          <p>
            <Link
              to="/"
              className="underline text-black/60 text-xs hover:text-black"
            >
              Login as Manager
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default DriverLogin;
