import express from "express";
import { db } from '../db'
import { usersTable } from "../db/contants";
import { isCreateUserRequestBodyValid } from "../helpers";

export const userRouter = express.Router()

userRouter
  .get('/users', async(req, res) => {
    try {
      const users = await db(usersTable)

      res.send(users)
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
  
  .post('/users', async(req, res) => {
    try {
      const body = req.body
    
      if (!isCreateUserRequestBodyValid(body)) {
        res.status(400)
        throw new Error("Dados inválidos");
      }
      
      const [userAlreadyExists] = await db(usersTable).where({email: body.email})
      
      if (userAlreadyExists) {
        res.status(400)
        throw new Error("Usuário já cadastrado");  
      }

      const user = await db(usersTable)
        .insert(body)
        .returning(["id", "name", "email", "created_at"])
    
      res.status(201).send({message: 'usuário cadastrado', user })

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
