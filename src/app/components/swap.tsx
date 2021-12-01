import { IconButton } from "@material-ui/core";
import { SwapVert as SwapVertIcon } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { refreshUnits, swapCurrencies } from "../accounts-slice";
import "./swap.scss";

export default function Swap() {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(swapCurrencies());
        dispatch(refreshUnits());
    };

    return (
        <IconButton onClick={onClick} className="swap">
            <SwapVertIcon />
        </IconButton>
    );
}
