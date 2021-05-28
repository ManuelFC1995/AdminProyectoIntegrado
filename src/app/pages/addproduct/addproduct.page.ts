import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Producto } from '../../model/Producto';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  private valid: boolean;
  private image1: string;
  private imagenBBD1: string;
  private imagen2: string;
  private imagenBBDD2: string;
  private imagen3: string;
  private imagenBBD3: string;
  public tasks: FormGroup;
  private category1=0;
  private categorys2=["Auriculares y Cascos","Altavoces","Cables Multimedia",
  "Cargadores y Adaptadores","Power Bank","Soportes","Fundas y Protectores",
  "MemoryCards","Ratones","Alfombrillas","Teclados","Otros"];
 
  public Producto: Producto | null = {

    name: undefined,
    descripcion: undefined,
    categoria: undefined,
    precio: undefined,
    imagene1: undefined,
    imagene2: undefined,
    imagene3: undefined,
    unidades: undefined


  };
  constructor(private router: Router,public actionSheetController: ActionSheetController,
    private activatedRouter: ActivatedRoute, private modalController: ModalController, private formBuilder: FormBuilder,
    public alertController: AlertController, private camera: Camera, private apiS: ApiService, private LoadingS: LoadingService
  ) {
    this.tasks = this.formBuilder.group({

      name: [''],
      descripcion: [''],
      categoria: [''],
      categoria2: [''],
      precio: [''],
      uds: [''],
    })

  }

  ngOnInit() {

    
  }

  public async sendForm() {

    this.Producto = {
      name: this.tasks.get('name').value,
      descripcion: this.tasks.get('descripcion').value,
     categoria: this.tasks.get('categoria').value,
     categoria2: this.tasks.get('categoria2').value,
      precio: this.tasks.get('precio').value,
      unidades: this.tasks.get('uds').value,
      imagene1: this.imagenBBD1,
      imagene2: this.imagenBBDD2,
      imagene3: this.imagenBBD3

    }
    console.log(this.Producto);
    this.LoadingS.presentLoading();
    await this.apiS.createProducto(this.Producto)
      .then((respuesta) => {
        console.log(respuesta);

        this.LoadingS.loadingController.dismiss();
        this.LoadingS.presentToast("Producto guardado", "success");
        this.atras();
      })
      .catch((err) => {
        this.LoadingS.loadingController.dismiss();
        this.LoadingS.presentToast("Error guardando Producto", "danger");
        console.log(err);
      })
    this.LoadingS.loadingController.dismiss();
  }

  private GuardarProducto() {
    /*     
         this.apiS.createPublication(this.Publicacion).then(data=>{
           console.log(data);
         }).catch((err)=>{
           console.log(err);
         }
         )
       */
  }

  private takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
      .then((imageData) => {
        if (this.image1 == null) {
          this.image1 = 'data:image/jpeg;base64,' + imageData;
          this.imagenBBD1 = imageData;
        }
        else  if (this.image1 != null) {
         if (this.imagen2 == null) {
            this.imagen2 = 'data:image/jpeg;base64,' + imageData;
            this.imagenBBDD2 = imageData;
          }
        }
        else  if (this.image1 != null && this.imagen2 != null) {
          if (this.imagen3 == null) {
            this.imagen3 = 'data:image/jpeg;base64,' + imageData;
            this.imagenBBD3 = imageData;
          }
        }

      }, (err) => {
        console.log(err);
      });


  }
  private takeGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options)
      .then((imageData) => {
        if (this.image1 == null) {
          this.image1 = 'data:image/jpeg;base64,' + imageData;
          this.imagenBBD1 = imageData;
        }
        else if (this.image1 != null) {
          if (this.imagen2 == null) {
            this.imagen2 = 'data:image/jpeg;base64,' + imageData;
            this.imagenBBDD2 = imageData;
          }
        }
       else if (this.image1 != null && this.imagen2 != null) {
       
            this.imagen3 = 'data:image/jpeg;base64,' + imageData;
            this.imagenBBD3 = imageData;
         
        }

      }, (err) => {
        console.log(err);
      });

  }


private hayFoto(){
  if (this.image1 != null) {
  return true
  }else{
    return false
  }
}


private cambiarcategoria2(){
  if(this.tasks.get('categoria').value==''){
this.category1=0;
  }

  if(this.tasks.get('categoria').value=='movil'){
    this.category1=1;
  }

  if(this.tasks.get('categoria').value=='Tablets'){
    this.category1=2;
  }

  if(this.tasks.get('categoria').value=='Informática'){
    this.category1=3;
  }

  if(this.tasks.get('categoria').value=='Smartwatch'){
    this.category1=4;
  }
  if(this.tasks.get('categoria').value=="Sónido"){
    this.category1=5;
  }
  if(this.tasks.get('categoria').value=="Décoracíon"){
    this.category1=6;
  }
}

async presentAlertFotos() {

  const alert = await this.alertController.create({
    header: 'Subir archivo',
    message: 'Elija una opcion ',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Camara',
        handler: () => {
          this.takePicture();

        }
      }, {
        text: 'Galeria',
        handler: () => {
          this.takeGallery();

        }
      }
    ]
  });
  await alert.present();
  let result = await alert.onDidDismiss();
  console.log(result);
}

  public clearimagenes() {
    this.image1 = null;
    this.imagen2 = null;
    this.imagen3 = null;
    this.imagenBBD1 = null;
    this.imagenBBDD2 = null;
    this.imagenBBD3 = null;
  }
  public atras() {
    this.modalController.dismiss();
  }
}
