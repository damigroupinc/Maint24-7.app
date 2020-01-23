import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.page.html',
  styleUrls: ['./contract-info.page.scss'],
})
export class ContractInfoPage implements OnInit {

  public contract_id: string;
  public contract_user_id: string;
  public contract_number: string;
  public contract_name: string;

  public description: string;
  public clauses: string;
  public id: string;
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
    this.description = data.description;
    this.clauses = data.clauses;
  }

  gosaveContract(info_id: any, info_name: any, info_description: any, info_clauses: any, inputRef: any) {
    this.postData = {
      id: info_id,
      name: info_name,
      description: info_description,
      clauses: info_clauses,
      type: 'landlord',
      table: 'contracts',
      action: 'update',
      part: 'info',
    };
    
    if (this.postData.name == "") {
      this.presentToastGeneric(' Please, put name in your contract', 'danger', 800);
      inputRef.setFocus();
      return false;
    } else { 
        if (this.postData.id == "") {
        this.postData.action = "insert";
        this.postData.user_id = this.contract_user_id;
      } 
      this.http.put(this.global.urlServer + 'crudactions', this.postData).
        subscribe((data) => {
          this.postData = data;
          if (this.postData.id == '0') { 
            this.presentToastGeneric('This contract with name ' + 
            this.postData.message  + 
            ' is already registered.', 'danger', 8000);
            inputRef.setFocus();
            return false;
          } else {
              this.router.navigate(['/contract/contract/contractdetails']);
              this.presentToastGeneric(' Contract saved', 'success', 800);
            }
          });
    }
  }

  async presentToastGeneric(strMsg: string, strColor: string, strTime: number) {
    const toast = await this.toastController.create({
      message: strMsg,
      animated: true,
      mode: "ios",
      duration: strTime,
      showCloseButton: true,
      color: strColor,
    });
    toast.present();
  }
}