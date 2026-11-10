import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/specialties", async (req, res) => {
  const data = await prisma.specialty.findMany();
  res.json(data);
});

export default app;
