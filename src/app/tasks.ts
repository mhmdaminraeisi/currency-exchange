import Axios from "axios";
import { Currency } from "./utils";

const axios = Axios.create({
    baseURL: "https://freecurrencyapi.net/api/v2/",
});

export async function fetchData(source: Currency, destination: Currency) {
    const res = await axios.request<Response>({
        method: "GET",
        url: "/latest",
        params: {
            apikey: "2ad16510-5298-11ec-b0bf-3931412177b0",
            base_currency: source,
        },
    });
    return res.data.data[destination];
}

interface Response {
    data: {[key: string]: number};
}
