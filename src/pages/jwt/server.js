import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const PORT = 8000;
const secret_token =
  "1fbeeba89902cb37d289476395de60c062cdab02c385a093dba6dd9fbe3d424faacc02a6acc7fd69265960daa9ef2581c52991a6b0c2b62787f0a06b788a1804";
const refresh_token =
  "55877686f0fea25e0f1b1b633a1aeef552027779a0c6aaaed9dc3d8703aca9064058c760edf7e878605e2529ca3385f245296efa29a2a95d09dfd3e1d4a8c69c";

const posts = [
  {
    username: "kyle",
    message: "Kyle is here",
  },
  {
    username: "sam",
    message: "sam is here",
  },
];

app.get("/",(req,res) => {
  res.status(200).json("Server started on Port :=> " + PORT)
})
app.get("/health", (req, res) => {
  res.send("health is good 🤍🤍🤍");
});

// middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.status(401).json("No Token");

  jwt.verify(token, secret_token, (error, user) => {
    if (error) return res.status(403).json(error);
    req.user = user;
  });
  next();
};

app.get("/post", authenticate, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});


app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});
