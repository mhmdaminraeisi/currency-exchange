import {
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSource, changeUnit } from "../accounts-slice";
import { RootState } from "../store";
import { currencies, Currency } from "../utils";
import "./cards.scss";

export default function SourceCard() {
    const dispatch = useDispatch();
    const accounts = useSelector((state: RootState) => state.accounts);
    const sourceAccount = accounts.accounts[accounts.source];
    const exchangeRate = accounts.exchangeRate;

    const onCurrencyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const sourceCurrency = event.target.value as Currency;
        updateUnit("0");
        dispatch(changeSource(sourceCurrency));
    };

    const [unit, setUnit] = useState(sourceAccount.unit + "");

    const updateUnit = (value: string) => {
        setUnit(value);
        dispatch(
            changeUnit({ currency: sourceAccount.type, unit: Number(value) })
        );
        if (exchangeRate !== null) {
            const unit = Number(value) * exchangeRate;
            dispatch(
                changeUnit({
                    currency: accounts.destination,
                    unit: Math.round(unit * 100) / 100,
                })
            );
        }
    };
    const onUnitChange = (event: React.ChangeEvent<{ value: string }>) => {
        const value = event.target.value;
        const re = /^\-?[0-9]+(?:\.[0-9]{0,2})?$/g;
        if (value === "" || re.test(value)) {
            updateUnit(value);
        }
    };
    useEffect(() => updateUnit(sourceAccount.unit + ""), [sourceAccount]);

    return (
        <Card className="card source">
            <FormControl className="form" variant="outlined">
                <InputLabel>Currency</InputLabel>
                <Select
                    className="select"
                    value={sourceAccount.type}
                    onChange={onCurrencyChange}
                    label="Currency"
                >
                    {currencies
                        .filter((c) => c !== accounts.destination)
                        .map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                </Select>
                <div className="amount">
                    {sourceAccount.sign + sourceAccount.amount}
                </div>
            </FormControl>
            <TextField
                className="unit-edit"
                variant="filled"
                label="Unit"
                value={unit}
                onChange={onUnitChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Card>
    );
}
