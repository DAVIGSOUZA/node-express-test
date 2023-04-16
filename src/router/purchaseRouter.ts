import express from 'express'
import { isCreatePurchaseRequestBodyValid } from '../helpers'
import { db } from '../db'
import { productsTable, purchaseTable, purchasesProductsTable, usersTable } from '../db/contants'
import { CreatePurchase, PurchaseDB, PurchaseProductDB } from '../types/purchase'
import { Product } from '../types/products'

export const purchaseRouter = express.Router()

purchaseRouter
  .get('/purchase/:purchaseId', async(req, res) => {
    try {
      const purchaseId = req.params.purchaseId
      
      if (isNaN(parseInt(purchaseId))) {
        res.status(404)
        throw new Error("não encontrado");
      }
      
      const [purchase]:PurchaseDB[] = await db(purchaseTable).where({id: purchaseId})
  
      if (!purchase) {
        res.status(404)
        throw new Error("não encontrado");
      }

      const purchaseProducts: PurchaseProductDB[] = await db
        .select(
          `${purchasesProductsTable}.product_id`,
          `${purchasesProductsTable}.quantity`,
          `${productsTable}.name`,
          `${productsTable}.price`,
        )
        .from(purchasesProductsTable)
        .where({purchase_id: purchaseId})
        .innerJoin(
          productsTable,
          `${purchasesProductsTable}.product_id`,
          '=',
          `${productsTable}.id`
        )
  
      const data = {
        ...purchase,
        products: purchaseProducts
      }

      res.send(data)
      
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
  
  .post('/purchase', async(req, res) => {
    try {
      const body: CreatePurchase = req.body
      
      if (!isCreatePurchaseRequestBodyValid(body)) {
        res.status(400)
        throw new Error("Dados inválidos")
      }

      const [userIdExists] = await db(usersTable).where({id: body.buyerId})

      if (!userIdExists) {
        res.status(400)
        throw new Error("Dados inválidos")
      }

      const purchaseProductsIds: number[] = body.products.reduce(
        (products, product) => {
          products.push(product.productId)

          return products
        },
        []
      )

      const productsFromDB: Product[] = await db(productsTable)
        .whereIn('id', purchaseProductsIds)

      if (purchaseProductsIds.length !== productsFromDB.length) {
        res.status(400)
        throw new Error("Dados inválidos")
      }

      let totalPrice = 0

      for (let i = 0; i < productsFromDB.length; i++) {
        const productDB = productsFromDB[i]
        const purchaseProduct = body.products[i]

        totalPrice += productDB.price * purchaseProduct.quantity
      }

      const purchase = {
        buyer_id: body.buyerId,
        total_price: totalPrice,
      }

      const [createdPurchase]:PurchaseDB[] = await db(purchaseTable)
        .insert(purchase)
        .returning("*")

      const purchaseProducts:PurchaseProductDB[] = body.products.map(product => {
        return {
          purchase_id: createdPurchase.id,
          product_id: product.productId,
          quantity: product.quantity
        }
      })

      const insertedProducts:PurchaseProductDB[] = []

      for (let i = 0; i < purchaseProducts.length; i++) {
        const purchaseProduct = purchaseProducts[i]

        const [insertedProduct]:PurchaseProductDB[] = await db(purchasesProductsTable)
          .insert(purchaseProduct)
          .returning('*')
        
        insertedProducts.push(insertedProduct)
      }

      const data = {
        ...createdPurchase,
        products: insertedProducts
      }

      res.send({message: 'compra efetuada', data})
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

  .delete('/purchase/:purchaseId', async(req, res) => {    
    try {
      const purchaseId = req.params.purchaseId
      
      if (isNaN(parseInt(purchaseId))) {
        res.status(404)
        throw new Error("não encontrado");
      }
      
      const [purchase] = await db(purchaseTable).where({id: purchaseId})
  
      if (!purchase) {
        res.status(404)
        throw new Error("não encontrado");
      }

      await db(purchasesProductsTable).del().where({purchase_id: purchaseId})
  
      await db(purchaseTable).del().where({id: purchaseId})
  
      res.sendStatus(200)
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
