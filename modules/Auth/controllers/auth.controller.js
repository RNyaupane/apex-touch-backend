const AuthService = require('../services/auth.service');
const jwtConfig = require('../../../config/jwt.config');
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');
const nodemailer = require("nodemailer");
const mailSender = require("../utils/mail.sender");

exports.register = async (req, res) => {
    const isExist = await AuthService.findUserByEmail(req.body.email);
    if (isExist) {
        return res.status(400).json({
            message: 'Email already exists.'
        });
    }
    
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    var otpCode = Math.floor(100000 + Math.random() * 900000);
    await mailSender.mailSender(otpCode, req.body.email);

    const userData = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phone: req.body.phone,
        otpCode: otpCode,
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
        if (user.is_mail_verified) {
            const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
            if (isMatched) {
                const token = await jwtUtil.createToken({ id: user.id });
                const userData = await AuthService.findUserById(user.id);

                return res.json({
                    message: "Login Success",
                    access_token: token,
                    token_type: 'Bearer',
                    expires_in: jwtConfig.ttl,
                    user: {
                        id: userData.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        fullname: userData.firstName + ' ' + userData.lastName,
                        email: userData.email,
                        phone: userData.phone
                    }
                });
            }
        } else {
            return res.status(406).json({
                message: `Sorry You have not Verifired yoour email Goes to gmial and verifired`,
                email: req.body.email,
            })
        }
    }
    return res.status(400).json({ message: 'Unauthorized.' });
}

exports.otpVerification = async (req, res) => {
    const user = await AuthService.findUserByEmail(req.body.email);
    if (user.otpCode == req.body.otpCode) {
        const updateOtp = await AuthService.verifyOtpByEmail(req.body.email);
        return res.status(200).json({
            status: true,
            message: "Email has been verified through Otp",

        });
    } else {
        return res.status(406).json({
            status: false,
            message: "Otp Doesnot Matched!!!"
        })
    }


    return res.status(200).json({
        message: "hello this is maile verification controller",
    })
}

exports.changePassword = async (req, res) => {
    const user = await AuthService.findUserById(req.user.id);
    const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
    if (isMatched) {
        const hashedPassword = await bcryptUtil.createHash(req.body.new_password);
        await AuthService.updatePasswordById(req.user.id, hashedPassword);
        return res.status(200).json({
            status: true,
            message: "password has been changed successfully"
        });
    } else {
        return res.status(406).json({
            status: false,
            message: "password not matched"
        });
    }


}

exports.sendUserPasswordResetEmail = async(req,res) => {
    const user = await AuthService.findUserByEmail(req.body.email);
    const token = await jwtUtil.createToken({ id:user.id});
    const link = `http://localhost:8000/api/auth/reset/${user.id}/${token}`;
    await mailSender.resetLinkMail(user.email, link);
    
    return res.status(200).json({
        status: true,
        message: "password reset link send successfully!!"
    });
}

exports.updateResetPassword = async(req,res) => {
    const { id, token } = req.params;
    if(id && token){
        const is_valid_token = await jwtUtil.verifyToken(token);
        if(is_valid_token){
            const new_hash_password = await bcryptUtil.createHash(req.body.password);
            await AuthService.updatePasswordById(id,new_hash_password);
        }
    }else{
        console.log('both is required');
    }

    res.status(200).json({
        message: "password reset Successfylly!!!",
    });
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