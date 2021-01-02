import express from "express"; 
import cors from "cors";
import bodyParser from "body-parser"; 
import path from "path";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import openSocket from "socket.io";
import http from "http";
import userRouter from "./routes/userRoute.js";
import {createRoomAndJoin,sendMessage,justJoinRoom,setSocketId} from "./controller/eventHandler";




if(process.env.NODE_ENV !== "production")
    {
        dotEnv.config(); 
    }

const app = express(); 
const server = http.createServer(app);
const port = process.env.PORT || 5000; 


export const io = openSocket(server); 



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":true}));
app.use(cors());





/*EXPRESS ROUTES */
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

/**Static files*/

if(process.env.NODE_ENV ==="production")
    {   
        app.use(express.static(path.join(__dirname, "client/build")));

       app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, "client/build" , "index.html"));
        });
    }

//Error Handling
app.use(function (req, res) {
    res.type('json');
    res.status(400).send({errors:res.errors});
  })


const userSendingMsg = {}; 
/**Socket */           

io.on("connect", (socket) => {
    console.log("socket connected");
    socket.on("join", (data) => {
        socket.join(data.roomName);
    })
    
    socket.on("chat", (data) => {
        console.log(data);
        io.in(data.room).emit("chat",data.message);
    });
    socket.on("set-socket-id", (data) => {
        setSocketId(data,socket.id);
    })
    socket.on("join-room",data => {
        const {userId, user2Id} = data; 
        createRoomAndJoin(socket,data, userSendingMsg);
    });

   socket.on("req-join-room", data => {
       console.log("JOIN ROOM REQUESTED");
   })

    socket.on("send-msg", data => {
        sendMessage(data,socket);
    });

    socket.on("just-join-room", data => {
        justJoinRoom(socket,data);
    })
});


/*STARTING APP*/    
server.listen(port , err => {
    if(err)
        {
            throw err; 
        }
     console.log("server running on port ", + 5000);     
});

/*MONGOOSE CONFIG*/
(async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, dbName: "massenger-db"});
    const db = mongoose.connection; 
    db.on("error", err => {
        throw error; 
    });
    }
    catch(error)
        {
            console.log("MONGODB ERROR: ",error);
        }
})();









