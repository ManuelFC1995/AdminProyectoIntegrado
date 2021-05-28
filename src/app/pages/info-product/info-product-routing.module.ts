import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoProductPage } from './info-product.page';

const routes: Routes = [
  {
    path: '',
    component: InfoProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoProductPageRoutingModule {}
