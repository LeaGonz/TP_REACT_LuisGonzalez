import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
const app = express();

app.use(express.static("./images"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/menu", async (req, res) => {
  const fileContent = await fs.readFile("./data/menu.json");
  const menuData = JSON.parse(fileContent);
  res.status(200).json({ menu: menuData });
});

app.get("/user-menu", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-menu.json");
  const menu = JSON.parse(fileContent);
  res.status(200).json({ menu });
});

app.get("/users", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);
  res.status(200).json({ users });
});

// ROTAS DO MENU

app.post("/menu", async (req, res) => {
  const fileContent = await fs.readFile("./data/menu.json");
  const menu = JSON.parse(fileContent);

  const newMenu = req.body;
  menu.push(newMenu);

  await fs.writeFile("./data/menu.json", JSON.stringify(menu, null, 2));
  res.status(200).json({ message: "menu criado!" });
});

// app.put("/user-menu", async (req, res) => {
//   const menu = req.body.menu;
//   await fs.writeFile("./data/user-menu.json", JSON.stringify(menu));
//   res.status(200).json({ message: "User places updated!" });
// });


//ROTAS DOS USERS

//Rota de registo
app.post("/signup", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);

  const newUser = req.body;
  users.push(newUser);

  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
  res.status(200).json({ message: "User Inserted!" });
});

//Rota de login (verifica se há user e se sim gera um token)
app.post("/login", async (req, res) => {
  console.log("Login attempt:", req.body);

  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);

  const email = req.body.email;
  const password = req.body.password;

  const login = users.find((u) => u.email === email && u.password === password);

  // Error handling
  if (!login) {
    console.log("Login failed for:", email);
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  console.log("Login OK for:", login.email);

  const AuthUser = {
    firstName: login.firstName,
    lastName: login.lastName,
    email: login.email,
    role: login.role
  };

  res.json(AuthUser);
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});