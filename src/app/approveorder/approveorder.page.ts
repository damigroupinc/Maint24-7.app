import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-approveorder',
  templateUrl: './approveorder.page.html',
  styleUrls: ['./approveorder.page.scss'],
})
export class ApproveorderPage implements OnInit {
  public userData: any;
  public postData: any;
  public description_approved: string = "";
  public photo: string = '';
  public order_param: any;
  public order_id: string;
  public order_building: string;
  public order_apt: string;
  public order_date_opened_string: string;
  public order_status: string;

  public strMessageWOok: string = 'Work Order Approved!';
  public strMessageWOerror: string = 'Error to approve WorkOrder!';

  constructor(
    private camera: Camera,
    public http: HttpClient,
    private navegar: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public global: GlobalService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    })
    this.order_id = this.order_param.id;
    this.order_building = this.order_param.building;
    this.order_apt = this.order_param.apt;
    this.order_date_opened_string = this.order_param.date_created;
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

  onRateChange(event) {
    console.log('Your rate:', event);
  }

  approvePostRequest() {
    this.makeyouShure();
  }

  async makeyouShure() {
    let trueReturn = false;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you shure approve this WorkOrder?',
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
            this.approvedHTTPWorkOrder();
            this.navegar.navigateByUrl('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  approvedHTTPWorkOrder() {
    this.postData = {
      user_id: this.userData.id,
      id: this.order_param.id,
      description_approved: this.description_approved,
      image: this.photo
    };
    this.http.put(this.global.urlServer + "approveorder", this.postData)
      .subscribe((data) => {
        this.global.presentToastGeneric(this.strMessageWOok, 'success');
      },
        error => {
          this.global.presentToastGeneric(this.strMessageWOerror, 'danger');
        }
      );
  }
}