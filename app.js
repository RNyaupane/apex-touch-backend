import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import authRoute from './routes/authRoute.js';
// import connectDB from './config/db.js';

dotenv.config();
const app = express();

const port = process.env.PORT;

// connectDB();

app.use(express.json());

// Load routes
// app.use('/api/auth',authRoute);
app.use('/api', indexRouter);  



app.listen(port, () => {
    console.log(`Server listing at http://localhost:${port}`);
})

