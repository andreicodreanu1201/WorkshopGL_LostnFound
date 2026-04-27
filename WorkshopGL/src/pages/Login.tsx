import React from "react";

const Login: React.FC = () => {

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
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            // Here you would typically send the form data to your backend API
            console.log("Form submitted:", form);
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