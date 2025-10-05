import express from "express";
import { PrismaClient } from "@prisma/client";
import { API_CONFIG } from "./config";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch(error){
    res.status(500).json({error: "Error al consultar DB de productos"})
  }
})

app.post("/products", async (req, res) => {
  const {name, price, description, image} = req.body;
  try {
    const new_product = await prisma.product.create({
      data: {name, price, description, image}
    });
    res.json(new_product);
  } catch(error){
    res.status(400).json({error : "Error al crear el producto"})
  }
})

app.listen(API_CONFIG.PORT, () => {
  console.log(`🚀 Servidor corriendo en ${API_CONFIG.BASE_URL}`);
});