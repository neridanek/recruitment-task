import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import productsRoutes from "./routes/products";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Developer",
      },
      version: "1.0.0",
    },
    servers: [{ url: `https://localhost:${port}` }],
  },
  apis: [`${path.join(__dirname, "./routes/*.ts")}`],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(productsRoutes);
app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
