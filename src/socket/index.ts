import { DefaultEventsMap } from "socket.io/dist/typed-events";
import messageSocket from "./messageSocket";
import { Server } from "socket.io";
import { destroyer, findAll, findOne, insert, update } from "../utils/OrmFn";
import OnlineUsers from "../entities/online.users.entity";
import { decoderToken } from "../utils/functions";

export default (io : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  io.on('connection', (socket) => {
    
    (async() =>{
      
      
      let token = socket.handshake.auth?.token["_j"];      
      if(!token){
        socket.emit("exit");
      }else{
        const decodedUser = decoderToken(token);
        if(decodedUser){
          const user = await findOne(OnlineUsers,{socket_id: socket.id});          
          if(!user){
            await insert(OnlineUsers,{socket_id: socket.id, user_id: decodedUser.id})
          }else{
            await update(OnlineUsers,{user_id: decodedUser.id}, {socket_id: socket.id})
          }
        }
      }
    })();
    console.log("connection bo'ldi ", socket.id);
    
    messageSocket(io, socket)

    socket.on("disconnect", () =>{   
      console.log("disconnect bo'ldi", socket.id);
         
      (async() =>{
       await destroyer(OnlineUsers, {socket_id: socket.id})
      })()
    })
  })
};