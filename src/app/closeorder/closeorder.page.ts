import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceordersService } from '../serviceorders.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-closeorder',
  templateUrl: './closeorder.page.html',
  styleUrls: ['./closeorder.page.scss'],
})
export class CloseorderPage {
  public userData: any;

  public postData: any;
  public order_label: string;
  public description_closed: string = "";
  public photo: string = '';
  public order_param: any;
  public order_id: string;
  public order_building: string;
  public order_manager: string;
  public order_supervisor: string;
  public order_apt: string;
  public order_date_opened_string: string;
  public order_status: string;

  public strMessageWOok: string = 'Work Order Closed!';
  public strMessageWOerror: string = 'Error to close WorkOrder!';

  constructor(
    private camera: Camera,
    public serviceordersservice: ServiceordersService,
    public http: HttpClient,
    private navegar: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public global: GlobalService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    })
    this.order_id = this.order_param.id;
    this.order_building = this.order_param.building;
    this.order_apt = this.order_param.apt;
    this.order_date_opened_string = this.order_param.date_opened_string;
    this.order_status = this.order_param.status;
    this.userData = this.global.getUser();
  }



  takePictureSO() {
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
      }, (error) => { })
      .catch((error) => { })
  }

  sendPostRequest() {
    this.makeyouShure();
  }

  async makeyouShure() {
    let trueReturn = false;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you shure close this WorkOrder?',
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
            this.closeHTTPWorkOrder();
            this.navegar.navigateByUrl('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  closeHTTPWorkOrder() {
    this.postData = {
      user_id: this.userData.id,
      id: this.order_param.id,
      description_closed: this.description_closed,
      image: this.photo
    };
    this.http.put(this.global.urlServer + "closeorder", this.postData)
      .subscribe((data) => {
        this.global.presentToastGeneric(this.strMessageWOok, 'success');
      },
        error => {
          this.global.presentToastGeneric(this.strMessageWOerror, 'danger');
        }
      );
  }
}

