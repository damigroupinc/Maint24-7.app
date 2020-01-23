import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.page.html',
  styleUrls: ['./changepass.page.scss'],
})
export class ChangepassPage implements OnInit {

  public postData: any;
  public userData: any;
  public photo: string = '';
  public currentpassword: string = '';
  public newpassword: string = '';
  public confirmpassword: string = '';
   
  constructor(
    private toastController: ToastController,
    private router: Router,
    public global: GlobalService,  
    public http: HttpClient ) {}

  ngOnInit() {
    this.userData = this.getUser();
  }
  
  ionViewDidEnter() {
    this.userData = this.getUser();
  }

  checkCurrentPassword(inputCurrent){
    if (this.userData.password !== this.currentpassword) {
      this.presentToastErrorCurrentPassword();
      inputCurrent.setFocus();      
    }
  }
  
  checkConfirmPassword(inputnew) {
    if (this.newpassword !== this.confirmpassword) {
      this.presentToastErrorConfirmPassword();
      inputnew.setFocus();
    }
  }

  changePasswordUser() {
    if (this.userData.password !== this.currentpassword) {
      this.presentToastErrorCurrentPassword();     
    } else {
      if (this.newpassword !== this.confirmpassword) {
        this.presentToastErrorConfirmPassword();     
      } else {
        this.postData = {
          id_user: this.userData.id,
          newpassord: this.newpassword
        };               
        this.http.put(this.global.urlServer + 'changePassword', this.postData).subscribe((data) => { 
          console.log('Starter Order was a success!'); 
          this.saveNovoLogin(); 
          this.presentToastOk();
          this.router.navigateByUrl('/home');      
        }, error => {
          this.presentToastError();
          console.log(error);
        }
      )}
    }
  }
  
  saveNovoLogin() {
    this.postData = {
      id_user: this.userData.id,
      newpassord: this.newpassword
    };                      
    this.http.put(this.global.urlServer + 'changePassword', this.postData).subscribe((data) => { 
      console.log('Starter Order was a success!');  
      let postData = {
        "id": this.userData.id,
        "name": this.userData.username,
        "classe": this.userData.classe,
        "id_classe": this.userData.id_classe,
        "password": this.newpassword,
        "status": this.userData.status
      }
      this.saveUser(postData);
    });
  }       
  
  async presentToastErrorCurrentPassword() {
    const toast = await this.toastController.create({
      message: "Please, insert correct current password!",
      animated: true,
      mode: "ios",
      duration: 800,
      showCloseButton: true,
      color: 'danger'
    });
    toast.present();
  } 
  
  async presentToastErrorConfirmPassword() {
    const toast = await this.toastController.create({
      message: "Please, confirm new passoword!",
      animated: true,
      mode: "ios",
      duration: 800,
      showCloseButton: true,
      color: 'danger'
    });
    toast.present();
  } 

  async presentToastOk() {
    const toast = await this.toastController.create({
      message: "It's ok. The new password saved!",
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

  saveUser($postData: any) {
    localStorage.setItem('postLogin', JSON.stringify($postData));
  }

  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}