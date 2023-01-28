const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config()
const app = express();
app.use(cors());

connectDB();

app.use(express.json());//to accept json data from frontend

// app.get("/", (req,res)=>{
//     res.send("API is running");
// })

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


app.use(notFound);
app.use(errorHandler)

const Port = process.env.PORT || 5000;

const server = app.listen(Port , console.log("App is running at port " + Port));

const io = require("socket.io")(server,{
    pingtimeout : 60000,
    cors : {
        origin : "http://localhost:3000",
    }
});

io.on("connection", (socket)=>{
    console.log("connected to socket.io")

    socket.on("setup", (userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on("join chat", (room)=>{
        socket.join(room);
        console.log("user joined room "+room);
    });

    socket.on("typing", (room)=>{
        socket.in(room).emit("typing");
    })

    socket.on("stop typing", (room)=>{
        socket.in(room).emit("stop typing");
    })

    socket.on("new message", (newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;

        if(!chat.users){
            return console.log("chat.users not defined");
        }

        chat.users.forEach(user => {
            if(user._id==newMessageRecieved.sender._id)return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
})