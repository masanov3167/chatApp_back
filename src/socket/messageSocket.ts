import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { insert } from "../utils/OrmFn";
import Messages from "../entities/message.entity";
import TextMessages from "../entities/text.messages.entity";

export default (io : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket : Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  try {
      socket.on("message", (msg) => {
        console.log(`Message: ${msg}`);
        io.emit("answer-message", `${msg} ga serverdan javob`);
      });
      socket.on("new-message", async (msg) => {
        const {sender_user_id, user_id, text} = JSON.parse(msg);
        const newMessage = await insert(Messages,{sender_user_id, user_id});
        if(newMessage.ok){
          const messageText = await insert(TextMessages, {message_id:newMessage.data.id,text});
          if(messageText.ok){
            io.emit("answer-new-message", {
              sender_user_id,user_id,id: newMessage.data.id,date:newMessage.data.date, text:messageText.data.text
            })
          }
        }
      })
  } catch (error) {
    console.log(error);
  }
};