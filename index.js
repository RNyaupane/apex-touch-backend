const express = require('express');
const indexRouter = require('./routes/index.route');
require('dotenv').config();

const app =  express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api', indexRouter); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});