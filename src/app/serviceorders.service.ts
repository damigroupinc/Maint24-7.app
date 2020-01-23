import { Injectable } from '@angular/core';
import { InterfaceOrders } from '../app/interfaceorders';
import { HttpClient } from '@angular/common/http';

// Inject Http into your component .
// Request JSON data using HttpClient

@Injectable({
  providedIn: 'root'
})

  export class ServiceordersService {
  public data_return: InterfaceOrders;
  public url_local:string = 'http://localhost:8000/api/';
  public url_server: string = "https://cors-anywhere.herokuapp.com/http://www.oneqservices.com/api/";
 
  public url:string = this.url_server;

  hearder:any;

  constructor(public http: HttpClient) {
  }

  getListTodayOrders(userData: []) { 
    return this.http.get<InterfaceOrders>( 
    this.url + 'todayOrders' );
  }

  getListTomorrowOrders() { 
    return this.http.get<InterfaceOrders>( 
      this.url + 'tomorrowOrders' ); 
  }

  getListWeekOrders() { 
    return this.http.get<InterfaceOrders>( 
    this.url + 'weekOrders' );
  } 
  
}