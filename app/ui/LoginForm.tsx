"use client";
import styles from "@/app/styles/forms.module.css";
import { montserrat,  tiny5 } from "@/app/layout";
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

    async function createAccount(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        window.location.href = "/signup";
    }

    return (
        <>
        <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
                <div>
                    <img src="/user-icon.svg" alt="Ícone de usuário" /> 
                    <h2 className={tiny5.className}>Entre com a sua conta</h2>
                </div>
                <div>
                    <label htmlFor="email" className={montserrat.className}>Email </label>
                    <input type="email" name="email" id="email-input" required className={montserrat.className} onChange={(email) => setEmail(email.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Senha </label>
                    <input type="password" name="password" id="password-input" required className={montserrat.className} onChange={(password) => setPassword(password.target.value)}/>
                </div>
                <div>
                    <button type="submit" className={montserrat.className}>Entrar</button>
                    <button className={montserrat.className}>Esqueceu a senha?</button>
                    <button className={montserrat.className} onClick={createAccount}>Criar conta</button>
                </div>

            </form>
        </div>
        </>
    );
}