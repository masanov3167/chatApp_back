import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { findOne, insert } from "../utils/OrmFn";
import Messages from "../entities/message.entity";
import TextMessages from "../entities/text.messages.entity";
import OnlineUsers from "../entities/online.users.entity";

export default (io : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket : Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  try {
      socket.on("new-message", async (msg) => {  
        const {sender_user_id, user_id, text} = JSON.parse(msg);
        const newMessage = await insert(Messages,{sender_user_id, user_id});
        if(newMessage.ok){
          const messageText = await insert(TextMessages, {message_id:newMessage.data.id,text});
          if(messageText.ok){
            const toUser = await findOne(OnlineUsers,{user_id: user_id});
            const message = {
              sender_user_id,
              user_id,
              id: newMessage.data.id,
              date:newMessage.data.date,
              text:messageText.data.text
            }
            if(toUser){
              io.to(socket.id).to(toUser.socket_id).emit("answer-new-message", message)
            }else{
              io.to(socket.id).emit("answer-new-message", message)
            }
          }
        }
      })
      socket.on("new-voice-message", async (msg) => {  
        const message = JSON.parse(msg);
        const user = await findOne(OnlineUsers, {user_id: message.user_id});
        if(user){
          io.to(user.socket_id).emit("answer-new-voice-message", message)
        }
      })
  } catch (error) {
    console.log(error);
  }
};