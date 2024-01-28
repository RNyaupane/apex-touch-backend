const { User } = require('../../../models');
const cacheUtil = require('../utils/cache.util');

exports.createUser = (user) => {
    return User.create(user);
}

exports.findUserByEmail = (email) => {
    return User.findOne({
        where: {
            email: email
        }
    })
}
exports.verifyOtpByEmail = (email) => {
    return User.update({ is_mail_verified: true }, {
        where : {
            email: email,
        },
    });
}

exports.updatePasswordById = (id, new_password) => {
    return User.update({ password: new_password }, {
        where : {
            id: id,
        },
    });
}

exports.findUserById = (id) => {
    return User.findByPk(id);
}

exports.logoutUser = (token, exp) => {
    const now = new Date();
    const expire = new Date(exp * 1000);
    const milliseconds = expire.getTime() - now.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    return cacheUtil.set(token, token, milliseconds);
}