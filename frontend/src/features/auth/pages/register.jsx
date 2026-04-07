import { useState } from "react";
import { Link, } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../../../components/layout/AuthLayout";
import { registerUser } from "../../../services/authService";

const Register = () => {
    const { handleAuthSuccess } = useAuth();
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        try {
            const { confirmPassword, ...payload } = form;
            const res = await registerUser(payload);
            handleAuthSuccess(res.data);

        } catch (err) {
            setError(err.response?.data?.message || "Registration Failed");
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Fill in the details to get started."
            sideContent={
                <>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
                        Join the<br />Movement<span className="text-indigo-500">.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
                        Secure your spot at Frolic 2026. Join thousands of students and coordinators across the
                    </p>

                </>
            }
            footer={
                <>
                    <span className="text-slate-500">Already have an account?</span>
                    <Link to="/" className="ml-1 font-bold text-purple-400 hover:text-purple-300 transition-colors">Sign In</Link>
                </>
            }
        >
            <>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input label="Name" name="fullName" type="text" placeholder="Enter Name" value={form.name} onChange={handleChange("name")} />
                    <Input label="Email" name="email" type="email" placeholder="Enter Email" value={form.email} onChange={handleChange("email")} />
                    <Input label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange("password")} />
                    <Input label="Confirm Password" name="cpassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange("confirmPassword")} />
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <Button loading={loading}>Sign Up </Button>
                </form>
            </>
        </AuthLayout>

    );
};

export default Register;