require("dotenv").config()

const app = require("./SRC/app");
const connectDB = require("./SRC/config/connectDB");
connectDB();

const PORT=process.env.PORT||3000;
app.listen(PORT, async()=>{
    console.log(`Server is running on port ${PORT}`);
})