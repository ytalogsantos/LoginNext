import AuthController from "@/api/controllers/AuthController";

export async function POST(req) {
    AuthController.register(req);
}