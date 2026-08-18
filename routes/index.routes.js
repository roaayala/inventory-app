import { Router } from "express";

const indexRoutes = Router();

indexRoutes.get("/", (req, res) => {
  res.send("Hello");
});

export default indexRoutes;
