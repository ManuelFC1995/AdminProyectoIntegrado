import { Pedido } from "./Pedido";

export interface Producto {
    id?: string | number;
    name?: string;
    id_producto?: number;
    talla?: string;
    descripcion?: string;
    categoria?: string;
    categoria2?: string;
    sexo?: boolean;
    precio?: number;
    imagene1?: string;
    imagene2?: string;
    imagene3?: string;
    unidades?:number;
    Pedido?: Pedido;
    vendidos?:number;
}
