import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export default (io : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket : Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  try {
      socket.on("message", (msg) => {
        console.log(`Message: ${msg}`);
        io.emit("answer-message", `${msg} ga serverdan javob`);
      });
      socket.on("new-message", (msg) => {
        console.log("Private msg: " , msg)
        io.emit("answer-new-message", `${msg} ga javob serverdan`)
      })
  } catch (error) {
    console.log(error);
  }
};