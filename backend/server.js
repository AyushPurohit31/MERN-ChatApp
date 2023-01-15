const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./Data/data");
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config()
const app = express();
app.use(cors());

connectDB();

app.use(express.json());//to accept json data from frontend

app.get("/", (req,res)=>{
    res.send("API is running");
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use(notFound);
app.use(errorHandler)

const Port = process.env.PORT || 5000;

app.listen(Port , console.log("App is running at port " + Port));