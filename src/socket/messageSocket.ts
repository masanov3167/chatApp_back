import ws from "ws";
import http from "http"

export default (io : ws.Server<typeof ws, typeof http.IncomingMessage>, socket : ws) => {
  try {
    socket.on("message", function incoming(message) {
        console.log(message);
        io.clients.forEach(function each(client) {
          if (client.readyState === ws.OPEN) {
            client.send(`siz yozgan gap: ${message}` );
          }
        });
        // io.emit("salom", ) 
      });
  } catch (error) {
    console.log(error);
  }
};