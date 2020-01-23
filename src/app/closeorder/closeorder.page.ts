import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceordersService} from '../serviceorders.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  fileUrl: any = null;
  respData: any;

  constructor( 
    private camera: Camera, 
    public serviceordersservice: ServiceordersService,
    public http: HttpClient,
    private toastController: ToastController,
    private navegar: Router,
    private route: ActivatedRoute,
    public global: GlobalService  
    ) {}

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.order_param = JSON.parse(params.get('id'));
      })
      this.order_id = this.order_param.id;
      this.order_building = this.order_param.building;      
      this.order_apt = this.order_param.apt;    
      this.order_date_opened_string = this.order_param.date_opened_string;
      this.order_status = this.order_param.status;
      this.userData = this.getUser();
    }
  
  sendPostRequest() {
    this.postData = {
      id: this.order_param.id,
      description_closed: this.description_closed,
      image: this.photo
    };
    this.http.put(this.global.urlServer + "closeorder", this.postData)
      .subscribe((data) => {}, error => {
        this.presentToastError();
        console.log(error);
      });    

    this.postData = {
      serviceorder_id: parseInt(this.order_id),
      description_histories: this.description_closed + ' |-> On Closed',
      image_histories: this.photo,
      typeid_histories: this.userData.classe,
      typename_histories: this.userData.name,
      writeid_histories: this.userData.id 
    }

    this.http.put(this.global.urlServer + "historyorder", this.postData)
      .subscribe((data) => {
        this.presentToastOk();
        this.navegar.navigateByUrl('/home');
      }, error => {
      });
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
    }, (error) => {})
    .catch((error) => {})    
  }

  async presentToastOk() {
    const toast = await this.toastController.create({
      message: 'Work Order closed.',
      duration: 800,
      animated: true,
      mode: "ios",
      color: 'success'
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Sorry, wrong login! Plase try again!',
      duration: 800,
      animated: true,
      mode: "ios",
      color: 'danger'
    });
    toast.present();
  } 

  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }
  
}
