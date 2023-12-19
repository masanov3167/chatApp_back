import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ErrorHandle } from "./middleware/ErrorHandle";
import socket from "./socket";
import http from "http";
import ws from "ws"

//express app
const app: Application = express();

//socket
import { createServer } from "http";

//set port number
const PORT = process.env.PORT || 5000;

//import routes
import UserRoutes from "./controller/users/route";
import { CheckUserId } from "./middleware/checkUserId";
//connect
const server = http.createServer(app);
const wss = new ws.Server({ server });
socket(wss)
//cors control
app.use(cors());

//req body parser to json
app.use(express.json());

//use single routes
app.use("/users", UserRoutes);
app.use(CheckUserId);

//error handle middleware
app.use(ErrorHandle);

//404 not found path
app.use("/*", (_: Request, res: Response) =>
  res
    .status(404)
    .json({ ok: false, status: 404, message: `path not found ${_.url}` })
);

server.listen(PORT, () =>{
  console.log(PORT)
});

