import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { log } from "console";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Socket Server is Working Fine 😎");
});

const PORT = 4400;

const server = http.createServer(app);

const io = new Server({
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    log("User Disconnectd", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Socket Server started on POrt: ", PORT);
});
