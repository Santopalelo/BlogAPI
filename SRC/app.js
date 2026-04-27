const express = require('express');
const cors = require('cors');
const logRequest = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');
const articleRoutes = require('./routes/article.route.js');
const userRoutes = require('./routes/user.route.js');

const app = express();
app.use(cors("*"));
app.use(express.json());

app.use(logRequest);
app.use("/api", articleRoutes)
app.use("/api/users", userRoutes)

app.use(errorHandler)


module.exports = app