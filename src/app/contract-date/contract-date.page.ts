import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-contract-date',
  templateUrl: './contract-date.page.html',
  styleUrls: ['./contract-date.page.scss'],
})
export class ContractDatePage implements OnInit {

  public contract_id: string;
  public contract_user_id: string;
  public contract_number: string;
  public contract_name: string;

  public date_signature: string;
  public date_endcontract: string;
  public date_movein: string;
  public date_moveout: string;
  public postData: any;

  constructor(
    public http: HttpClient,
    public router: Router,
    public global: GlobalService
  ) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('contract'));
    this.contract_id = data.id;
    this.contract_user_id = data.user_id;
    this.contract_number = data.number;
    this.contract_name = data.name;
    this.date_signature = data.signature;
    this.date_endcontract = data.endcontract;
    this.date_movein = data.movein;
    this.date_moveout = data.moveout;
  }

  goInfo() {
    this.router.navigate(['/contract/contract/contractinfo']);
  }

  gosaveContract(id: any, date_signature: any, date_endcontract: any, date_movein: any, date_moveout: any) {
    this.postData = {
      id: id,
      date_signature: date_signature,
      date_endcontract: date_endcontract,
      date_movein: date_movein,
      date_moveout: date_moveout,
      type: 'landlord',
      table: 'contracts',
      action: 'update',
      part: 'date',
    };
    if (this.postData.id == "") {
      this.postData.action = "insert";
      this.postData.user_id = this.contract_user_id;
    }
    this.http.put(this.global.urlServer + 'crudactions', this.postData).
      subscribe((data) => { });
  }
}