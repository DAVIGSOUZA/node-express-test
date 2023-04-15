import express from "express";

export const productsRouter = express.Router()

productsRouter
  .get('/products', (req, res) => {
    const q = req.query.q as string

    if (q?.length > 0) {
      res.send(`buscou produto com esse termo: ${q}`)
      
      return
    }

    res.send('mostra todos produtos')
  })

  .post('/products/:productId', (req, res) => {
    const body = req.body
    
    // faz coisas pra cadastrar produto
    
    res.status(201).send({message: 'produto cadastrado', data: body})
  })

  .put('/products/:productId', (req, res) => {
    const productId = req.params.productId

    const body = req.body

    // faz coisas para atualizar o produto

    res.send({message: `produto de id ${productId} atualizado`, data: body})
  })
