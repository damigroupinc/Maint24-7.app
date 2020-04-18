import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';

import { InterfaceContract } from '../InterfaceContract';
import { InterfaceFinance } from '../interfaceFinance';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  public paymentAmount: string = '0.00';
  public currency: string = 'USD';
  public currencyIcon: string = '$';
  public paypalid: string = '';

  public postData: any;
  public userData: any;

  public listContracts: InterfaceContract;

  constructor(
    public global: GlobalService,
    public http: HttpClient,
    private router: Router,
    private payPal: PayPal) { }

  ngOnInit() {
    this.userData = this.global.getUser();
    //this.paymentAmount = '0.50';
    //this.paypalid = 
    //'ARzM-lszQ2f_fv5Uw5fnFoIkDmKQi46UpXk6nSi_HRVz6pxj8Jwat8X495c-SH2-eHGhOP69eQovItiX';

    this.postData = {
      user_id: this.userData.id,
      classe: 'TENANT',
    };
    this.http.put<InterfaceContract>
      (this.global.urlServer + 'infoContract', this.postData).
      subscribe(data => {
        this.listContracts = data;
      });

  }

  payWithPaypal(
    paypalid: string,
    paypalrent: string,
    unit: string,
    contract: string,
    landlord: string,
    tenant: string
  ) {

    console.log(
      'paypal  ==> ', paypalid,
      'paypalrent ==> ', paypalrent,
      'unit  ==> ', unit,
      'contract  ==> ', contract,
      'landlord  ==> ', landlord,
      'paypal  ==> ', tenant);


    this.payPal.init({
      PayPalEnvironmentProduction: '0',
      PayPalEnvironmentSandbox: paypalid,
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        //
        let payment = new PayPalPayment(paypalrent, 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          this.saveFinance(paypalid, paypalrent, unit, contract, landlord, tenant);
          this.global.presentToastGeneric('We received your payment and update the records. Thanks!', 'success');
          this.router.navigate(['/home']);
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  private newMethod(): string {
    return this.currency;
  }

  saveFinance($paypalid: string, $paypalrent: string, $unit: string, $contract: string, $landlord: string, $tenant: string) {
    this.postData = {
      paypalid: $paypalid,
      paypalrent: $paypalrent,
      unit: $unit,
      contract: $contract,
      landlord: $landlord,
      tenant: $tenant
    };
    this.http.put<InterfaceFinance>
      (this.global.urlServer + 'saveFinance', this.postData).
      subscribe(data => { });
  };

  getUser() {
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}