import { validationResult } from "express-validator";
class AuthController {
    static register = async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        const { name, email, password, password_confirmation } = req.body;
        // const { name } = req.body;

        console.log(name);

        res.send("hello this is register");
    }


    static login = async (req, res) => {
        res.send("hello from the controller");
    }
}

export default AuthController;