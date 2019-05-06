export interface Order {
  
  _id: string
  name: string
  email: string
  phone: string
  order: [
    {
      _id: string,
      product_id: {
      _id: string,
      price: number,
      title: string
      },
      quantity: number
    }
  ]
  status: string
}