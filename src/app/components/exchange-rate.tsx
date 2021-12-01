import React from "react";
import "./exchange-rate.scss";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { fetchData } from "../tasks";
import { TrendingUp as TrendingUpIcon } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { changeExchangeRate } from "../accounts-slice";

export default function ExchangeRate() {
    const dispatch = useDispatch();
    const source = useSelector((state: RootState) => state.accounts.source);
    const exchangeRate = useSelector((state: RootState) => state.accounts.exchangeRate);
    const destination = useSelector((state: RootState) => state.accounts.destination);

    const { isLoading, isError } = useQuery(
        ["exchange-rate", source, destination],
        async () => await fetchData(source, destination),
        {
            refetchInterval: 5000,
            refetchOnWindowFocus: false,
            onSuccess: (data) => dispatch(changeExchangeRate(data)),
        }
    );

    if (isLoading || isError) {
        dispatch(changeExchangeRate(null));
    }

    return (
        <div className="exchange-rate">
            {isLoading
                ? "Loading ..."
                : isError
                ? "Something went wrong."
                : (<div>
                    <TrendingUpIcon className="icon" />
                    {exchangeRate}
                </div>)}
        </div>
    );
}
