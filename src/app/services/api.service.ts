import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../environments/environment';
import { Cliente } from '../model/Cliente';
import { Pedido } from '../model/Pedido';
import { Producto } from '../model/Producto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HTTP) { }

    /**
   * 
   * @param id is no está presenta realizará un getAll -> http://localhost:8080/Users
   * , si existe realizará una selección por ID -> http://localhost:8080/Users/id
   */
     public getProducto(id?:number | string): Promise<Producto[] | Producto |null> {
      return new Promise((resolve, reject) => {
        let endpoint = environment.endpoint + environment.apiProductos;
        if(id){
          endpoint+=id;
        }
        this.http
          .get(endpoint, {}, this.header)
          .then(d => {
            if(d) {
              resolve(JSON.parse(d.data));
            }else {
              resolve(null);
            }
          })
          .catch(err => reject(err));
      });
    }
  
    /**
* Metodo que devuelve un producto introduciendo su id 



* @param  id  id del producto que se va a buscar
* @param  endpoint ruta para la peticion http
* @return devuelve un producto

*/
    public getProductoId(id?:number | string): Promise< Producto |null> {
      return new Promise((resolve, reject) => {
        let endpoint = environment.endpoint + environment.apiProductos;
     
          endpoint+=id;
        
        this.http
          .get(endpoint, {}, this.header)
          .then(d => {
            if(d) {
              resolve(JSON.parse(d.data));
            }else {
              resolve(null);
            }
          })
          .catch(err => reject(err));
      });
    }
/*

    public getProductoPaginados(index?:number | string): Promise< Producto[] |null> {
      return new Promise((resolve, reject) => {
        let endpoint = environment.endpoint + environment.apiProductosPaginados;
     
          endpoint+=index;
        
        this.http
          .get(endpoint, {}, this.header)
          .then(d => {
            if(d) {
              resolve(JSON.parse(d.data));
            }else {
              resolve(null);
            }
          })
          .catch(err => reject(err));
      });
    }

*/


    /**
* Metodo que devuelve todos los productos de la base de datos

* @param  endpoint ruta para la peticion http
* @return devuelve una lista de productos

*/
    public getProductall(): Promise<Producto[]  |null> {
      return new Promise((resolve, reject) => {
        let endpoint = environment.endpoint + environment.apiProductos;
       
        this.http
          .get(endpoint, {}, this.header)
          .then(d => {
            if(d) {
              resolve(JSON.parse(d.data));
            }else {
              resolve(null);
            }
          })
          .catch(err => reject(err));
      });
    }
    /**
     * 
     * @param value el criterio de búsqueda por nombre -> http://localhost:8080/Users/search/value
     */
    public searchByName(value: string): Promise<Producto[] | Producto| null>  {
      return this.getProducto('search/' + value);
    }
  
      /**
* Metodo que elimina un producto de la base de datos


* @param  producto   producto que se va a eliminar
* @param  endpoint ruta para la peticion http


*/

    public removeProducto(Producto: any): Promise<void> {
      const id: any = Producto.id ? Producto.id : Producto;
      const endpoint = environment.endpoint + environment.apiProductos + id;
      return new Promise((resolve, reject) => {
        this.http
          .delete(endpoint, {}, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      });
    }
  
        /**
* Metodo que inserta un producto nuevo en la base de datos

* @param  item   producto que se va a insertar
* @param  endpoint ruta para la peticion http

*/
    public createProducto(item: Producto): Promise<void> {
      const endpoint = environment.endpoint + environment.apiProductos;
      return new Promise((resolve, reject) => {
        if (item) {
          this.http.setDataSerializer('json'); //send body as json, needed
          this.http
            .post(endpoint, item, this.header)
            .then(d => {
              resolve();
            })
            .catch(err => reject(err));
        } else {
          reject('No existe item');
        }
      });
    }


            /**
* Metodo que actualiza un producto en la base de datos

* @param  item   producto que se va a actualizar
* @param  endpoint ruta para la peticion http

*/
    public updateProducto(item: Producto): Promise<void> {
      const endpoint = environment.endpoint + environment.apiProductos;
      return new Promise((resolve, reject) => {
        if (item) {
          this.http.setDataSerializer('json'); //send body as json, needed
          this.http
            .put(endpoint, item, this.header)
            .then(d => {
              resolve();
            })
            .catch(err => reject(err));
        } else {
          reject('No existe item');
        }
      });
    }

    /**
* Metodo que devuelve los clientes de la base de datos ó solo un cliente si introduces el id 

* @param  id  id del cliente que se va a buscar
* @param  endpoint ruta para la peticion http
* @return devuelve una lista de clientes, un cliente o null

*/
    public getUser(id?:number | string): Promise<Cliente[] | Cliente |null> {
      return new Promise((resolve, reject) => {
        let endpoint = environment.endpoint + environment.apiUsers;
        if(id){
          endpoint+=id;
        }
        this.http
          .get(endpoint, {}, this.header)
          .then(d => {
            if(d) {
              resolve(JSON.parse(d.data));
            }else {
              resolve(null);
            }
          })
          .catch(err => reject(err));
      });
    }
  
    /**
* Metodo que devuelve  un cliente si introduces el id 

* @param  id  id del cliente que se va a buscar
* @param  endpoint ruta para la peticion http
* @return devuelve un cliente

*/
    public getUserId(id?:number | string): Promise< Cliente |null> {
      return new Promise((resolve, reject) => {
        let endpoint = environment.endpoint + environment.apiUsers;
     
          endpoint+=id;
        
        this.http
          .get(endpoint, {}, this.header)
          .then(d => {
            if(d) {
              resolve(JSON.parse(d.data));
            }else {
              resolve(null);
            }
          })
          .catch(err => reject(err));
      });
    }

    
    /**
* Metodo que devuelve los clientes de la base de datos

* @param  endpoint ruta para la peticion http
* @return devuelve una lista de clientes

*/
    public getUserall(): Promise<Cliente[]  |null> {
      return new Promise((resolve, reject) => {
        let endpoint = environment.endpoint + environment.apiUsers;
       
        this.http
          .get(endpoint, {}, this.header)
          .then(d => {
            if(d) {
              resolve(JSON.parse(d.data));
            }else {
              resolve(null);
            }
          })
          .catch(err => reject(err));
      });
    }
    /**
     * 
     * @param value el criterio de búsqueda por nombre -> http://localhost:8080/Users/search/value
     */
    public searchClientByName(value: string): Promise<Cliente[] | Cliente| null>  {
      return this.getUser('search/' + value);
    }
  
  
      /**
     * 
     * @param item es un número -> id, item -> item.id
     */

       
      /**
* Metodo que elimina un cliente de la base de datos

* @param  User   cliente que se va a eliminar
* @param  endpoint ruta para la peticion http

*/
    public removeCliente(User: any): Promise<void> {
      const id: any = User.id ? User.id : User;
      const endpoint = environment.endpoint + environment.apiUsers + id;
      return new Promise((resolve, reject) => {
        this.http
          .delete(endpoint, {}, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      });
    }
        /**
* Metodo que inserta un cliente nuevo en la base de datos

* @param  item   cliente que se va a insertar
* @param  endpoint ruta para la peticion http

*/
    public createUser(item: Cliente): Promise<void> {
      const endpoint = environment.endpoint + environment.apiUsers;
      return new Promise((resolve, reject) => {
        if (item) {
          this.http.setDataSerializer('json'); //send body as json, needed
          this.http
            .post(endpoint, item, this.header)
            .then(d => {
              resolve();
            })
            .catch(err => reject(err));
        } else {
          reject('No existe item');
        }
      });
    }

                /**
* Metodo que actualiza un cliente en la base de datos

* @param  item   cliente que se va a actualizar
* @param  endpoint ruta para la peticion http

*/
    public updateItem(item: Cliente): Promise<void> {
      const endpoint = environment.endpoint + environment.apiUsers;
      return new Promise((resolve, reject) => {
        if (item) {
          this.http.setDataSerializer('json'); //send body as json, needed
          this.http
            .put(endpoint, item, this.header)
            .then(d => {
              resolve();
            })
            .catch(err => reject(err));
        } else {
          reject('No existe item');
        }
      });
    }
      /**
   * 
   * @param id is no está presenta realizará un getAll -> http://localhost:8080/Users
   * , si existe realizará una selección por ID -> http://localhost:8080/Users/id
   */

          /**
* Metodo que devuelve los pedidos de la base de datos ó solo un pedido si introduces el id 

* @param  id  id del pedido que se va a buscar
* @param  endpoint ruta para la peticion http
* @return devuelve una lista de pedidos, un pedido o null

*/
       public getPedidos(id?:number | string): Promise<Pedido[] | null> {
        return new Promise((resolve, reject) => {
          let endpoint = environment.endpoint + environment.apiPedidos;
          if(id){
            endpoint+=id;
          }
          this.http
            .get(endpoint, {}, this.header)
            .then(d => {
              if(d) {
                resolve(JSON.parse(d.data));
              }else {
                resolve(null);
              }
            })
            .catch(err => reject(err));
        });
      }
        /**
* Metodo que devuelve  un pedido si introduces el id 

* @param  id  id del pedido que se va a buscar
* @param  endpoint ruta para la peticion http
* @return devuelve un pedido

*/
      public getPedidoId(id?:number | string): Promise< Pedido |null> {
        return new Promise((resolve, reject) => {
          let endpoint = environment.endpoint + environment.apiPedidos;
       
            endpoint+=id;
          
          this.http
            .get(endpoint, {}, this.header)
            .then(d => {
              if(d) {
                resolve(JSON.parse(d.data));
              }else {
                resolve(null);
              }
            })
            .catch(err => reject(err));
        });
      }
    
    
        /**
       * 
       * @param item es un número -> id, item -> item.id
       */

            /**
* Metodo que elimina un pedido de la base de datos

* @param  User   pedido que se va a eliminar
* @param  endpoint ruta para la peticion http

*/
      public removePedido(Publication: any): Promise<void> {
        const id: any = Publication.id ? Publication.id : Publication;
        const endpoint = environment.endpoint + environment.apiPedidos + id;
        return new Promise((resolve, reject) => {
          this.http
            .delete(endpoint, {}, this.header)
            .then(d => {
              resolve();
            })
            .catch(err => reject(err));
        });
      }
          /**
* Metodo que inserta un pedido nuevo en la base de datos

* @param  item   pedido que se va a insertar
* @param  endpoint ruta para la peticion http

*/
      public createPedido(item: Pedido): Promise<void> {
        const endpoint = environment.endpoint + environment.apiPedidos;
        return new Promise((resolve, reject) => {
          if (item) {
            this.http.setDataSerializer('json'); //send body as json, needed
            this.http
              .post(endpoint, item, this.header)
              .then(d => {
                resolve();
              })
              .catch(err => reject(err));
          } else {
            reject('No existe item');
          }
        });
      }

                      /**
* Metodo que actualiza un pedido en la base de datos

* @param  item   pedido que se va a actualizar
* @param  endpoint ruta para la peticion http

*/
      public updatePedido(item: Pedido): Promise<void> {
        const endpoint = environment.endpoint + environment.apiPedidos;
        return new Promise((resolve, reject) => {
          if (item) {
            this.http.setDataSerializer('json'); //send body as json, needed
            this.http
              .put(endpoint, item, this.header)
              .then(d => {
                resolve();
              })
              .catch(err => reject(err));
          } else {
            reject('No existe item');
          }
        });
      }
    
    
      private get header():any{
        return {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        };
    }
}
