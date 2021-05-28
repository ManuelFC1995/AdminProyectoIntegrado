import { Cliente } from "./Cliente";
import { Producto } from "./Producto";

export interface Pedido {
    id?: string | number;
    fecha_compra?: Date;
    importe?: number;
    completado?:boolean;
   nif?:string;
   localidad?:string;
   provincia?:string;
   cp?:string |number;
   calle?:string;
   numero?:number;
   puerta?:string;
   phone?:number;
   metedoPago?:string;
   numero_cuenta?:number;
   nombre_comprador?:string | number ;
   codigo_Comprador?:string;
   email?:string;
   productos?: Producto[];
   comprador:Cliente;
}


