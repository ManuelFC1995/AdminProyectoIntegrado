import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapPage } from './map';
import { MapPageRoutingModule } from './map-routing.module';
import { PedidoPageModule } from '../pedido/pedido.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule,PedidoPageModule,ReactiveFormsModule
  ],
  declarations: [
    MapPage,
  ]
})
export class MapModule { }
