import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pedido } from '../../model/Pedido';
import { Producto } from '../../model/Producto';
import { ApiService } from '../../services/api.service';
import { InfoProductPage } from '../info-product/info-product.page';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})

//-----------------CLASE QUE CARGA EL PEDIDO------------------------//
export class PedidoPage implements OnInit {
  @Input('Pedido') private Pedido: Pedido;
  private imagenPaypal = "/assets/img/Paypal.gif";
  private imagenTarjeta = "/assets/img/Tarjeta.gif";
  private imagenEnvio = "/assets/img/envio.gif";

  constructor(private apiS: ApiService, private modalController: ModalController) {}
  

  async ngOnInit() {
    console.log(this.Pedido);
  }

  /**
* Método que abre el modal para mostrar los datos del producto

* @param  Producto  Producto que se va a enviar al modal
* @param  nfoProductPage pagina que se av a abrir
*/
  public async infoproduct(Producto: Producto) {
    const modal = await this.modalController.create({
      component: InfoProductPage,
      cssClass: 'my-custom-class',
      componentProps: {
        Producto: Producto
      }
    });
    return await modal.present();
  }


  private doRefresh(event) {

    setTimeout(async () => {
      this.Pedido = await this.apiS.getPedidoId(this.Pedido.id);
      event.target.complete();
    }, 500);

  }



  /**
* Método que actualiza el pedido y lo marca como enviado

* @param  Pedido Pedido que se va a marcar como enviado
*/
  private enviar() {
    this.Pedido.completado = true;
    this.apiS.updatePedido(this.Pedido);
  }


  /**
* Método que actualiza el pedido y lo marca como no enviado

* @param  Pedido Pedido que se va a marcar como enviado
*/
  private Noenviado() {
    this.Pedido.completado = false;
    this.apiS.updatePedido(this.Pedido);
  }



  /**
* Método que configura el backButton

* @param  
*/
  public atras() {
    this.modalController.dismiss();
  }
}
