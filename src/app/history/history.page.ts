import { InterfaceHistory } from '../interfacehistory';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
})

export class HistoryPage implements OnInit {

  galleryType = 'regular';

  public userData: any;
  public postData: any;
  public description_approved: string = "";
  public photo: string = '';
  public order_param: any;
  public order_id: string;
  public order_building: string;
  public order_apt: string;
  public order_date_opened_string: string;
  public order_status: string;
  
  public historyOrders: InterfaceHistory;
    
  constructor( 
                private route: ActivatedRoute,
                public http: HttpClient,
                public global: GlobalService  
            ) {}
            
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    });

    this.order_id = this.order_param.id;
    this.order_building = this.order_param.building;      
    this.order_apt = this.order_param.unit;    
    this.order_date_opened_string = this.order_param.date_created;
    this.order_status = this.order_param.status;
    console.log(
      'param',this.order_param, 
      'id:', this.order_id, 
      'param_id', this.order_param.id, 
      'status:', this.order_status, 
      'status', this.order_param.status );

    this.postData = {
      id: this.order_param.id
    };



    
    this.http.put<InterfaceHistory>(this.global.urlServer + 'historyOrders', this.postData).
    subscribe(data => {  this.historyOrders = data; } );
    this.userData = this.getUser();
  }

  getUser() {         
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}