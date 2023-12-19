import express, { Application, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { ErrorHandle } from "./middleware/ErrorHandle";

const app: Application = express();
const PORT = process.env.PORT || 5000;

import UserRoutes from "./controller/users/route";
import { CheckUserId } from "./middleware/checkUserId";
import socket from "./socket";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/users", UserRoutes);
app.use(CheckUserId);
app.use(ErrorHandle);

// Creating HTTP server
const server = http.createServer(app);

// Integrating Socket.IO with the HTTP server
const io = new Server(server);

// Socket.IO connection handling
socket(io)

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
