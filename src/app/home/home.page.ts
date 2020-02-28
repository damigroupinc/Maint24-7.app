import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public HaveNotifications: boolean;
  public numNotifications: number;
  public userData: any;
  public postData: any;
  public errorUpdateUserClasse: string = 'Sorry, wrong update your profile! Plase try again!';
  public okUpdateUserClasse: string = 'Update your profile with success!';

  constructor(
    private router: Router,
    public http: HttpClient,
    public global: GlobalService,
  ) { }

  ngOnInit() {
    this.userData = this.global.getUser();
    this.numNotifications = this.global.searchNotifications(this.userData.id, this.userData.classe);
  }

  searchNotifications() {
    return 10;
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

  goNotifications() {
    this.router.navigate(['/notifications']);
  }

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

}


