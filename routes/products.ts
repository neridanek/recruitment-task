import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { validation } from "../middlewares/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidation";

const prisma = new PrismaClient();
const router: Router = express.Router();

/**
 * @swagger
 * paths:
 *  /products:
 *    get:
 *      summary: get all products
 *      tags: [Products]
 *      responses:
 *        200:
 *          description: A sucessful response,
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  price:
 *                    type: number
 *                  updateDate:
 *                    type: string
 *                    format: date-time
 *
 */
router.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (err: any) {
    return res.status(400).json(err);
  }
});

/**
 * @swagger
 * paths:
 *  /product/:id:
 *    get:
 *      summary: get current product
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *           type: string
 *          required: true
 *      responses:
 *        200:
 *          description: A sucessful response,
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  price:
 *                    type: number
 *                  updateDate:
 *                    type: string
 *                    format: date-time
 *
 */
router.get("/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    return res.status(200).json(product);
  } catch (err: any) {
    const {
      meta: { cause },
    } = err;
    res.status(400).send(cause);
  }
});

/**
 * @swagger
 * paths:
 *  /product:
 *    post:
 *      summary: create current product
 *      tags: [Products]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  required: true
 *                price:
 *                  type: number
 *                  required: true
 *                updateDate:
 *                    type: string
 *                    format: date-time
 *
 */
router.post(
  "/product",
  validation(createProductSchema),
  async (req: Request, res: Response) => {
    const { name, price, updateDate } = req.body;
    try {
      const product = await prisma.product.create({
        data: {
          name: name,
          price: price,
          updateDate: updateDate,
        },
      });
      if (product) res.status(200).send("product created");
    } catch (err: any) {
      const {
        meta: { cause },
      } = err;
      res.status(400).send(cause);
    }
  }
);

/**
 * @swagger
 * paths:
 *  /product:
 *    put:
 *      summary: update current product
 *      tags: [Products]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  required: true
 *                name:
 *                  type: string
 *                  required: true
 *                price:
 *                  type: number
 *                  required: true
 *                updateDate:
 *                    type: string
 *                    format: date-time
 *
 */
router.put(
  "/product",
  validation(updateProductSchema),
  async (req: Request, res: Response) => {
    const { id, name, price, updateDate } = req.body;
    try {
      const product = await prisma.product.update({
        where: { id: id },
        data: {
          name: name,
          price: price,
          updateDate: updateDate,
        },
      });
      if (product) res.status(200).send("product updated");
    } catch (err: any) {
      const {
        meta: { cause },
      } = err;
      res.status(400).send(cause);
    }
  }
);

/**
 * @swagger
 * paths:
 *  /product/:id:
 *    delete:
 *      summary: delete current product
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *
 */
router.delete("/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { id: id },
    });
    if (product) res.status(200).send("product deleted");
  } catch (err: any) {
    const {
      meta: { cause },
    } = err;
    res.status(400).send(cause);
  }
});

export default router;
