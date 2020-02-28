import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public userData: any;
  public postData: any;

  public strMessageUserError: string = 'Sorry, wrong update profile!';
  public strMessageUserSuccess: string = 'Profile update with success!';

  constructor(
    private router: Router,
    public http: HttpClient,
    public global: GlobalService
  ) {}

  ngOnInit() {
    this.userData = this.global.getUser();
  }

  gotoLandLord() {
    this.userData.classe = 'LANDLORD';
    this.postData = {
      id: this.userData.id,
      phone: this.userData.phone,
      email: this.userData.email,
      classe: this.userData.classe
    };
    this.http.put(this.global.urlServer + "classeToLandLord", this.postData)
      .subscribe((data) => {
        this.userData = data;
        if (this.userData.id == 0) {
          // 0 = Nao encontrei o usuario cadastrado.
          this.global.presentToastGeneric(this.strMessageUserError, 'danger');
          this.router.navigateByUrl('/login');
        } else {
          error => {
            this.global.presentToastGeneric(this.strMessageUserError, 'danger');
            console.log(error);
          }
        }
      });
    this.global.saveUser(this.postData);
    this.router.navigate(['/wizprofile']);
  }

  gotoTenant() {
    this.postData = {
      id: this.userData.id,
      phone: this.userData.phone,
      email: this.userData.email,
      classe: this.userData.classe
    };
    this.http.put(this.global.urlServer + "classeToTenant", this.postData).subscribe((data) => {
      this.userData = data;
      if (this.userData.id == 0) {
        // 0 = Nao encontrei o usuario cadastrado em nenhuma unidade nem com email e nem com telefone.
        this.global.presentToastGeneric(this.strMessageUserError, 'danger');
        this.router.navigate(['/login/']);
      } else {
        this.postData.classe = 'TENANT';
        this.global.saveUser(this.postData);
        this.router.navigate(['/home']);
        return (false);
      }
    })
  }


}