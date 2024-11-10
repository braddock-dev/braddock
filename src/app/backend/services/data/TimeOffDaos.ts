export interface NewTimeOffRequest {
  startMillis: number;
  endMillis: number;
  reason?: string;
}

export interface TimeOff {
  id: string;
  startMillis: number;
  endMillis: number;
  reason?: string;
}
