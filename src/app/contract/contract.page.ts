import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.page.html',
  styleUrls: ['./contract.page.scss'],
})

export class ContractPage {

  public userData: any;
  
  constructor(
    public router: Router,
    public global: GlobalService
  ) { }

  ngOnInit() {
    this.userData = this.getUser();
    this.router.navigate(['/contract/contract/contractdetails']);
  }

  goAddContract() {
    this.saveContractLocal("","","","","","","","","","","","","","");
    this.router.navigate(['/contract/contract/contractinfo']);
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
    ) {
    let param = {
      id: info_id,
      user_id: this.userData.id,
      number: info_number,
      name: info_name,
      description: info_description,
      clauses: info_clauses,
      
      rent: info_rent,
      deposit: info_deposit,
      lastmonth: info_lastmonth,
      security: info_security,
      penalty: info_penalty,
     
      signature: info_signature,
      endcontract: info_endcontract,
      movein: info_movein,
      moveout: info_moveout,
    };
    localStorage.setItem('contract', JSON.stringify(param));
  }
  
  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}