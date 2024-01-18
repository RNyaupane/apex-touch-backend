import {Sequelize} from 'sequelize';
import config from '../config/database.config.js'


// const sequelize = new Sequelize(config.database, config.username, config.password, {
const sequelize = new Sequelize('apexhub', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false
});  

export default sequelize;