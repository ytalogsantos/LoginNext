import user from "@/models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthController {
    static async login(req, res) {
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Preencha todos campos." });
            }

            const foundUser = await user.findOne({ email: email }).exec();

            if (!foundUser) {
                return res.status(404).json({ message: "Usuário não cadastrado." });
            }

            const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Senha inválida." });
            }

            const token = jwt.sign(
                { id: foundUser._id },
                JWT_SECRET,
                { expiresIn: "5m" }
            );

            return res.status(200).json({
                message: "Login realizado com sucesso.",
                token,
                user: {
                    id: foundUser._id,
                    email: foundUser.email
                }
            });
        } catch (err) {
            return req.res(500).json({ message: `erro ao realizar login ${err.message}` });
        }
    }

    static async register(req, res) {
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Preencha todos os campos." });
            }

            const foundUser = await user.findOne({ email: email }).exec();

            if (foundUser) {
                return res.status(400).json({ message: "Email associado à outro usuário" });
            }

            const newUser = await user.create({ username, email, password });

            return res.status(201).json({ message: "Usuário cadastrado com sucesso." });

        } catch (err) {
            return res.status(500).json({ message: `Erro ao realizar cadastro: ${err.message}` });
        }

    }
}

export default AuthController;