import { Component, OnInit, ɵConsole } from '@angular/core';
import { InterfaceUnits } from '../interfaceunits';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { InterfaceContract } from '../InterfaceContract';
import { Router } from '@angular/router';

@Component({
  selector: 'app-units',
  templateUrl: './units.page.html',
  styleUrls: ['./units.page.scss'],
})

export class UnitsPage implements OnInit {

  public postData: any;
  public userData: any;
  public unitData: any;
  public contractData: any;

  public item: string = "";
  public listUnits: InterfaceUnits;
  public listContracts: InterfaceContract;

  public name: string = '';
  public phone: string = '';
  public email: string = '';
  public id: string = '';

  constructor(
    public alertCtrl: AlertController,
    public global: GlobalService,
    public http: HttpClient,    
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.userData = this.getUser();
    this.readUnits();
  }

  viewServiceOrders(tenant: string) {
    let $param = JSON.stringify({ id: tenant }); 
    this.router.navigate(['/viewservices/' + $param]);
  }

  contracts(unit_id: string) {
    this.readContracts(unit_id);
  }

  readContracts(unit_id: string) {
    this.postData = {
      action: 'select',
      table: 'contracts',
      type: 'landlord',
      user_id: this.userData.id,
    };
    this.http.put<InterfaceContract>
      (this.global.urlServer + 'crudactions', this.postData).
      subscribe(data => {
        this.listContracts = data;
        this.choiceContracts(this.tratarDados(data), unit_id)
      });
  }

  tratarDados(dados: InterfaceContract) {
    var texto = '[ ';
    let i = 0;
    for (var s in dados) {
      if (i > 0) { texto = texto + ',' };
      var texto = texto + '{"name": "' + "radio" + i + '",';
      var texto = texto + ' "type": "radio",';
      var texto = texto + ' "label": "' + dados[i].name + i + '",';
      var texto = texto + ' "value": "' + dados[i].id + '"';
      var texto = texto + ' }';
      i = i + 1;
    }
    var texto = texto + ' ]';
    var objeto = JSON.parse(texto);
    return objeto;
  }

  async choiceContracts(texto: any, unit_id: string) {



    console.log(texto);
    const alert = await this.alertCtrl.create({
      /*  const alert = await this.alertCtrl.create({
          header: 'Radio',
          inputs: [
            {
              name: 'radio1',
              type: 'radio',
              label: 'Radio 1 um',
              value: 'value1',
              checked: true
            },
            {
              name: 'radio2',
              type: 'radio',
              label: 'Radio 2',
              value: 'value2'
            },
            {
              name: 'radio3',
              type: 'radio',
              label: 'Radio 3',
              value: 'value3'
            },
            {
              name: 'radio4',
              type: 'radio',
              label: 'Radio 4',
              value: 'value4'
            },
            {
              name: 'radio5',
              type: 'radio',
              label: 'Radio 5',
              value: 'value5'
            },
            {
              name: 'radio6',
              type: 'radio',
              label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
              value: 'value6'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: (data) => {
                console.log('Confirm Ok', data);
              }
            }
          ]
        });
    
        await alert.present();
      } */

      header: 'Radio',
      inputs: texto,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            console.log('OK ---> Data -> ' + JSON.stringify(data));
            // update record add id contract 
            this.postData = {
              id: unit_id,
              contract_id: data,
              type: 'landlordContractUnit',
              table: 'units',
              action: 'update',
            };
            this.http.put(this.global.urlServer + 'crudactions', this.postData).
              subscribe((data) => {
              });
          }
        }
      ]
    });
    await alert.present();
  }

  readUnits() {
    this.postData = {
      user_id: this.userData.id,
      table: 'units',
      action: 'select',
      type: 'landlord'
    };
    this.http.put<InterfaceUnits>
      (this.global.urlServer + 'crudactions', this.postData).
      subscribe(data => { this.listUnits = data; console.log(data) });
  }

  itsForRent(email: string, phone: string, unit_id: string) {
    this.unitData = {
      id: 'x',
    };
    if ((!email) && (!phone)) {
      this.postData = {
        unit_id: unit_id,
        action: 'find_unit',
      };
      this.http.put<InterfaceUnits>
        (this.global.urlServer + 'crudactions', this.postData).
        subscribe(data => { this.unitData = data; });

      if (this.unitData.id == '0') { return true }
      else { return false }
    }
  }

  senddeleteUnits(idx) {
    this.postData = {
      id: idx,
      type: 'landlord',
      table: 'units',
      action: 'delete',
    };
    this.http.put(this.global.urlServer + 'crudactions', this.postData).
      subscribe((data) => {
      });
  }

  sendinsertUnit(unitx, phonex, emailx) {
    this.postData = {
      name: unitx,
      phone: phonex,
      email: emailx,
      user_id: this.userData.id,
      type: 'landlord',
      table: 'units',
      action: 'insert',
    };
    this.http.put(this.global.urlServer + 'crudactions', this.postData).
      subscribe((data) => {
      });
  }

  sendupdateUnit(idx, namex, emailx, phonex) {
    this.postData = {
      id: idx,
      name: namex,
      email: emailx,
      phone: phonex,
      type: 'landlord',
      table: 'units',
      action: 'update',
    };
    this.http.put(this.global.urlServer + 'crudactions', this.postData).
      subscribe((data) => {
      });
  }

  async presentToastOk() {
    const toast = await this.toastController.create({
      message: 'Update record was successfull. Enjoy your app ' + this.name,
      duration: 800,
      animated: true,
      showCloseButton: true,
      color: 'success'
    });
    toast.present();
  }

  getUser() {
    return JSON.parse(localStorage.getItem('postLogin'));
  }

  async updateUnit(index, name, email, phone) {
    const alert = await this.alertCtrl.create({
      header: 'Edit',
      inputs: [
        {
          label: 'Unit',
          name: 'name',
          type: 'text',
          id: 'name',
          value: name,
          placeholder: 'Unit',
        },
        {
          label: 'Email',
          name: 'email',
          type: 'email',
          id: 'email',
          value: email,
          placeholder: 'email',
        },
        {
          label: 'Phone',
          name: 'phone',
          type: 'text',
          id: 'phone',
          value: phone,
          placeholder: 'Phone',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            let namex = data.name;
            let emailx = data.email;
            let phonex = data.phone;
            console.log('Confirm Ok');
            this.sendupdateUnit(index, namex, emailx, phonex);
            this.readUnits();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteUnit(index, name, email, phone) {
    const alert = await this.alertCtrl.create({
      header: 'Delete the units id ' + index + ' Unit:' + name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: data => {
            console.log(index);
            this.senddeleteUnits(index);
            this.readUnits();
          }
        }
      ]
    });
    await alert.present();
  }

  async insertUnit() {
    const alert = await this.alertCtrl.create({
      header: 'Edit',
      inputs: [
        {
          label: 'Unit',
          name: 'unit',
          type: 'text',
          id: 'unit',
          value: '',
          placeholder: 'Unit',
        },
        {
          label: 'Phone',
          name: 'phone',
          type: 'text',
          id: 'phone',
          value: '',
          placeholder: 'Phone',
        },
        {
          label: 'Email',
          name: 'email',
          type: 'email',
          id: 'email',
          value: '',
          placeholder: 'E-mail',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            let unit = data.unit;
            let phone = data.phone;
            let email = data.email;

            console.log('Insert Ok');
            this.sendinsertUnit(unit, phone, email);
            this.readUnits();
          }
        }
      ]
    });
    await alert.present();
  }

  async detailUnit(id, name, email, phone) {
    const alert = await this.alertCtrl.create({
      header: 'Detail',
      inputs: [
        {
          label: 'id',
          name: 'id',
          type: 'text',
          id: 'id',
          value: id,
          placeholder: 'id',
        },
        {
          label: 'name',
          name: 'name',
          type: 'text',
          id: 'name',
          value: name,
          placeholder: 'name',
        },
        {
          label: 'Phone',
          name: 'phone',
          type: 'text',
          id: 'phone',
          value: phone,
          placeholder: 'Phone',
        },
        {
          label: 'Email',
          name: 'email',
          type: 'email',
          id: 'email',
          value: email,
          placeholder: 'E-mail',
        },
      ],
      buttons: [
         {
          text: 'Ok',
          handler: data => {
          }
        }
      ]
    });
    await alert.present();
  }
}