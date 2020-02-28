import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { InterfaceNotifications } from './interfaceNotifications'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public urlServer = 'http://134.209.71.179/api/';
  public version = '2.1.1292020-Android';
  public name = 'Maint24/7';
  public company = 'One Quality Inc';
  public published = '01/29/2020 12:00-AM MA-US';
  public website = 'maint247.com';
  public photo = '';
  public notifications: InterfaceNotifications;
  public total = 0;

  constructor(
    private toastController: ToastController,
    public http: HttpClient,
  ) { }

  async presentToastGeneric(strMsg: string, strColor: string) {
    const toast = await this.toastController.create({
      message: strMsg,
      animated: true,
      mode: "ios",
      duration: 8000,
      showCloseButton: true,
      color: strColor,
    });
    toast.present();
  }

  getUser() {
    return JSON.parse(localStorage.getItem('postLogin'));
  }

  saveUser($postData: any) {
    localStorage.setItem('postLogin', JSON.stringify($postData));
  }

  searchNotifications($user_id: number, $type: string) {
    let postData = {
      user_id: $user_id,
      type: $type,
    }
    this.http.put<InterfaceNotifications>
      (this.urlServer + 'countNotifications', postData).
      subscribe(data => { this.tratarDados(data) });

    return this.total;
  }

  tratarDados(dados: InterfaceNotifications) {
    this.total = dados.total;
    return dados.total;
  }

}

