import user from "@/api/models/User.js";
import bcrypt from "bcryptjs";

class AuthController {
    static async login(req) {
        try {
            const { email, password } = await req.json();

            if (!email || !password) {
                return Response.json({ message: "Preencha todos campos." }, {status: 400});
            }

            const foundUser = await user.findOne({ email: email }).exec();

            if (!foundUser) {
                return Response.json({ message: "Usuário não cadastrado." }, {status: 404});
            }

            const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

            if (!isPasswordCorrect) {
                return Response.json({ message: "Senha inválida." }), {status: 401};
            }

            return Response.json({message: "Login realizado com sucesso."});
        } catch (err) {
            return Response.json({ message: `erro ao realizar login ${err.message}`, status: 500});
        }
    }

    static async register(req) {
        try {
            const { email, password } = await req.json();

            if (!email || !password) {
                return Response.json({ message: "Preencha todos os campos.", status: 400 });
            }

            const foundUser = await user.findOne({ email: email }).exec();

            if (foundUser) {
                return Response.json({ message: "Email associado à outro usuário", status: 400 });
            }

            await user.create({ username, email, password });

            return Response.json({ message: "Usuário cadastrado com sucesso.", status: 200 });

        } catch (err) {
            return Response.json({ message: `Erro ao realizar cadastro: ${err.message}`, status: 500 });
        }

    }
}

export default AuthController;