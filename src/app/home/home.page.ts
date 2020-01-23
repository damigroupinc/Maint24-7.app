import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular'; 
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public userData: any;
  public postData: any;
  public errorUpdateUserClasse: string = 'Sorry, wrong update your profile! Plase try again!';
  public okUpdateUserClasse: string = 'Update your profile with success!';

  constructor(
    private router: Router,
    public http: HttpClient,
    private toastController: ToastController,  
    public global: GlobalService,
  ) {}

  ngOnInit() {
    this.userData = this.getUser();
  }

  makeRepair() {
      this.router.navigate(['/lista']);
  }

  viewServiceOrders() {
    let $param = JSON.stringify({ id: '0' }); 
    this.router.navigate(['/viewservices/' + $param]);
  }

  makeMoveIn() {
    this.router.navigate(['/movein']);
  }

  makeMoveOut() {
    this.router.navigate(['/moveout']);
  }

  makeContract() {
    this.router.navigate(['/infocontract']);
  }

  makePay() {
    this.router.navigate(['/payments']);
  }

  goUnits() {
    this.router.navigate(['/units']);
  }

  goContracts() {
    this.router.navigate(['/contract']);
  }
  
//this.router.navigateByUrl('/login');
  //this.router.navigate(['/tenant/']);


  ImLandLord() {
    if (this.userData.classe == 'LANDLORD') { return true }
    else { return false }
  }

  ImTenant() {
    if (this.userData.classe == 'TENANT') { return true }
    else { return false }
  }

  ImUser() {
    if (this.userData.classe == 'USER') { return true }
    else { return false }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('postLogin'));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.errorUpdateUserClasse,
      duration: 800,
      animated: true,
      showCloseButton: true,
      color: "danger"
    });
    toast.present();
  };  

}


