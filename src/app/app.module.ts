import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, NgModuleFactory } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddproductPage } from './pages/addproduct/addproduct.page';
import{HTTP} from '@ionic-native/http/ngx'
import { ApiService } from './services/api.service';
import { LoadingService } from './services/loading.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent],
  providers: [ HTTP,Camera,
    LoadingService,
  
    ApiService,
   HttpClient,
    InAppBrowser,
     SplashScreen, 
     StatusBar],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
