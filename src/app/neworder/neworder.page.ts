import { InterfaceServices } from '../InterfaceServices';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.page.html',
  styleUrls: ['./neworder.page.scss'],
})

export class NeworderPage {

  public postData: any;
  public userData: any;
  public item: string = "";

  public listServices: InterfaceServices;

  public photo: string = '';
  public services: string = '';
  public unit: string = '';
  public unitSize: string = '';
  public description: string = '';
  public order_param: any;
  public order_id: string = '';
  public order_description: string = '';

  public strMessageWOok: string = 'New Order send. Thank you!';
  public strMessageWOerror: string = 'Error to send your WorkOrder!';

  constructor(
    private camera: Camera,
    private navegar: Router,
    public http: HttpClient,
    public global: GlobalService,
    private router: ActivatedRoute,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    })
    this.order_id = this.order_param.id;
    this.order_description = this.order_param.description;
    this.userData = this.global.getUser();
  }

  sendNewOrder() {
    this.makeyouShure();
    this.navegar.navigateByUrl('/home');
  }

  sendHTTPNewOrder() {
    /* first -> question for make you shure */
    this.postData = {
      user_id: this.userData.id,
      service_id: this.order_id,
      description: this.description,
      image: this.photo
    };
    console.log(this.postData);
    this.http.put(this.global.urlServer + 'newServiceOrder', this.postData).subscribe((data) => {
      this.global.presentToastGeneric(this.strMessageWOok, 'success');
      this.navegar.navigateByUrl('/home');
    }, error => {
      this.global.presentToastGeneric(this.strMessageWOerror, 'danger');
    });
  }

  async makeyouShure() {
    let trueReturn = false;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you shure what insert this WorkOrder?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.sendHTTPNewOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  takePictureNO() {
    this.photo = '';
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
