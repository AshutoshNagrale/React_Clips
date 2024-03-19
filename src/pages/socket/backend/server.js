import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json("Server is Working Fine 😎");
});

const PORT = 4400;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("Server started on POrt: ", PORT);
});
