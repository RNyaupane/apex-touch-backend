// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config.js';
// const jwtConfig = require('../config/jwt.config');

const verifyToken = (token) => jwt.verify(token, jwtConfig.secret);

const createToken = (data) => jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.ttl });

export default{
    verifyToken,
    createToken
};