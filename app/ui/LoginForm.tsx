"use client";
import styles from "@/app/styles/forms.module.css";
import { montserrat } from "@/app/layout";
import { useState } from "react";
import { FormEvent } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        });

        const userData = await res.json();

        if(!res.ok) {
            alert(userData.message)
            return;
        }

        window.location.href = "/home";
        
    }

    return (
        <>
        <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="email" className={montserrat.className}>Email </label>
                    <input type="email" name="email" id="email-input" required placeholder="youremail@something.com" className={montserrat.className} onChange={(email) => setEmail(email.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" id="password-input" required placeholder="********" className={montserrat.className} onChange={(password) => setPassword(password.target.value)}/>
                </div>
                <div>
                    <button type="submit" className={montserrat.className}>Log in</button>
                    <button className={montserrat.className}>Forget password?</button>
                    <button className={montserrat.className}>Sign up</button>
                </div>

            </form>
        </div>
        </>
    );
}