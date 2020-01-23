import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-finance',
  templateUrl: './contract-finance.page.html',
  styleUrls: ['./contract-finance.page.scss'],
})
export class ContractFinancePage implements OnInit {


  public contract_id: string;
  public contract_user_id: string;
  public contract_number: string;

  public contract_name: string;
  public finance_rent: string;
  public finance_deposit: string;
  public finance_lastmonth: string;
  public finance_security: string;
  public finance_penalty: string;
  public finance_paypalid: string;
  public postData: any;

  constructor(
    public global: GlobalService,    
    private toastController: ToastController, 
    public router: Router,
    public http: HttpClient, ) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('contract'));
    this.contract_id = data.id;
    this.contract_user_id = data.user_id;
    this.contract_number = data.number;
    this.contract_name = data.name;
    this.finance_rent = data.rent;
    this.finance_deposit = data.deposit;
    this.finance_lastmonth = data.lastmonth;
    this.finance_security = data.security;
    this.finance_penalty = data.penalty;
    this.finance_paypalid = data.paypalid;
  }

  gosaveContract(finance_id: any, finance_rent: any, finance_deposit: any, finance_lastmonth: any, finance_security: any, finance_penalty: any, finance_paypalid: any) {
    this.postData = {
      id: finance_id,
      rent: finance_rent,
      deposit: finance_deposit,
      lastmonth: finance_lastmonth,
      security: finance_security,
      penalty: finance_penalty,
      paypalid: finance_paypalid,
      type: 'landlord',
      table: 'contracts',
      action: 'update',
      part: 'finance',
    };
    if (this.postData.name == "") {
      //this.presentToastGeneric(' Please, put name in your contract', 'danger');
      //inputRef.setFocus();
      return false;
    } else { 
      if (this.postData.id == "") {
        this.postData.action = "insert";
        this.postData.user_id = this.contract_user_id;
      }
      this.http.put(this.global.urlServer + 'crudactions', this.postData).
        subscribe((data) => { });
    }
  }
        
  async presentToastGeneric(strMsg: string, strColor: string) {
    const toast = await this.toastController.create({
      message: strMsg,
      animated: true,
      mode: "ios",
      duration: 800,
      showCloseButton: true,
      color: strColor,
    });
    toast.present();
  }
}