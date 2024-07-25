import axios from "axios";

export interface DolarAPIRes {
    moneda:             string;
    casa:               string;
    nombre:             string;
    compra:             number;
    venta:              number;
    fechaActualizacion: Date;
}

export const convertUSDToARS = async(usd: number) :Promise<number> => {
    const { data } = await axios.get<DolarAPIRes>(`https://dolarapi.com/v1/dolares/blue`);
    return usd * data.venta;
}

export const getDolarPrice = async() :Promise<number> => {
    const { data } = await axios.get<DolarAPIRes>(`https://dolarapi.com/v1/dolares/blue`);
    return data.venta;
}
