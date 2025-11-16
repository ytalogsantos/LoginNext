import AuthController from "@/api/controllers/AuthController";

export async function POST(req) {
    return AuthController.login(req);
}