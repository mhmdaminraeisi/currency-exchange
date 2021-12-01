import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../store";
import "./app.scss";
import DestinationCard from "./destination-card";
import ExchangeButton from "./exchange-button";
import ExchangeRate from "./exchange-rate";
import SourceCard from "./source-card";
import Swap from "./swap";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <div className="container content-center">
                    <div className="cards-container">
                        <SourceCard />
                        <DestinationCard />
                        <ExchangeRate />
                        <Swap />
                    </div>
                    <ExchangeButton />
                </div>
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
