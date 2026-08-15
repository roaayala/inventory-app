import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use((_req, res, _next) => {
  res.send("<h1>Page not found</h1>");
});

app.use((err, _req, res, _next) => {
  console.log(err);
  res.send("<h1>Internal server error</h1>");
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${PORT}!`);
});
