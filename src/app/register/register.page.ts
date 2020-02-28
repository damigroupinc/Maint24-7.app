import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { InterfaceUsers } from '../interfaceusers';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  public strMessageUserEmail: string = 'Sorry, This email exist in database. Plase try again!';
  public strMessageUserPhone: string = 'Sorry, This Phone exist in database. Plase try again!';
  public strMessageUserUsername: string = 'Sorry, This UserName exist in database. Plase try again!';
  public strMessageUserPassword: string = 'Plase, password and confirm password must be same!';
  public strMessageUserError: string = 'Sorry, wrong to insert new account!';
  public strMessageUserEmailLetter: string = 'Plase, Email must be formatted correctly!';
  public strMessageUserSuccess: string = 'New user account insert!';


  constructor(
    public navCtrl: NavController,
    private router: Router,
    public global: GlobalService,
    public alertController: AlertController,
    private navegar: Router,
    public http: HttpClient
  ) { }

  ngOnInit() { }

  makelogin() {
    let postData = {
      "username": this.username,
      "password": this.password,
    }
    this.http.put<InterfaceUsers>(this.global.urlServer + "seekUser", postData).
      subscribe(data => {
        this.dataUser = data;
        if (this.dataUser.id == 0) {
          console.log(this.dataUser, data);
          this.global.presentToastGeneric(this.strMessageUserError, 'danger');
        } else {
          let postData = {
            "id": this.dataUser.id,
            "username": this.dataUser.username,
            "password": this.dataUser.password,
            "email": this.dataUser.email,
            "phone": this.dataUser.phone,
            "user_id": this.dataUser.id,
            "status": this.dataUser.status,
            "classe": this.dataUser.classe
          }
          this.global.saveUser(postData);
          this.router.navigate(['/welcome']);
        }
      })
  }


  sendNewUser() {
    this.makeyouShure();
  }

  async makeyouShure() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you shure that your details is correct to create your new user account?',
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
            let a = this.sendHTTPNewUser();
            console.log(" a ", a);
            this.makelogin();

          }
        }
      ]
    });
    await alert.present();
  }

  sendHTTPNewUser() {

    this.postData = {
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      firstname: this.firstname,
      lastname: this.lastname
    };
    this.http.put(this.global.urlServer + 'newUserMobile', this.postData).
      subscribe((data) => {
        console.log(' usuario cadastrado', data);

        return true;
      },
        error => {
          this.global.presentToastGeneric(this.strMessageUserError, 'danger');
          return false;
        })

  }

  register() {
    if (!(this.confirmpassword == this.password)) {
      this.global.presentToastGeneric(this.strMessageUserPassword, 'danger');
      return false;
    };
    if (this.email.indexOf("@") === -1) {
      this.global.presentToastGeneric(this.strMessageUserEmailLetter + ' include @ in email ', 'danger');
      return false;
    };
    if (this.email.indexOf(".com") === -1) {
      this.global.presentToastGeneric(this.strMessageUserEmailLetter + ' include something .com in email ', 'danger');
      return false;
    }
    if (this.email.indexOf("@.com") > -1) {
      this.global.presentToastGeneric(this.strMessageUserEmailLetter + ' include something bettwen @ and .com in email ', 'danger');
      return false;
    } else {
      this.postData = {
        username: this.username,
        email: this.email,
        phone: this.phone,
      };
      this.http.put(this.global.urlServer + 'consultaUserMobile', this.postData).
        subscribe((data) => {
          this.dataAux = data;
          console.log('Consulta email, phone e username: ', data, this.dataAux = data);
          if (this.dataAux.id === "email") {
            this.global.presentToastGeneric(this.strMessageUserEmail, 'danger');
            return false;
          } else if (this.dataAux.id === 'phone') {
            this.global.presentToastGeneric(this.strMessageUserPhone, 'danger');
            return false;
          } else if (this.dataAux.id === 'username') {
            this.global.presentToastGeneric(this.strMessageUserUsername, 'danger');
            return false;
          } else {
            this.sendNewUser();
          }
        })
    }
  }
}
