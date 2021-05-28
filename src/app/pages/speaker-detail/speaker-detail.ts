import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController, AlertController, Config, IonRouterOutlet, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingService } from '../../services/loading.service';
import { UserData } from '../../providers/user-data';
import { ApiService } from '../../services/api.service';
import { Cliente } from '../../model/Cliente';
import { PedidoPage } from '../pedido/pedido.page';
import { Pedido } from '../../model/Pedido';
@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  styleUrls: ['./speaker-detail.scss'],
})
export class SpeakerDetailPage {
  private speaker: any;
  private cliente: Cliente;
  private imagenPaypal = "/assets/img/Paypal.gif";
  private imagenTarjeta = "/assets/img/Tarjeta.gif";
  
  private imagenEnvio = "/assets/img/envio.gif";
  public profileimg: string = "/assets/img/profile.png";
  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public alertCtrl: AlertController,

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
  ) { }

  async ngOnInit() {


    this.dataProvider.load().subscribe(async (data: any) => {
      const speakerId = this.route.snapshot.paramMap.get('speakerId');
      this.cliente = await this.apiS.getUserId(speakerId);
      console.log(this.cliente);

    });
  }

  private ionViewWillEnter() {

  }

  private openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
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
}
