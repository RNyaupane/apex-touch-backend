
// import mysql from 'mysql';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectDB = async () => {
//     try {
//         const connection = mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME,
//         });
        
//         connection.connect((err) => {
//             if(err){
//                 console.error('Eroor occor during connnection: ', err);
//                 return;
//             }
//             console.log("databse connected successfully");
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   export default connectDB