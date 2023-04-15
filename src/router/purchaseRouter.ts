import express from 'express'

export const purchaseRouter = express.Router()

purchaseRouter
  .get('/purchase/:purchaseId', (req, res) => {
    const purchaseId = req.params.purchaseId
    
    // faz coisas para buscar a compra pelo id
    
    res.send(`mostra compra de id ${purchaseId}`)
  })
  
  .post('/purchase', (req, res) => {
    const body = req.body

    // faz coisa pra cadastrar compra, id usuário + produtos + quantidade de cada produto

    res.send({message: 'compra efetuada', data: body})
  })

  .delete('/purchase/:purchaseId', (req, res) => {
    const purchaseId = req.params.purchaseId
    
    // faz coisas para deletar a compra
    
    res.send(`compra de id ${purchaseId} apagada com sucesso`)
  })
