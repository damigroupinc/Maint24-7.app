import { InterfaceServices } from '../InterfaceServices';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-Movein',
  templateUrl: './movein.page.html',
  styleUrls: ['./movein.page.scss'],
})

export class MoveinPage {
  
  public postData: any;
  public userData: any;
  
  public item: string = "";
  public listServices: InterfaceServices;      
  public photo: string = '';
  public services: string = '';
  public unit: string = '';
  public unitSize: string = '';
  public description: string = '';
 
  constructor( 
    private router: Router,
    private camera: Camera,
    private toastController: ToastController,
    public global: GlobalService,  
    public http: HttpClient ) {}

  ngOnInit() {
    this.userData = this.getUser();
    //this.http.put<InterfaceServices>
    //(this.global.urlServer + 'readServices', this.userData).
    //subscribe(data => { this.listServices = data; } );
  }
    
    sendNewOrder() {    
    this.postData = {
      user_id: this.userData.id,
      service_id: 12,
      description: this.description  + '|->On Move-in Inspection' ,      
      image: this.photo
    };               
    this.http.put(this.global.urlServer + 'newServiceOrder', this.postData).subscribe((data) => { 
      this.presentToastGeneric('Move-in send. Thank you!');
      this.router.navigateByUrl('/home');      
    }, error => {
      this.presentToastGeneric("Please make sure you're connected to the internet and try again.");
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
      this.presentToastGeneric('Error in Camera');
    })
    .catch((error) => {
      this.presentToastGeneric('Error in Camera');
    })
  }
  
  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

  async presentToastGeneric(strMsg) {
    const toast = await this.toastController.create({
      message: strMsg,
      animated: true,
      mode: "ios",
      duration: 800,
      showCloseButton: true,
      color: 'primary'
    });
    toast.present();
  } 

}
