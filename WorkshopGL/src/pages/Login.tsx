import React from "react";
import { authApi } from "../api/endpoints";
import { useNotification } from "../context/NotificationContext";

const Login: React.FC = () => {
    const { notify } = useNotification();

    const [form, setForm] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                await authApi.login(form.email, form.password);
                notify.success("Logged in successfully");
            } catch {
                notify.error("Login failed, please try again");
            }
        };
    
        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );

}

export default Login;