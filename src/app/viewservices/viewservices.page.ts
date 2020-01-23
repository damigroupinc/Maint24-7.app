import { ServiceordersService} from '../serviceorders.service';
import { InterfaceOrders } from '../interfaceorders';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../global.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewservices',
  templateUrl: './viewservices.page.html',
  styleUrls: ['./viewservices.page.scss'],
})
export class ViewservicesPage implements OnInit {
    
  public userData: any;
  public listTodayOrders: InterfaceOrders;
  public data_return: InterfaceOrders;
  public order_param: any;
  public order_id: string;
    
  constructor(  public serviceordersservice: ServiceordersService,
                private activaterouter: ActivatedRoute,   
                private router: Router,           
                public global: GlobalService,  
                public http: HttpClient
            ) {}

  ngOnInit() {
    this.userData = this.getUser();
    console.log(this.userData);
    this.activaterouter.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    });
    
    console.log(this.order_param.id);

    if ( this.order_param.id != 0 ) {
      this.userData.id = this.order_param.id;
      this.userData.classe = 'TENANT';
    };

    console.log(this.userData);
    this.http.put<InterfaceOrders>
    (this.global.urlServer + 'todayOrdersUsers', this.userData).
    subscribe(data => { this.listTodayOrders = data; } );
  }

  ImLandLord()  {
    if (this.userData.classe != 'LANDLORD' ) { return true } else { return false };
  }

  canStartOrder(status: string)  {
    if (status == 'CREATED' && this.userData.classe == 'LANDLORD') { return true } else { return false };
  }

  canCloseOrder(status: string)  {
    if (status == 'PROCESS' && this.userData.classe == 'LANDLORD') { return true } else { return false };
  }

  canApproveOrder(status: string)  {
    if (status == 'CLOSED') { return true } else { return false };
  }

  takePicture(
    $id: string,
    $building: string, 
    $unit: string, 
    $date_created: string,
    $status: string ) {
    let $param = JSON.stringify({ id: $id, 
    building: $building, unit: $unit, date_created: $date_created, status: $status });
    this.router.navigate(['/pictures/' + $param])
  } 

  newOrder() {
      this.router.navigate(['/lista']);
  }

  startOrder(
    $id: string,
    $building: string, 
    $unit: string, 
    $date_created: string,
    $status: string ) {
    let $param = JSON.stringify({ id: $id, 
    building: $building, unit: $unit, date_created: $date_created, status: $status });
    this.router.navigate(['/startorder/' + $param]);
  }      

  closeOrder(
    $id: string,
    $building: string, 
    $unit: string, 
    $date_created: string,
    $status: string ) {
    let $param = JSON.stringify({ id: $id, 
    building: $building, unit: $unit, date_created: $date_created, status: $status });
    this.router.navigate(['/closeorder/' + $param]);
  }      

  approveOrder(
    $id: string,
    $building: string, 
    $unit: string, 
    $date_created: string,
    $status: string ) {
    let $param = JSON.stringify({ id: $id, 
    building: $building, unit: $unit, date_created: $date_created, status: $status });
    this.router.navigate(['/approveorder/' + $param]);
  }  

  historyOrder(
    $id: string,
    $building: string, 
    $unit: string, 
    $date_created: string,
    $status: string ) {
    let $param = JSON.stringify({ id: $id, 
    building: $building, unit: $unit, date_created: $date_created, status: $status });
    this.router.navigate(['/history/' + $param])
  }  
  
  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}




