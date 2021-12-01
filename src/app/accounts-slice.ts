import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account, currencies, Currency } from "./utils";

interface ChangeUnitActionType {
    currency: Currency;
    unit: number;
}

interface ChangeAmountActionType {
    currency: Currency;
    amount: number;
}

const initialState: {
    source: Currency;
    destination: Currency;
    accounts: { [key: string]: Account };
    exchangeRate: number | null;
} = {
    accounts: {
        GBP: { type: "GBP", sign: "£", amount: 1000, unit: 0 },
        EUR: { type: "EUR", sign: "€", amount: 1000, unit: 0 },
        USD: { type: "USD", sign: "$", amount: 1000, unit: 0 },
    },
    source: "EUR",
    destination: "GBP",
    exchangeRate: null,
};

export const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        changeUnit: (state, action: PayloadAction<ChangeUnitActionType>) => {
            state.accounts[action.payload.currency].unit = action.payload.unit;
        },
        changeAmount: (
            state,
            action: PayloadAction<ChangeAmountActionType>
        ) => {
            state.accounts[action.payload.currency].amount +=
                action.payload.amount;
        },
        changeSource: (state, action: PayloadAction<Currency>) => {
            state.source = action.payload;
        },
        changeDestination: (state, action: PayloadAction<Currency>) => {
            state.destination = action.payload;
        },
        changeExchangeRate(state, action: PayloadAction<number | null>) {
            state.exchangeRate = action.payload;
        },
        swapCurrencies(state) {
            [state.destination, state.source] = [state.source, state.destination];
        },
        refreshUnits(state) {
            Object.keys(state.accounts).forEach((k) => state.accounts[k].unit = 0);
        }
    },
});

export const {
    changeAmount,
    changeUnit,
    changeSource,
    changeDestination,
    changeExchangeRate,
    swapCurrencies,
    refreshUnits,
} = accountsSlice.actions;

export default accountsSlice.reducer;
