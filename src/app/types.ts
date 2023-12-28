export type Recipe = {
  ingredient: string;
  price: number;
  itemQuantity: number;
  usedAmount: number;
  priceToCharge?: number;
}

export type Clients = {
  clientName: string;
  amountPaid: number;
  paymentDate: string;
  amountDue: number;
}