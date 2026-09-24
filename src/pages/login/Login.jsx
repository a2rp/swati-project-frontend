import { useEffect, useState } from "react";
import { FiArrowRight, FiLock } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import styles from "./styles.module.scss";

const Login = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(() => window.localStorage.getItem("token") || "");
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (token) {
            navigate("/search");
        }
    }, [navigate, token]);

    const handleChange = (event) => {
        setInputs((currentInputs) => ({
            ...currentInputs,
            [event.target.name]: event.target.value,
        }));
    };

    const loginUser = async (email, password) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setResponse("Enter a valid email address.");
            return;
        }

        if (password.trim().length < 8 || password.trim().length > 16) {
            setResponse("Password must contain 8 to 16 characters.");
            return;
        }

        if (!/^[a-zA-Z0-9]+$/.test(password)) {
            setResponse("Password must use only letters and numbers.");
            return;
        }

        setIsLoading(true);
        setResponse("");

        try {
            const result = await axios.post("http://localhost:1198/api/login", {
                email,
                password,
            });
            const nextToken = result.data.token;
            window.localStorage.clear();
            window.localStorage.setItem("token", nextToken);
            setToken(nextToken);
        } catch (error) {
            setResponse(
                error.response?.data?.message ||
                    "Unable to connect to the login service.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(inputs.email.trim(), inputs.password.trim());
    };

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.content}>
                <section className={styles.card}>
                    <div className={styles.cardIcon}><FiLock aria-hidden="true" /></div>
                    <p className={styles.eyebrow}>SECURE ACCESS</p>
                    <h1>Welcome back.</h1>
                    <p className={styles.description}>Sign in to open the protected search workspace.</p>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.field}>
                            <span>Email address</span>
                            <input type="email" name="email" placeholder="you@example.com" value={inputs.email} onChange={handleChange} autoComplete="email" required />
                        </label>
                        <label className={styles.field}>
                            <span>Password</span>
                            <input type="password" name="password" placeholder="Enter your password" value={inputs.password} onChange={handleChange} autoComplete="current-password" required />
                        </label>
                        <button className="button" type="submit" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                            {!isLoading && <FiArrowRight aria-hidden="true" />}
                        </button>
                        {response && <p className="errorMessage">{response}</p>}
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Login;