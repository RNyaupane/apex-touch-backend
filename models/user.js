'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    otpCode: DataTypes.INTEGER,
    is_mail_verified:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull:false
    },
    is_active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull:false
    },
    role : {
      type : DataTypes.ENUM,
      values : ['admin','super_admin', 'user'],
      defaultValue: "user"
    }
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};