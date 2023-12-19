import messageSocket from "./messageSocket";
import ws from "ws";
import http from "http"

export default (io : ws.Server<typeof ws, typeof http.IncomingMessage>) => {
  io.on('connection', (socket) => {
    messageSocket(io, socket)
  })
};