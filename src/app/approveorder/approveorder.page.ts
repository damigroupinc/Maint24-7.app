import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceordersService} from '../serviceorders.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  fileUrl: any = null;
  respData: any;
 
  constructor(
    private toastController: ToastController, 
    private camera: Camera, 
    public serviceordersservice: ServiceordersService,
    public http: HttpClient,
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
    this.order_date_opened_string = this.order_param.date_created;
    this.order_status = this.order_param.status;
    this.userData = this.getUser();
  }
    
  approvePostRequest() { 
    this.postData = {
      id: this.order_param.id,
      description_approved: this.description_approved,
      image: this.photo
    };

    this.http.put(this.global.urlServer + "approveorder", this.postData)
      .subscribe((data) => {
        console.log('Approver Work Order was a success!');
      }, error => {
        this.presentToastError();
        console.log(error);
      });
    
      this.postData = {
        serviceorder_id: parseInt(this.order_id),
        description_histories: this.description_approved + ' |-> On Approved',
        image_histories: this.photo,
        typeid_histories: this.userData.classe,
        typename_histories: this.userData.name,
        writeid_histories: this.userData.id 
      }

      this.http.put(this.global.urlServer + "historyorder", this.postData)
        .subscribe((data) => {
          console.log('Success! Make this history in this Work Order');
          this.presentToastOk();
          this.navegar.navigateByUrl('/home');
        }, error => {
          console.log(error);
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

    async presentToastOk() {
      const toast = await this.toastController.create({
        message: 'Work Order approved.',
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
        showCloseButton: true,
        color: "danger"
      });
      toast.present();
    };

    getUser() {         
      return JSON.parse(localStorage.getItem('postLogin'));
    }

  }