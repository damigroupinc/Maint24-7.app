import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; 
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { InterfaceUsers } from '../interfaceusers';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  [x: string]: any;
     
  public dataUser: InterfaceUsers
  public username: string = '';
  public password: string = '';    
    
  constructor(
    private toastController: ToastController,   
    public http: HttpClient,
    public navCtrl: NavController,
    private router: Router, 
    public global: GlobalService) {}
  
  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  register() {   
    this.router.navigate(['/register']);
  }

  recover() {   
    this.router.navigate(['/recover']);
  }

  login(){
    this.sendPostRequest(); 
  }

  sendPostRequest() {
    let postData = {
      "username": '',
      "password": ''
    }
    postData.username =  this.username;
    postData.password = this.password;
    this.http.put<InterfaceUsers>(this.global.urlServer + "seekUser", postData).
      subscribe(data => {
      this.dataUser = data;
      if ( this.dataUser.id == 0 ) {
        this.presentToastErro();
        this.router.navigateByUrl('/login');
      } else {        
        let postData = {
          "id": this.dataUser.id,
          "username": this.dataUser.username,
          "classe": this.dataUser.classe,
          "password": this.dataUser.password,
          "status": this.dataUser.status,
          "phone": this.dataUser.phone,
          "email": this.dataUser.email,
          "firstname": this.dataUser.firstname,
          "lastname": this.dataUser.lastname,
        }
        this.saveUser(postData);
        this.presentToastOk();
        if (this.dataUser.classe == 'USER' ) {
          this.router.navigate(['/welcome']);        
        } else { 
          this.router.navigate(['/home']);        
        }
      }
    })
  }

  async presentToastErro() {
    const toast = await this.toastController.create({
      message: 'Sorry, wrong login! Plase try again!',
      duration: 800,
      animated: true,
      showCloseButton: true,
      color: "danger"
    });
    toast.present();
  };

  async presentToastOk() {
    const toast = await this.toastController.create({
      message: 'Login is success and enjoy your app ' + this.dataUser.username,
      duration: 800,
      animated: true,
      showCloseButton: true,
      color: 'success'
    });
    toast.present();
  };  

  saveUser($postData: any) {
      localStorage.setItem('postLogin', JSON.stringify($postData));
    }

  getUser() {         
      return JSON.parse(localStorage.getItem('postLogin'));
  }
}
