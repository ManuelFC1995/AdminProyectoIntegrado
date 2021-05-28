import { Component, ElementRef, Inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { AlertController, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';

import { darkStyle } from './map-dark-style';
import { ApiService } from '../../services/api.service';
import { Pedido } from '../../model/Pedido';
import { LoadingService } from '../../services/loading.service';
import { PedidoPage } from '../pedido/pedido.page';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements OnInit  {
private pedidos:Pedido[]=[];
private imagenPaypal = "/assets/img/Paypal.gif";
private imagenTarjeta = "/assets/img/Tarjeta.gif";
public tasksfiltro: FormGroup;
private imagenEnvio = "/assets/img/envio.gif";
 private orden='';
  constructor(private apiS:ApiService, public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingService,
    public LOadingCTR: LoadingController,private formBuilder:FormBuilder,
    public modalCtrl: ModalController,private navCtrl: NavController){

  }
  async ngOnInit(): Promise<void> {
    this.tasksfiltro = this.formBuilder.group({


      orden: [''],
      
       
 
     })
 
  this.carga();
  }
  public async carga(){
    this.orden=  this.tasksfiltro.get('orden').value;
    this.loadingCtrl.presentLoading();
    this.pedidos=await this.apiS.getPedidos();
       
    if(this.orden==''){
      this.pedidos.reverse();
    }
if(this.orden=='new'){
  this.pedidos.reverse();
}
if(this.orden=='old'){

}
if(this.orden=='price1'){
  this.pedidos.sort(this.comparePrice1);
}
if(this.orden=='price2'){
  this.pedidos.sort(this.comparePrice2);
}
if(this.orden=='pendientes'){
  let pendientes:Pedido[]=[];
  this.pedidos.forEach(element => {
    if(element.completado==false){
     pendientes.push(element);
    }
  });
  this.pedidos=pendientes;
}
if(this.orden=='enviados'){
  let pendientes:Pedido[]=[];
  this.pedidos.forEach(element => {
    if(element.completado==true){
     pendientes.push(element);
    }
  });
  this.pedidos=pendientes;
}

this.loadingCtrl.loadingController.dismiss();
    console.log(this.pedidos);
  }





  private doRefresh(event) {
    setTimeout(async () => {
   this.carga();
      event.target.complete();
    }, 500);
  }

  
  public async Pedido(Pedido:Pedido){
    const modal = await this.modalCtrl.create({
      component: PedidoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        Pedido:Pedido
      }
    });
    return await modal.present();
  }
  private comparePrice1(a:Pedido, b:Pedido) {
    if (a.importe>=b.importe) {
      return -1;
    }
    if (a.importe<=b.importe) {
      return 1;
    }
    // a debe ser igual b
    return 0;
  }

  private comparePrice2(a:Pedido, b:Pedido) {
    if (a.importe<=b.importe) {
      return -1;
    }
    if (a.importe>=b.importe) {
      return 1;
    }
    // a debe ser igual b
    return 0;
  }
}

