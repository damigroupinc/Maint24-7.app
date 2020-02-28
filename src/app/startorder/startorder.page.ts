import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceordersService } from '../serviceorders.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-startorder',
  templateUrl: './startorder.page.html',
  styleUrls: ['./startorder.page.scss'],
})
export class StartorderPage {

  public userData: any;
  public postData: any;
  public order_param: any;

  public order_id: string;
  public order_building: string;
  public order_manager: string;
  public order_supervisor: string;
  public order_apt: string;
  public order_date_opened_string: string;
  public order_status: string;

  public description_starter: string = "";
  public photo: string = '';

  public strMessageWOok: string = 'Work Order Started!';
  public strMessageWOerror: string = 'Error to start WorkOrder!';

  fileUrl: any = null;
  respData: any;

  constructor(
    private camera: Camera,
    public serviceordersservice: ServiceordersService,
    public http: HttpClient,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private navegar: Router,
    public global: GlobalService) { }

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
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  sendPostRequest() {
    this.makeyouShure();
  }

  async makeyouShure() {
    let trueReturn = false;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you shure start this WorkOrder?',
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
            this.startHTTPWorkOrder();
            this.navegar.navigateByUrl('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  startHTTPWorkOrder() {
    this.postData = {
      user_id: this.userData.id,
      id: this.order_param.id,
      description_started: this.description_starter,
      image: this.photo
    };

    this.http.put(this.global.urlServer + "startorder", this.postData)
      .subscribe((data) => {
        this.global.presentToastGeneric(this.strMessageWOok, 'success');
      },
        error => {
          this.global.presentToastGeneric(this.strMessageWOerror, 'danger');
        }
      );

  }
}

