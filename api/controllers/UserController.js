import user from "@/models/User.js";

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await user.find({});
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({message: `${err.message}`});
        }
    }
}