export type Currency = "USD" | "GBP" | "EUR";

export const currencies: Currency[] = ["USD", "GBP", "EUR"];

export interface Account {
    type: Currency;
    sign: string;
    amount: number;
    unit: number;
}
