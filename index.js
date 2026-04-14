const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./database/database.js")
const logRequest = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');
const articleRoutes = require('./routes/article.route.js');
const userRoutes = require('./routes/user.route.js');

const app = express();
app.use(cors("*"));
app.use(express.json());
const PORT = process.env.PORT || 3000;

connectDB();
app.use(logRequest);
app.use("/api", articleRoutes)
app.use("/api/users", userRoutes)

app.use(errorHandler)
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})