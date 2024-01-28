const AuthService = require('../services/auth.service');
const jwtConfig = require('../../../config/jwt.config');
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');

exports.register = async (req, res) => { 
    const isExist = await AuthService.findUserByEmail(req.body.email);
    if(isExist) {
        return res.status(400).json({ 
            message: 'Email already exists.' 
        });
    }
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    const userData = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword
    }
    const user = await AuthService.createUser(userData);
    return res.json({
        data: user,
        message: 'User registered successfully.'
    });
}

exports.login = async (req, res) => { 
    const user = await AuthService.findUserByEmail(req.body.email); 
    if (user) {
        const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
        if (isMatched) {
            const token = await jwtUtil.createToken({ id: user.id });
            const userData = await AuthService.findUserById(user.id);
           
            return res.json({
                message: "Login Success",
                access_token: token,
                token_type: 'Bearer',
                expires_in: jwtConfig.ttl,
                user : {
                    id : userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    fullname: userData.firstName+' '+ userData.lastName,
                    email: userData.email,
                    phone: userData.phone
                }
            });
        }
    }
    return res.status(400).json({ message: 'Unauthorized.' });
}

exports.getUser = async (req, res) => {
    const user = await AuthService.findUserById(req.user.id);  
    return res.json({
        data: user,
        message: 'Success.'
    });
}

exports.logout = async (req, res) => {    
    await AuthService.logoutUser(req.token, req.user.exp);  
    return res.json({ message: 'Logged out successfully.' });
}