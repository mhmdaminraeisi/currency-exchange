import {
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDestination, changeUnit } from "../accounts-slice";
import { RootState } from "../store";
import { currencies, Currency } from "../utils";
import "./cards.scss";

export default function DestinationCard() {
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts);
    const destinationAccount = accounts.accounts[accounts.destination];

    const onCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const destinationCurrency = event.target.value as Currency;
        dispatch(changeDestination(destinationCurrency));
    };

    return (
        <Card className="card destination">
            <FormControl className="form" variant="outlined">
                <InputLabel>Currency</InputLabel>
                <Select
                    className="select"
                    value={destinationAccount.type}
                    onChange={onCurrencyChange}
                    label="Currency"
                >
                    {currencies
                        .filter((c) => c !== accounts.source)
                        .map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                </Select>
                <div className="amount">
                    {destinationAccount.sign + destinationAccount.amount}
                </div>
            </FormControl>
            <div className="unit-view">{destinationAccount.unit}</div>
        </Card>
    );
}
