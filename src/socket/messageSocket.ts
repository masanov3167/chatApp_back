import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export default (io : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket : Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  try {
    socket.on("message", function incoming(message) {
        console.log(message);
        io.emit("answer-message", `${message} ga serverdan javob`)
      });
  } catch (error) {
    console.log(error);
  }
};