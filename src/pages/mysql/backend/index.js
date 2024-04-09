import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json("Server is working");
});
app.listen(8000, () => {
  console.log("Server started");
});
