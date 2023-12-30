import { DefaultEventsMap } from "socket.io/dist/typed-events";
import messageSocket from "./messageSocket";
import { Server } from "socket.io";
import { destroyer, findOne, insert } from "../utils/OrmFn";
import OnlineUsers from "../entities/online.users.entity";
import { decoderToken } from "../utils/functions";

export default (io : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  io.on('connection', (socket) => {
    (async() =>{
      let token = socket.handshake.auth?.token["_j"];
      console.log(token);
      
      if(!token){
        socket.emit("exit");
      }else{
        const decodedUser = decoderToken(token);
        console.log("token " + token);
        
        console.log("decode " + JSON.stringify(decodedUser));
        console.log("decode1 " + decodedUser[1]);
        console.log("decode0 " + decodedUser[0]);
        
        
        if(decodedUser){
          const user = await findOne(OnlineUsers,{socket_id: socket.id});
          console.log(user);
          console.log(socket.id);
          
          
          if(!user){
            await insert(OnlineUsers,{socket_id: socket.id, user_id: decodedUser.id})
          }
        }
      }
    })()
    messageSocket(io, socket)

    socket.on("disconnect", () =>{
      (async() =>{
        await destroyer(OnlineUsers,{socket_id: socket.id})
      })()
    })
  })
};