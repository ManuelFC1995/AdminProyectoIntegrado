import { Pedido } from "./Pedido";

export interface Cliente {
    id?: string | number;
    name?: string;
    surname?: string;
    email?: string;
    
    pedidos?: Pedido[];
}