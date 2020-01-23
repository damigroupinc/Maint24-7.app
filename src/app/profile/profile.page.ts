import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; 
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { InterfaceUsers } from '../interfaceusers';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    
  public userData: InterfaceUsers;
  public postData: any;
  public dataAux: any;

  public username: string = "";      
  public password: string = "";  
  public confirmpassword: string = "";

  public email: string = ""; 
  public phone: string = "";
  public classe: string = "";
  public firstname: string = "";
  public lastname: string = "";
   
  constructor(
    private toastController: ToastController,   
    public navCtrl: NavController,
    private router: Router, 
    public global: GlobalService,
    public http: HttpClient ) {}
      
  ngOnInit() {
    this.userData = this.getUser();

    this.username = this.userData.username;    
    this.password = this.userData.password;
    this.email = this.userData.email;
    this.phone = this.userData.phone;
    this.firstname = this.userData.firstname;
    this.lastname = this.userData.lastname;
    this.classe = this.userData.classe;
  };        
  
  updateUser() {    
    if (this.confirmpassword == this.password) {
      this.postData = {
        username: this.username,      
        password: this.password,  
        email: this.email,
        phone: this.phone,
        firstname: this.firstname,
        lastname: this.lastname,
        classe: this.classe,
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
      message: 'Plase, confirm password!',
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
        this.userData = data;
        if ( this.userData.id == 0 ) {
          this.presentToastErro();
         this.router.navigateByUrl('/login');
       } else {        
         let postData = {
            "id": this.userData.id,
            "firstname": this.userData.firstname,
            "lastname": this.userData.lastname,
            "classe": this.userData.classe,                         
            "status": this.userData.status,
            "email": this.userData.email,
            "phone": this.userData.phone,
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

