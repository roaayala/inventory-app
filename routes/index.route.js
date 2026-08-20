import { Router } from "express";

const indexRoute = Router();

indexRoute.get("/", (req, res) => {
  res.send("Hello");
});

export default indexRoute;
