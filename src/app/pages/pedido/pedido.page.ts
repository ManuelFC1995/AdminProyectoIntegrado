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
export class PedidoPage implements OnInit {
  @Input('Pedido') private Pedido: Pedido;
  private imagenPaypal = "/assets/img/Paypal.gif";
  private imagenTarjeta = "/assets/img/Tarjeta.gif";
  
  private imagenEnvio = "/assets/img/envio.gif";

  constructor(private apiS:ApiService,private modalController: ModalController,) { 

  }

  async ngOnInit() {
   
   console.log(this.Pedido);
  }
  public atras() {
    this.modalController.dismiss();
  }
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
   
  this.Pedido=await this.apiS.getPedidoId(this.Pedido.id);
      event.target.complete();
    }, 500);
  }
private enviar(){
  this.Pedido.completado=true;
  this.apiS.updatePedido(this.Pedido);
}
private Noenviado(){
  this.Pedido.completado=false;
  this.apiS.updatePedido(this.Pedido);
}

}
