import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceordersService } from '../serviceorders.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.page.html',
  styleUrls: ['./pictures.page.scss'],
})

export class PicturesPage {

  public userData: any;
  public postData: any;
  public order_param: any;
  public order_id: string;
  public order_building: string;
  public order_manager: string;
  public order_supervisor: string;
  public order_apt: string;
  public order_date_created: string;
  public order_status: string;

  description: string = "";

  public photo: string = '';

  public strMessageWOok: string = 'New history add!';
  public strMessageWOerror: string = 'Error to add new history!';

  constructor(
    private camera: Camera,
    public serviceordersservice: ServiceordersService,
    public http: HttpClient,
    public navCtrl: NavController,
    public alertController: AlertController,
    private navegar: Router,
    public global: GlobalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    })
    this.order_id = this.order_param.id;
    this.order_building = this.order_param.building;
    this.order_apt = this.order_param.unit;
    this.order_date_created = this.order_param.date_created;
    this.order_status = this.order_param.status;
    this.userData = this.global.getUser();
  }

  takePicture() {
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
    console.log(Camera);
  }

  sendHistoryRequest($id: string) {
    this.makeyouShure($id);
    /* this.navegar.navigate(['/home/']); */
  }

  async makeyouShure($id: string) {
    let trueReturn = false;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you shure what submit this History?',
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
            this.sendHistoryHTTPRequest()
          }
        }
      ]
    });
    await alert.present();
  }

  sendHistoryHTTPRequest() {
    this.postData = {
      user_id: this.userData.id,
      serviceorder_id: parseInt(this.order_id),
      description: this.description + ' |-> On History',
      image: this.photo
    }
    this.http.put(this.global.urlServer + "saveHistory", this.postData)
      .subscribe((data) => {
        this.global.presentToastGeneric(this.strMessageWOok, 'success');
        this.navegar.navigateByUrl('/home');
      }, error => {
        console.log(error);
      });
  }

}