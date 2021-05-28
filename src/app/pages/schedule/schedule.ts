import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { AddproductPage } from '../addproduct/addproduct.page';
import { ApiService } from '../../services/api.service';
import { Producto } from '../../model/Producto';
import { LoadingService } from '../../services/loading.service';
import { InfoProductPage } from '../info-product/info-product.page';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) private scheduleList: IonList;
  public listado: Array<Producto>;
  public listadoConFoto: Array<Producto> = [];
  private category: string = null;
  public tasks: FormGroup;
  private item;
  private ios: boolean;
  private dayIndex = 0;
  private queryText = '';
  private segment = 'all';
  private excludeTracks: any = [];
  private shownSessions: any = [];
  private groups: any = [];
  private confDate: string;
  private showSearchbar: boolean;
  private textoBuscar = '';
  private p: Producto[];
  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingService,
    public LOadingCTR: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    private modalController: ModalController,
    private apiS: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  async ngOnInit() {
    this.tasks = this.formBuilder.group({


      categoria: [null],

    })

    this.carga();
    
    this.updateSchedule();

    this.ios = this.config.get('mode') === 'ios';
  }



  private updateSchedule() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }
  private doRefresh(event) {
    setTimeout(async () => {
      this.carga();
      event.target.complete();
    }, 500);
  }
  public async carga() {
    this.category = this.tasks.get('categoria').value;
    this.listadoConFoto = [];
    this.loadingCtrl.presentLoading();
    if (this.category == null || this.category == "") {

      this.listado = await this.apiS.getProductall();
      console.log(this.p);
      this.listado.forEach((data) => {
        if (data.imagene1 == null) {
          data.imagene1 = "/assets/img/pordefecto.jpg";
          this.listadoConFoto.push(data);
        } else {
          data.imagene1 = 'data:image/jpeg;base64,' + data.imagene1;
          console.log(data);
          this.listadoConFoto.push(data);
        }
      })
    } else {
      this.listado = await this.apiS.getProductall();
      console.log(this.p);
      this.listado.forEach((data) => {
        if (data.categoria == this.category) {
          if (data.imagene1 == null) {
            data.imagene1 = "/assets/img/pordefecto.jpg";
            this.listadoConFoto.push(data);
          } else {
            data.imagene1 = 'data:image/jpeg;base64,' + data.imagene1;
            console.log(data);
            this.listadoConFoto.push(data);
          }
        }

      })
    
    }

    this.listadoConFoto.reverse();
    this.item=this.listadoConFoto.length;
    this.loadingCtrl.loadingController.dismiss();
  }

  private ionViewDidEnter() {
  

  }
  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateSchedule();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }

  }

  public async borrarElemento(id: any) {

    this.apiS.removeProducto(id)
      .then(() => {
        //ya está borrada allí


        let event;
        this.doRefresh(event);
        this.loadingCtrl.presentToast("Producto Borrado", "success");
      })
      .catch(err => {


      })
  }

  async presentAlertConfirmDelete(id: any) {

    const alert = await this.alertCtrl.create({
      header: "Atención!",
      message: "Seguro que desea Borrar El producto?",
      buttons: [
        {
          text: "cancelar",
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: "Borrar",
          handler: async () => {
            await this.loadingCtrl.presentLoading();
            this.borrarElemento(id);
            this.loadingCtrl.loadingController.dismiss();
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.LOadingCTR.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
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

  public async Addproduct() {
    const modal = await this.modalController.create({
      component: AddproductPage,
      cssClass: 'my-custom-class',
      componentProps: {

      }
    });
    return await modal.present();
  }

  private Buscar(event) {
    this.textoBuscar = event.detail.value;
   
  }




}
