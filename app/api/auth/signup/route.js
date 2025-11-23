import { NextResponse } from "next/server";
import connectDb from "@/config/DbConnection";
import User from "@/models/User";

export async function POST(req) {
    await connectDb();

    try {
        const { username, email, password } = await req.json();
        if (!username || !email || !password) {
            return NextResponse.json({ message: "Preencha todos os campos." }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: "Email já associado a uma conta existente." }, { status: 400 });
        }

        const newUser = { username, email, password };
        User.create(newUser);
        return NextResponse.json({ message: "Usuário cadastrado com sucesso.", user: newUser }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Erro durante o cadastro.", erro: err }, { status: 500 });
    }
}