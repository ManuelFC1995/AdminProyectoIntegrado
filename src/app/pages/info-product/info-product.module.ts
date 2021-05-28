import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoProductPageRoutingModule } from './info-product-routing.module';

import { InfoProductPage } from './info-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoProductPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InfoProductPage]
})
export class InfoProductPageModule {}
