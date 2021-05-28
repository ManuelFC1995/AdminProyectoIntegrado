import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SchedulePage } from './schedule';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { AddproductPage } from '../addproduct/addproduct.page';
import { AddproductPageRoutingModule } from '../addproduct/addproduct-routing.module';
import { AddproductPageModule } from '../addproduct/addproduct.module';
import { InfoProductPageModule } from '../info-product/info-product.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    AddproductPageModule,
    InfoProductPageModule,
    ReactiveFormsModule
  ],
  declarations: [
    SchedulePage,
    ScheduleFilterPage,
    
  ],
  entryComponents: [
    ScheduleFilterPage,
    
  ]
})
export class ScheduleModule { }
