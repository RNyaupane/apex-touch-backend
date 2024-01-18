import { DataTypes } from 'sequelize';

import sequelize from './connection.js';



const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING 
    },
    email: {
        type: DataTypes.STRING 
    },
    password: {
        type: DataTypes.STRING 
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}); 

console.log(User === sequelize.models.User);
export default User;
