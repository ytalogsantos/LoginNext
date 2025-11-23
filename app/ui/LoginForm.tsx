"use client";
import styles from "@/app/styles/forms.module.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { montserrat, tiny5 } from "@/app/layout";
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
            body: JSON.stringify({ email, password })
        });

        const userData = await res.json();

        if (!res.ok) {
            toast.error(`${userData.message}`);
            return;
        } else {
            toast.success(`${userData.message}`, {
                onClose: () => window.location.href = "/home"
            });
        }
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
                        <input type="email" name="email" id="email-input" required autoComplete="off" className={montserrat.className} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Senha </label>
                        <input type="password" name="password" id="password-input" required className={montserrat.className} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" className={montserrat.className}>Entrar</button>
                        <button className={montserrat.className}>Esqueceu a senha?</button>
                        <button className={montserrat.className} onClick={createAccount}>Criar conta</button>
                    </div>

                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </>
    );
}