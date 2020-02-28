import { Component, OnInit } from '@angular/core';
import { InterfaceServices } from '../InterfaceServices';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  public postData: any;
  public userData: any;

  public item: string = "";
  public listServices: InterfaceServices;
  public description: string = '';

  constructor(
    private navegar: Router,
    public global: GlobalService,
    public http: HttpClient) { }

  ngOnInit() {
    this.userData = this.getUser();
    this.http.put<InterfaceServices>
      (this.global.urlServer + 'readServices', this.userData).
      subscribe(data => { this.listServices = data; });
  }

  appointment($id: string, $description: string) {
    let $param = JSON.stringify(({
      id: $id,
      description: $description
    }))
    console.log($param);
    this.navegar.navigate(['/neworder/' + $param])
  }

  getUser() {
    return JSON.parse(localStorage.getItem('postLogin'));
  }
}