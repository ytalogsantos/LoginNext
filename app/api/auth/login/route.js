import { NextResponse } from "next/server";
import connectDb from "@/lib/DbConnection";
import User from "@/models/User";


export async function POST(req) {

    await connectDb();

    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Preencha todos os campos." },
                { status: 400 }
            );
        }

        const foundUser = await User.findOne({ email }).select("+password");

        if (!foundUser) {
            return NextResponse.json(
                { message: `User not found` },
                { status: 404 }
            );
        }

        if (foundUser.password !== password) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Login ok", foundUser: { id: foundUser.id, email: foundUser.email } },
            { status: 200 }
        );

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Erro durante o login.", erro: err },
            { status: 500 }
        );
    }
}
