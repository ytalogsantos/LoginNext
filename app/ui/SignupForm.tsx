"use client";
import styles from "@/app/styles/forms.module.css";
import { montserrat } from "@/app/layout";
import { useState } from "react";
import { FormEvent } from "react";

export default function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email, password})
        });

        const data = await res.json();

        if(!res.ok) {
            alert(data.message);
            return;
        }

        window.location.href = "/home";
        
    }

    return (
        <>
        <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
                <h1>Sing up</h1>
                <div>
                    <label htmlFor="username" className={montserrat.className}>Username </label>
                    <input type="text" name="username" id="username-input" required placeholder="your name" className={montserrat.className} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email" className={montserrat.className}>Email </label>
                    <input type="email" name="email" id="email-input" required placeholder="youremail@something.com" className={montserrat.className} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" id="password-input" required placeholder="********" className={montserrat.className} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className={montserrat.className}>Cancel</button>
                    <button type="submit" className={montserrat.className}>Create account</button>
                </div>

            </form>
        </div>
        </>
    );
}