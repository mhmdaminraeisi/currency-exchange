import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./accounts-slice";

export const store = configureStore({
    reducer: {
        accounts: accountsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
