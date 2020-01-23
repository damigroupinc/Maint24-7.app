import { InterfaceServices } from '../InterfaceServices';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';

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

  constructor( 
                private camera: Camera, 
                private navegar: Router,
                private toastController: ToastController,
                public http: HttpClient,
                public global: GlobalService,
                private router: ActivatedRoute  ) {}
               
  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    })
    this.order_id = this.order_param.id;
    this.order_description = this.order_param.description;
    this.userData = this.getUser();
  }

  sendNewOrder() {    
    this.postData = {
      user_id: this.userData.id,
      service_id: this.order_id,
      description: this.description,      
      image: this.photo
    };
    this.http.put(this.global.urlServer + 'newServiceOrder', this.postData).subscribe((data) => { 
      this.presentToast();
      this.navegar.navigateByUrl('/home');      
    }, error => {
      this.presentToastError();
    });
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
  
  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'New Order send. Thank you!',
      animated: true,
      mode: "ios",
      duration: 800,
      showCloseButton: true,
      color: 'success'
    });
    toast.present();
  }  

  async presentToastError() {
    const toast = await this.toastController.create({
      message: "Please make sure you're connected to the internet and try again.",
      animated: true,
      mode: "ios",
      duration: 800,
      showCloseButton: true,
      color: 'danger'
    });
    toast.present();
  } 

}
