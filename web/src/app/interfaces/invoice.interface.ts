export interface Invoice {
  id?: number;
  invoice_id: string;
  amount: number;
  due_on: string;
  sell_price: number;
  updated_at: string;
}
