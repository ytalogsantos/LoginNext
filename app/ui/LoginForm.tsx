"use client";
import styles from "@/app/styles/forms.module.css";
import { montserrat } from "@/app/layout";
export default function LoginForm() {
    return (
        <>
        <div className={styles.loginForm}>
            <form>
                <h1>Login</h1>
                <div>
                    <label htmlFor="email" className={montserrat.className}>Email </label>
                    <input type="email" name="email" id="email-input" required placeholder="youremail@something.com" className={montserrat.className}/>
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" id="password-input" required placeholder="********" className={montserrat.className}/>
                </div>
                <div>
                    <button type="submit" className={montserrat.className}>Log in</button>
                    <button className={montserrat.className}>Forgot password?</button>
                    <button className={montserrat.className}>Sign up</button>
                </div>

            </form>
        </div>
        </>
    );
}