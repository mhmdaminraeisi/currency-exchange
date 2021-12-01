import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAmount, refreshUnits } from "../accounts-slice";
import { RootState } from "../store";
import "./exchange-button.scss";

export default function ExchangeButton() {
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts);
    const sourceAccount = accounts.accounts[accounts.source];
    const destinationAccount = accounts.accounts[accounts.destination];

    const onClick = () => {
        dispatch(
            changeAmount({
                currency: sourceAccount.type,
                amount: -sourceAccount.unit,
            })
        );
        dispatch(
            changeAmount({
                currency: destinationAccount.type,
                amount: destinationAccount.unit,
            })
        );
        dispatch(refreshUnits());
    };

    return (
        <Button className="exchange-button" onClick={onClick}>
            Exchange
        </Button>
    );
}
