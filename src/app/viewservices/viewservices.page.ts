import { ServiceordersService } from '../serviceorders.service';
import { InterfaceOrders } from '../interfaceorders';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-viewservices',
  templateUrl: './viewservices.page.html',
  styleUrls: ['./viewservices.page.scss'],
})
export class ViewservicesPage implements OnInit {

  public postData: any;
  public userData: any;
  public listTodayOrders: InterfaceOrders;
  public data_return: InterfaceOrders;
  public order_param: any;
  public order_id: string;

  public strMessageWOok: string = 'New Order Deleted!';
  public strMessageWOerror: string = 'Error to delete WorkOrder!';

  constructor(
    public serviceordersservice: ServiceordersService,
    private activaterouter: ActivatedRoute,
    public alertController: AlertController,
    private router: Router,
    public global: GlobalService,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.userData = this.global.getUser();
    this.activaterouter.paramMap.subscribe(params => {
      this.order_param = JSON.parse(params.get('id'));
    });
    if (this.order_param.id != 0) {
      this.postData = {
        id: this.order_param.id,
        classe: 'TENANT',
      }
    };
    this.http.put<InterfaceOrders>
      (this.global.urlServer + 'todayOrdersUsers', this.userData).
      subscribe(data => { this.listTodayOrders = data; console.log(data) });
  }

  ImLandLord() {
    if (this.userData.classe != 'LANDLORD') { return true } else { return false };
  }

  canDeleteOrder(status: string, classe: string) {
    if (status == 'CREATED' && this.userData.classe == classe) { return true } else { return false };
  }

  canStartOrder(status: string) {
    if (status == 'CREATED' && this.userData.classe == 'LANDLORD') { return true } else { return false };
  }

  canCloseOrder(status: string) {
    if (status == 'PROCESS' && this.userData.classe == 'LANDLORD') { return true } else { return false };
  }

  canApproveOrder(status: string) {
    if (status == 'CLOSED') { return true } else { return false };
  }

  takePicture(
    $id: string,
    $building: string,
    $unit: string,
    $date_created: string,
    $status: string) {
    let $param = JSON.stringify({
      id: $id,
      building: $building, unit: $unit, date_created: $date_created, status: $status
    });
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
    $status: string) {
    let $param = JSON.stringify({
      id: $id,
      building: $building, unit: $unit, date_created: $date_created, status: $status
    });
    this.router.navigate(['/startorder/' + $param]);
  }

  closeOrder(
    $id: string,
    $building: string,
    $unit: string,
    $date_created: string,
    $status: string) {
    let $param = JSON.stringify({
      id: $id,
      building: $building, unit: $unit, date_created: $date_created, status: $status
    });
    this.router.navigate(['/closeorder/' + $param]);
  }

  approveOrder(
    $id: string,
    $building: string,
    $unit: string,
    $date_created: string,
    $status: string) {
    let $param = JSON.stringify({
      id: $id,
      building: $building, unit: $unit, date_created: $date_created, status: $status
    });
    this.router.navigate(['/approveorder/' + $param]);
  }

  historyOrder(
    $id: string,
    $building: string,
    $unit: string,
    $date_created: string,
    $status: string) {
    let $param = JSON.stringify({
      id: $id,
      building: $building, unit: $unit, date_created: $date_created, status: $status
    });
    this.router.navigate(['/history/' + $param])
  }

  deleteOrder($id: string) {
    this.makeyouShure($id);
    this.router.navigate(['/home/']);
  }

  async makeyouShure($id: string) {
    let trueReturn = false;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you shure what delete this WorkOrder?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.deleteHTTPWorkOrder($id)
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  deleteHTTPWorkOrder($id: string) {
    /* first -> question for make you shure */
    let postData = {
      id: $id,
      user_id: this.userData.id,
    };
    console.log(postData, this.userData);
    this.http.put(this.global.urlServer + 'deleteWOMaster', postData).subscribe((data) => {
      this.global.presentToastGeneric(this.strMessageWOok, 'success');
    }, error => {
      this.global.presentToastGeneric(this.strMessageWOerror, 'danger');
    });
  }

}




