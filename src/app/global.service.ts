import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public urlServer = 'http://134.209.71.179/api/';
  public version = '1.1.01151200-Android';
  public name = 'Maint24/7';
  public company = 'One Quality Inc';
  public published = '01/15/2020 12:00-AM MA-US';
  public website = 'maint247.com';
  public photo = '';

  constructor(private toastController: ToastController) { }

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
}

