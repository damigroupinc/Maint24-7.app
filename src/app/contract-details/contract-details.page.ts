import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InterfaceContract } from '../InterfaceContract';
import { GlobalService } from '../global.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.page.html',
  styleUrls: ['./contract-details.page.scss'],
})

export class ContractDetailsPage implements OnInit {
  [x: string]: any;

  public postData: any;
  public userData: any;
  public listContracts: InterfaceContract;

  constructor(private router: Router,
    public global: GlobalService,
    private toastController: ToastController,
    public http: HttpClient, ) { }

  ngOnInit() {
    this.userData = this.getUser();
    this.readContracts();
  }

  deleteContracts(id: string) {
    this.postData = {
      id: id,
      table: 'contracts',
      action: 'delete',
      type: 'landlord'
    };
    this.userData = this.getUser();
    this.http.put<InterfaceContract>
      (this.global.urlServer + 'crudactions', this.postData).
      subscribe(data => { this.listContracts = data; });     
      this.presentToastGeneric('Contract deleted', 'success', 800);
  }

  readContracts() {
    this.postData = {
      user_id: this.userData.id,
      table: 'contracts',
      action: 'select',
      type: 'landlord'
    };
    this.userData = this.getUser();
    this.http.put<InterfaceContract>
      (this.global.urlServer + 'crudactions', this.postData).
      subscribe(data => { this.listContracts = data; });
  }

  goInfo(
    info_id: string,
    info_number: string,
    info_name: string,
    info_description: string,
    info_clauses: string,
    info_rent: string,
    info_deposit: string,
    info_lastmonth: string,
    info_security: string,
    info_penalty: string,
    info_signature: string,
    info_endcontract: string,
    info_movein: string,
    info_moveout: string, 
    info_paypalid: string,

    ) {
    this.saveContractLocal( 
      info_id,
      info_number,
      info_name,
      info_description,
      info_clauses,
      info_rent,
      info_deposit,
      info_lastmonth,
      info_security,
      info_penalty,
      info_signature,
      info_endcontract,
      info_movein,
      info_moveout,
      info_paypalid,
     );
    this.router.navigate(['/contract/contract/contractinfo']);
  }

  goFinance(
    info_id: string,
    info_number: string,
    info_name: string,
    info_description: string,
    info_clauses: string,
    info_rent: string,
    info_deposit: string,
    info_lastmonth: string,
    info_security: string,
    info_penalty: string,
    info_signature: string,
    info_endcontract: string,
    info_movein: string,
    info_moveout: string, 
    info_paypalid: string,
  ) {
    this.saveContractLocal( 
      info_id,
      info_number,
      info_name,
      info_description,
      info_clauses,
      info_rent,
      info_deposit,
      info_lastmonth,
      info_security,
      info_penalty,
      info_signature,
      info_endcontract,
      info_movein,
      info_moveout,
      info_paypalid,
   )
    this.router.navigate(['/contract/contract/contractfinance']);
  }

  goDate(
    info_id: string,
    info_number: string,
    info_name: string,
    info_description: string,
    info_clauses: string,
    info_rent: string,
    info_deposit: string,
    info_lastmonth: string,
    info_security: string,
    info_penalty: string,
    info_signature: string,
    info_endcontract: string,
    info_movein: string,
    info_moveout: string, 
    info_paypalid: string,
    ) {
    this.saveContractLocal( 
      info_id,
      info_number,
      info_name,
      info_description,
      info_clauses,
      info_rent,
      info_deposit,
      info_lastmonth,
      info_security,
      info_penalty,
      info_signature,
      info_endcontract,
      info_movein,
      info_moveout,
      info_paypalid,
      );
    this.router.navigate(['/contract/contract/contractdate']);
  }
  
  saveContractLocal(
    info_id: string,
    info_number: string,
    info_name: string,
    info_description: string,
    info_clauses: string,
    info_rent: string,
    info_deposit: string,
    info_lastmonth: string,
    info_security: string,
    info_penalty: string,
    info_signature: string,
    info_endcontract: string,
    info_movein: string,
    info_moveout: string, 
    info_paypalid: string,
    ) {
    let param = {
      id: info_id,
      number: info_number,
      name: info_name,
      description: info_description,
      clauses: info_clauses,
      
      rent: info_rent,
      deposit: info_deposit,
      lastmonth: info_lastmonth,
      security: info_security,
      penalty: info_penalty,
      paypalid: info_paypalid,
     
      signature: info_signature,
      endcontract: info_endcontract,
      movein: info_movein,
      moveout: info_moveout,

    };
    localStorage.setItem('contract', JSON.stringify(param));
  }
  
  goHome() {
    this.router.navigate(['/home']);
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

  getUser() {
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}
