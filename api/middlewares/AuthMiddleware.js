import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!authHeader) {
        return res.status(401).json({message: "Token de autenticação não fornecido."});
    }

    const [, token] = authHeader.split(" ");

    try {
        const tokenPayload = jwt.verify(token, JWT_SECRET);
        req.user = tokenPayload;
        next();
    } catch (err) {
        return res.status(401).json({message: "Token expirado ou inválido."});
    }
}

export default AuthMiddleware;