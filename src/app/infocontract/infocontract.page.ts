import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceContract } from '../InterfaceContract';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-infocontract',
  templateUrl: './infocontract.page.html',
  styleUrls: ['./infocontract.page.scss'],
})
export class InfocontractPage implements OnInit {
  
  public userData: any;
  public postData: any;
  public infoContract: any;
  
  constructor(
    public http: HttpClient,
    public router: Router,
    public global: GlobalService
  ) {}

  ngOnInit() {
    this.userData = this.getUser();
    console.log(this.userData);
  
    this.postData = {
      user_id: this.userData.id,
      classe: this.userData.Classe
    };  
    this.http.put<InterfaceContract>(this.global.urlServer + 'infoContract', this.postData).
    subscribe(data => { this.infoContract = data; });
  }
    
  goComplete() {
    this.router.navigate(['/ten-complete']);
  }
  
  goFinance() {
      this.router.navigate(['/finance']);
  }
  
  goPDF() {
      this.router.navigate(['/ten-complete']);
    }
  
  getUser() {
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}
