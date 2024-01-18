// const UserModel = require('../models/user.model');
// const cacheUtil = require('../utils/cache.util');
import UserModel from '../models/user.model.js';
import cacheUtil from "../utils/cache.util.js";

const createUser = (user) => {
    return UserModel.create(user);
}

const findUserByEmail = (email) => {
    return UserModel.findOne({
        where: {
            email: email
        }
    })
}

const findUserById = (id) => {
    return UserModel.findByPk(id);
}

const logoutUser = (token, exp) => {
    const now = new Date();
    const expire = new Date(exp * 1000);
    const milliseconds = expire.getTime() - now.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    return cacheUtil.set(token, token, milliseconds);
}

export default {
    createUser,
    findUserByEmail,
    findUserById,
    logoutUser
};