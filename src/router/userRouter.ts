import express from "express";

export const userRouter = express.Router()

userRouter
  .get('/users', (req, res) => res.send('é pra retornar todos usuários'))
  .post('/users', (req, res) => {
    const body = req.body
  
    // faz coisas pra cadastrar usuário
  
    res.status(201).send({message: 'usuário cadastrado', data: body})
  })
