import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../../../components/layout/AuthLayout";
import { loginUser } from "../../../services/authService";

const Login = () => {
  const { handleAuthSuccess } = useAuth();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);
      handleAuthSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Secure access to your festival command center."
      sideContent={
        <>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-400 font-bold text-sm">
            <i className="bi bi-stars"></i> 2026 Edition
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
            Frolic<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
            The premier state-level collegiate experience. Connect, compete, and celebrate excellence in the digital age.
          </p>

        </>
      }
      footer={
        <>
          <span className="text-slate-500">New to the festival?</span>
          <Link to="/register" className="ml-1 font-bold text-purple-400 hover:text-purple-300 transition-colors">Create Account</Link>
        </>}
    >
      <>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Email" name="email" type="email" placeholder="Enter Email" value={form.email} onChange={handleChange("email")} />
          <Input label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange("password")} />
          {error && (
            <p className="text-red-400 text-sm font-medium">{error}</p>
          )}
          <Button loading={loading}>Sign In </Button>
        </form>
      </>
    </AuthLayout>
  );
};

export default Login;