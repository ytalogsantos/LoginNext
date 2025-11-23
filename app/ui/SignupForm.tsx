"use client";
import styles from "@/app/styles/forms.module.css";
import { montserrat, tiny5 } from "@/app/layout";
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

        const responseData = await res.json();

        if(!res.ok) {
            alert(responseData.message);
            return;
        }

        window.location.href = "/home";
        
    }

    async function cancelButton(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        window.location.href = "/login";
    }

    return (
        <>
        <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
                <h1 className={tiny5.className}>Registrar-se </h1>
                <div>
                    <label htmlFor="username" className={montserrat.className}>Nome de Usuário </label>
                    <input type="text" name="username" id="username-input" required className={montserrat.className} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email" className={montserrat.className}>Email </label>
                    <input type="email" name="email" id="email-input" required className={montserrat.className} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Senha </label>
                    <input type="password" name="password" id="password-input" required className={montserrat.className} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className={montserrat.className} onClick={cancelButton}>Voltar</button>
                    <button type="submit" className={montserrat.className}>Criar conta</button>
                </div>
            </form>
        </div>
        </>
    );
}