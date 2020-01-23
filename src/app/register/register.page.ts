import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; 
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { InterfaceUsers } from '../interfaceusers';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
     
  public dataUser: InterfaceUsers;
  public postData: any;
  public dataAux: any;
  
  public firstname: string = "";
  public lastname: string = "";
  public username: string = "";      
  public password: string = "";     
  public confirmpassword: string = "";
  public email: string = ""; 
  public phone: string = "";
   
  constructor(
    private toastController: ToastController,   
    public navCtrl: NavController,
    private router: Router, 
    public global: GlobalService,
    public http: HttpClient ) {}
      
  ngOnInit() {}

  sendNewUser() {    
    if (this.confirmpassword == this.password) {
      this.postData = {
        username: this.username,      
        password: this.password,  
        email: this.email,
        phone: this.phone,
        firstname: this.firstname,
        lastname: this.lastname
      };        
      this.dataAux = {
        id: "",
        message: ""
      }
      this.http.put(this.global.urlServer + 'newUserMobile', this.postData).  
      subscribe((data) => {
        this.dataAux = data;
        if (this.dataAux.id === "email" ) {
          this.presentToastErroEmail();
        } else if (this.dataAux.id === 'phone' ) {
          this.presentToastErroPhone(); 
        } else if (this.dataAux.id === 'username' ) {
          this.presentToastErroUserName();
        } else if ( this.dataAux.id === 0 ) {
            this.presentToastErro();
        } else {
          this.login();
        }
      })
    } else {
      this.presentToastConfirmPass();
    }
  }  

  async presentToastConfirmPass() {
    const toast = await this.toastController.create({
      message: 'Plase, password and confirm password must be same!',
      duration: 8000,
      animated: true,
      showCloseButton: true,
      color: "danger"
    });
    toast.present();
  }

  async presentToastErro() {
    const toast = await this.toastController.create({
      message: 'Sorry, wrong login! Plase try again!',
      duration: 8000,
      animated: true,
      showCloseButton: true,
      color: "danger"
    });
    toast.present();
  }

  async presentToastOk() {
    const toast = await this.toastController.create({
      message: 'Login was successfull. Enjoy your app ' + this.username,
      duration: 800,
      animated: true,
      showCloseButton: true,
      color: 'success'
    });
    toast.present();
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
            "firstname": this.dataUser.firstname,
            "lastname": this.dataUser.lastname,
            "classe": this.dataUser.classe,                         
            "status": this.dataUser.status,
            "email": this.dataUser.email,
            "phone": this.dataUser.phone,
        }
        this.saveUser(postData);
        this.presentToastOk(); 
        this.router.navigate(['/welcome']);
        }
    })
  }

  async presentToastErroEmail() {
    const toast = await this.toastController.create({
      message: 'Sorry, This email exist in database. Plase try again!',
      duration: 8000,
      animated: true,
      showCloseButton: true,
      color: "danger"
    });
    toast.present();
  }

  async presentToastErroPhone() {
    const toast = await this.toastController.create({
      message: 'Sorry, This Phone exist in database. Plase try again!',
      duration: 8000,
      animated: true,
      showCloseButton: true,
      color: "danger"
    });
    toast.present();
  }
  
  async presentToastErroUserName() {
    const toast = await this.toastController.create({
      message: 'Sorry, This UserName exist in database. Plase try again!',
      duration: 8000,
      animated: true,
      showCloseButton: true,
      color: "danger"
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
