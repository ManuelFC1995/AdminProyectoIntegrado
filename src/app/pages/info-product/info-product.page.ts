import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { Producto } from '../../model/Producto';
import { ApiService } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.page.html',
  styleUrls: ['./info-product.page.scss'],
})



  //-----------------CLASE QUE CARGA EL PRODUCTO PARA EDITARLO ------------------------//
export class InfoProductPage implements OnInit {
  @Input('Producto') private Producto: Producto;
  private valid: boolean;
  private image1: string;
  private imagenBBD1: string;
  private imagen2: string;
  private imagenBBDD2: string;
  private imagen3: string;
  private imagenBBD3: string;
  public tasks: FormGroup;
  constructor(public alertController: AlertController, private modalController: ModalController, 
    private apiS: ApiService, private formBuilder: FormBuilder, private platform: Platform,
    private navCtrl: NavController, public LoadingS: LoadingService,
    private camera: Camera, private router: Router) {


    this.tasks = this.formBuilder.group({
      name: [''],
      descripcion: [''],
      categoria: [''],
      categoria2: [''],
      precio: [''],
      uds: [''],
    })

  }
  async ngOnInit() {
    this.carga();
  }


  /**
* Metodo que carga el producto a editar

* @param  Producto  Producto que se va a editar
*/
  async carga() {
    this.LoadingS.presentLoading();
    this.Producto = await this.apiS.getProductoId(this.Producto.id);
    console.log(this.tasks.get('categoria').value);
    console.log(this.Producto);
    if (this.Producto.imagene1 != null) {
      this.image1 = 'data:image/jpeg;base64,' + this.Producto.imagene1;
      this.imagenBBD1 = this.Producto.imagene1;
    }
    if (this.Producto.imagene2 != null) {
      this.imagen2 = 'data:image/jpeg;base64,' + this.Producto.imagene2;
      this.imagenBBDD2 = this.Producto.imagene2;
    }
    if (this.Producto.imagene3 != null) {
      this.imagen3 = 'data:image/jpeg;base64,' + this.Producto.imagene3;
      this.imagenBBD3 = this.Producto.imagene3;
    }
    this.LoadingS.loadingController.dismiss();
  }
  async cargasinfotos() {
    this.Producto = await this.apiS.getProductoId(this.Producto.id);
    console.log(this.Producto);
    this.clearimagenes();
  }



  private doRefresh(event) {
    setTimeout(async () => {
      this.carga();
      event.target.complete();
    }, 500);
  }



  private ionViewDidEnter() {
    console.log(this.tasks.get('categoria').value);
    this.tasks.get('name').setValue(this.Producto.name);
    this.tasks.get('descripcion').setValue(this.Producto.descripcion);
    this.tasks.get('categoria').setValue(this.Producto.categoria);
    this.tasks.get('categoria2').setValue(this.Producto.categoria2);
    console.log(this.tasks.get('categoria').value);
    this.tasks.get('precio').setValue(this.Producto.precio);
    this.tasks.get('uds').setValue(this.Producto.unidades);

  }



        /**
* Metodo que envia el formulario rellenado para añadir el producto

* @param  Producto  Producto que se va a editar

*/
  public async sendForm() {

    await this.LoadingS.presentLoading();

    this.Producto.name = this.tasks.get('name').value;
    this.Producto.descripcion = this.tasks.get('descripcion').value;
    this.Producto.categoria = this.tasks.get('categoria').value;
    console.log(this.tasks.get('categoria').value);
    this.Producto.categoria2= this.tasks.get('categoria2').value;
    this.Producto.precio = this.tasks.get('precio').value;
    this.Producto.unidades = this.tasks.get('uds').value;
    this.Producto.imagene1 = this.imagenBBD1;
    this.Producto.imagene2 = this.imagenBBDD2;
    this.Producto.imagene3 = this.imagenBBD3;
    console.log(this.Producto);
    this.apiS.updateProducto(this.Producto)
      .then((respuesta) => {
        console.log(respuesta);
        this.LoadingS.presentToast("Producto Actualizado", "success");
        this.modalController.dismiss();
        this.LoadingS.loadingController.dismiss();

      })
      .catch((err) => {

        this.LoadingS.loadingController.dismiss();
        this.LoadingS.presentToast("Error Actualizando Producto", "danger");
        console.log(err);
      })
  }
        /**
* Metodo que accede a la camara

* @param  this.image1  Imagen que se va a mostrar en la pantalla
* @param  this.imagenBBD1  Imagen que se va a guardar en la base de datos
* @param  this.image2  Imagen que se va a mostrar en la pantalla
* @param  this.imagenBBD2  Imagen que se va a guardar en la base de datos
* @param  this.image2  Imagen que se va a mostrar en la pantalla
* @param  this.imagenBBD2  Imagen que se va a guardar en la base de datos

*/
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
        else if (this.image1 != null) {
          if (this.imagen2 == null) {
            this.imagen2 = 'data:image/jpeg;base64,' + imageData;
            this.imagenBBDD2 = imageData;
          }
        }
        else if (this.imagen2 != null) {
          if (this.imagen3 == null) {
            this.imagen3 = 'data:image/jpeg;base64,' + imageData;
            this.imagenBBD3 = imageData;
          }
        }

      }, (err) => {
        console.log(err);
      });
  }


            /**
* Metodo que accede a la Galeria del teléfono

* @param  this.image1  Imagen que se va a mostrar en la pantalla
* @param  this.imagenBBD1  Imagen que se va a guardar en la base de datos
* @param  this.image2  Imagen que se va a mostrar en la pantalla
* @param  this.imagenBBD2  Imagen que se va a guardar en la base de datos
* @param  this.image2  Imagen que se va a mostrar en la pantalla
* @param  this.imagenBBD2  Imagen que se va a guardar en la base de datos
*/ 
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
        else if (this.imagen2 != null) {
          if (this.imagen3 == null) {
            this.imagen3 = 'data:image/jpeg;base64,' + imageData;
            this.imagenBBD3 = imageData;
          }
        }
      }, (err) => {
        console.log(err);
      });

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
