import express from "express"
import cors from "cors"
import { productsRouter, purchaseRouter, userRouter } from "./router";

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', userRouter, purchaseRouter, productsRouter)

app.listen(3003, () => {
  console.log("app ready on http://localhost:3003");
})