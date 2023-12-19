import { DefaultEventsMap } from "socket.io/dist/typed-events";
import messageSocket from "./messageSocket";
import { Server } from "socket.io";

export default (io : Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  io.on('connection', (socket) => {
    messageSocket(io, socket)
  })
};