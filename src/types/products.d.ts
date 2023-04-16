export type Product = {
  id: number
  name: string
  price: number
  description: string
  img_url: string
}

export type CreateProduct = Omit<Product, 'id'>