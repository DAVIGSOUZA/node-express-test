import { CreateProduct } from "../types/products";
import { CreatePurchase } from "../types/purchase";
import { CreateUser } from "../types/user";

export const isCreateUserRequestBodyValid = 
  (body: CreateUser): body is CreateUser => {
    return (
      body.email.length > 0 && 
      body.name.length > 0 && 
      body.password.length > 0
    )
  }

export const isCreateProductRequestBodyValid = 
  (body: CreateProduct): body is CreateProduct => {
    return (
      body.name.length > 0 && 
      body.price > 0
    )
  }

export const isCreatePurchaseRequestBodyValid = 
  (body: CreatePurchase): body is CreatePurchase => {
    if (!(body.products.length > 0) || !(body.buyerId > 0)){
      return false
    }

    for (let i = 0; i < body.products.length; i++) {
      const product = body.products[i]

      if (!(product.productId > 0) && !(product.quantity > 0)) {
        return false
      }
    }

    return true
  }