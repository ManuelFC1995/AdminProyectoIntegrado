import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Config, IonRouterOutlet, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Cliente } from '../../model/Cliente';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { ApiService } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  private speakers: any[] = [];
  private ios: boolean;
  private dayIndex = 0;
  private queryText = '';
  private segment = 'all';
  private excludeTracks: any = [];
  private shownSessions: any = [];
  private groups: any = [];
  private confDate: string;
  public listado: Array<Cliente>;
  public profileimg: string = "/assets/img/profile.png";
  private category: string = null;
  public tasks: FormGroup;

  private showSearchbar: boolean;
  private textoBuscar = '';
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
    private formBuilder: FormBuilder) { }



  async ngOnInit() {


    this.carga();

    this.ios = this.config.get('mode') === 'ios';
    let c: Cliente;

  }


  private ionViewDidEnter() {
    //  this.confData.getSpeakers().subscribe((speakers: any[]) => {
    //  this.speakers = speakers;
    //});
  }


    /**
* Método que abre el modal para mostrar los datos del producto

* @param speakers  Carga todos los usuarios de la base de datos

*/
  public async carga() {

    this.speakers = [];
    this.speakers = await this.apiS.getUserall();

  }
}
