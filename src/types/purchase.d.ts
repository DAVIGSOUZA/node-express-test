export type PurchaseProduct = {
  productId: number
  quantity: number
}

export type CreatePurchase = {
  buyerId: number
  products: PurchaseProduct[]
}

export type PurchaseDB = {
  id: number
  buyer_id: number
  total_price: number
  paid: number
  created_at: string
}

export type PurchaseProductDB = {
  purchase_id: number
  product_id: number
  quantity: number
}