
import AuthService from "../services/auth.service.js";
import jwtConfig from "../config/jwt.config.js";
import bcryptUtil from "../utils/bcrypt.util.js";
import jwtUtil from "../utils/jwt.util.js";

const register = async (req, res) => { 
    const isExist = await AuthService.findUserByEmail(req.body.email);
    if(isExist) {
        return res.status(400).json({ 
            message: 'Email already exists.' 
        });
    }
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
    const user = await AuthService.createUser(userData);
    return res.json({
        data: user,
        message: 'User registered successfully.'
    });
}

const login = async (req, res) => { 
    const user = await AuthService.findUserByEmail(req.body.email); 
    if (user) {
        const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        if (isMatched) {
            const token = await jwtUtil.createToken({ id: user.id });
            return res.json({
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl
            });
        }
    }
    return res.status(400).json({ message: 'Unauthorized.' });
}

const getUser = async (req, res) => {
    const user = await AuthService.findUserById(req.user.id);  
    return res.json({
        data: user,
        message: 'Success.'
    });
}

const logout = async (req, res) => {    
    await AuthService.logoutUser(req.token, req.user.exp);  
    return res.json({ message: 'Logged out successfully.' });
}

export default{
    register,
    login,
    getUser,
    logout
};