import express from "express";
import { isCreateProductRequestBodyValid } from "../helpers";
import { productsTable } from "../db/contants";
import { db } from "../db"
import { CreateProduct, Product } from "../types/products";

export const productsRouter = express.Router()

productsRouter
  .get('/products', async(req, res) => {
    try {
      const q = req.query.q as string
  
      let products = []

      if (q?.length > 0) {
        products = await db(productsTable).whereLike('name', `%${q}%`)
      } else {
        products = await db(productsTable)
      }
      
      if (products.length) {
        res.send(products)
      }

      res.send(`Produto não encontrado`)

    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) res.status(500)

      if (error instanceof Error) res.send(error.message)
      else res.send("Erro inesperado")
    }
  })

  .post('/products', async(req, res) => {
    try {
      const body = req.body
      
      if (!isCreateProductRequestBodyValid(body)) {
        res.status(400)
        throw new Error("Dados inválidos")
      }

      const [productAlreadyExists] = await db(productsTable).where({name: body.name})

      if (productAlreadyExists) {
        res.status(400)
        throw new Error("Produto já cadastrado")
      }

      const product = await db(productsTable).insert(body).returning("*")
      
      res.status(201).send({message: 'produto cadastrado', product})

    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }
  })

  .put('/products/:productId', async(req, res) => {
    try {
      const productId = req.params.productId

      if (isNaN(parseInt(productId))) {
        res.status(404)
        throw new Error("Produto não encontrado");
      }

      const [product]:Product[] = await db(productsTable).where({id: productId})
  
      if (!product) {
        res.status(404)
        throw new Error("Produto não encontrado");
      }

      const body:Partial<Product> = req.body

      const newProduct: CreateProduct = {
        name: body.name ?? product.name,
        price: body.price ?? product.price,
        description: body.description ?? product.description,
        img_url: body.img_url ?? product.img_url
      }

      const updatedProduct = await db(productsTable)
        .update(newProduct)
        .where({id: productId})
        .returning("*")

      res.send({message: `produto atualizado`, updatedProduct})

    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) res.status(500)

      if (error instanceof Error) res.send(error.message)
      else res.send("Erro inesperado")
    }
  })
