import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log("app ready on http://localhost:3003");
})

// GET ALL USERS
app.get('/users', (req, res) => res.send('é pra retornar todos usuários'))

// CREATE USER
app.post('/users', (req, res) => {
  const body = req.body

  // faz coisas pra cadastrar usuário

  res.status(201).send({message: 'usuário cadastrado', data: body})
})

// CREATE PRODUCT
app.post('/products', (req, res) => {
  const body = req.body
  
  // faz coisas pra cadastrar produto
  
  res.status(201).send({message: 'produto cadastrado', data: body})
})

// GET ALL PRODUCTS and SEARCH PRODUCTS
app.get('/products', (req, res) => {
  const q = req.query.q as string

  if (q?.length > 0) {
    res.send(`buscou produto com esse termo: ${q}`)
    
    return
  }

  res.send('mostra todos produtos')
})

// UPDATE PRODUCT BY ID
app.put('/products/:productId', (req, res) => {
  const productId = req.params.productId

  const body = req.body

  // faz coisas para atualizar o produto

  res.send({message: `produto de id ${productId} atualizado`, data: body})
})

// CREATE PURCHASE
app.post('/purchase', (req, res) => {
  const body = req.body

  // faz coisa pra cadastrar compra, id usuário + produtos + quantidade de cada produto

  res.send({message: 'compra efetuada', data: body})
})

// DELETE PURCHASE BY ID
app.delete('/purchase/:purchaseId', (req, res) => {
  const purchaseId = req.params.purchaseId
  
  // faz coisas para deletar a compra
  
  res.send(`compra de id ${purchaseId} apagada com sucesso`)
})

// GET PURCHASE BY ID
app.get('/purchase/:purchaseId', (req, res) => {
  const purchaseId = req.params.purchaseId
  
  // faz coisas para buscar a compra pelo id
  
  res.send(`mostra compra de id ${purchaseId}`)
})