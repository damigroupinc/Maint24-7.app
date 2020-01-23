import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

import { InterfaceFinance } from '../interfaceFinance';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  
public userData: any;  
public postData: any;

public listFinance: InterfaceFinance;

constructor(
  public http: HttpClient,
  private router: Router, 
  public global: GlobalService  
) {}

ngOnInit() {
  this.userData = this.getUser();
  this.postData = {
    user_id: this.userData.id,
    classe: 'TENANT',
  };        
  this.http.put<InterfaceFinance>
    (this.global.urlServer + 'listFinance', this.postData).
    subscribe(data => { this.listFinance = data ; 
    });
  }


  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}

