export interface Investment {
  id: string;
  asset: string;
  type: string;
  amount: number;
  gainLoss: number;
  purchaseDate: string;
}

export interface TimePoint {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
