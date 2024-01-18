// const bcrypt = require('bcrypt');
import bcrypt from "bcrypt";

const compareHash = (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);

const createHash = (plainPassword) => bcrypt.hash(plainPassword, 10);

export default {
    compareHash,
    createHash
}