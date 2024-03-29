import express from "express";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors())

const usersList = [{ name: "DJ", password: "dj123" }];
const PORT = 4000;
const secret_token =
  "1fbeeba89902cb37d289476395de60c062cdab02c385a093dba6dd9fbe3d424faacc02a6acc7fd69265960daa9ef2581c52991a6b0c2b62787f0a06b788a1804";
const refresh_token =
  "55877686f0fea25e0f1b1b633a1aeef552027779a0c6aaaed9dc3d8703aca9064058c760edf7e878605e2529ca3385f245296efa29a2a95d09dfd3e1d4a8c69c";

// Server Started
app.get("/", (req, res) => {
  res.status(200).json("Server started on Port :=> " + PORT);
});

// Health
app.get("/health", (req, res) => {
  res.send("health is good ❤️❤️❤️👌👌👌⭕✔️");
});

let refreshTokensList = [];

// Token
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(400).json("No refresh token");

  if (!refreshTokensList.includes(refreshToken))
    return res.status(403).json("Token not in List");

  jwt.verify(refreshToken, secret_token, (error, res) => {
    if (error) return res.status(400).json(error);
    const accessToken = getAccesstToken({ name: user.name });
    res.json({ access_token: accessToken });
  });
});

// Delete
app.delete("/logout", (req, res) => {
  refreshTokensList.filter((token) => token != req.body.token);
  res.statusCode(200).json("Deleted Token");
});

function getAccesstToken(user) {
  return jwt.sign(user, secret_token, { expiresIn: "10s" });
}

// Get Users
app.get("/users", (req, res) => {
  res.send(usersList);
});

// Register User
app.post("/register", async (req, res) => {
  try {
    const hashedPassord = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassord };
    usersList.push(user);
    res.status(200).json("Registrtation SuccessFull");
  } catch (error) {
    res.status(400).json(error);
  }
});

// Login
app.post("/login", async (req, res) => {
  // Authinticate user

  const user = usersList.find((user) => user.name === req.body.name);
  if (user == null) return res.status(401).json("User not Found");

  try {
    await bcrypt.compare(user.password, req.body.password);
    res.status(200).json("Login Successfull");
  } catch (error) {
    res.status(400).json("Unable to Login");
  }

  const access_token = getAccesstToken(user);
  const refersh_token = jwt.sign(user, secret_token);
  refreshTokensList.push(refersh_token);

  res.json({ accessToken: access_token, refreshToken: refersh_token });
});

// Main
app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
});
