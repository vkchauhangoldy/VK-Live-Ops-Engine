import { useState } from "react";
import axios from "axios";
import "./login.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3033/api/v4/login", {
                email,
                password,
            });
            localStorage.setItem("authToken", res.data.Token)
            // console.log(res.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    className="email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    className="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;