
import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.page.html',
  styleUrls: ['./avatar.page.scss'],
})
export class AvatarPage implements OnInit {

  public userData: any;
  public postData: any;
  public photo: string = '';

  constructor(private camera: Camera,
    public http: HttpClient,
    public navCtrl: NavController,
    private navegar: Router,

    public global: GlobalService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userData = this.global.getUser();
    this.photo = this.userData.image;
  }

  sendHistoryRequest() {
    this.postData = {
      user_id: parseInt(this.userData.id),
      image: this.photo,
    }
    this.http.put(this.global.urlServer + "saveImageProfile", this.postData)
      .subscribe((data) => {
        console.log('Success! Make this histories in this Work Order');
        let postData = {
          "id": this.userData.id,
          "username": this.userData.username,
          "password": this.userData.password,
          "email": this.userData.email,
          "phone": this.userData.phone,
          "image": this.photo,
          "user_id": this.userData.id,
          "status": this.userData.status,
          "classe": this.userData.classe
        }
        this.global.saveUser(postData);
        this.navegar.navigateByUrl('/wizprofile');
      }, error => {
        console.log(error);
      });
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
}
