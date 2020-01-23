import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; 
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public userData: any;
  public postData: any;
  public errorUpdateUserClasse: string = 'Sorry, wrong update your profile! Plase try again!';
  public okUpdateUserClasse: string = 'Update your profile with success!';

  constructor(private router: Router,
    public http: HttpClient,
    private toastController: ToastController,  
    public global: GlobalService
  ){}
  
  ngOnInit() {
    this.userData = this.getUser();
  }

  gotoLandLord() {
    this.userData.classe = 'LANDLORD';
    this.postData = {
      id: this.userData.id,
      phone: this.userData.phone,
      email: this.userData.email,
      classe: this.userData.classe
    };
    this.http.put(this.global.urlServer + "classeToLandLord", this.postData)
    .subscribe((data) => {
      this.userData = data;
      if ( this.userData.id == 0 ) {
        // 0 = Nao encontrei o usuario cadastrado em nenhuma unidade nem com email e nem com telefone.
        this.presentToast();
      this.router.navigateByUrl('/login');
    } else {        
      error => {
      this.presentToast();
      console.log(error);
    }}});    
    this.saveUser(this.postData);
    this.router.navigate(['/home']);
  }
  
  gotoTenant() {
    this.postData = {
      id: this.userData.id,
      phone: this.userData.phone,
      email: this.userData.email,
      classe: this.userData.classe
    };
    this.http.put(this.global.urlServer + "classeToTenant", this.postData).subscribe((data) => {
      this.userData = data;
      if ( this.userData.id == 0 ) {
        // 0 = Nao encontrei o usuario cadastrado em nenhuma unidade nem com email e nem com telefone.
        this.presentToast();
        this.router.navigate(['/login/']); 
      } else { 
        this.postData.classe = 'TENANT';
        this.saveUser(this.postData);
        this.router.navigate(['/home']);
        return (false);
      }
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.errorUpdateUserClasse,
      duration: 800,
      animated: true,
      showCloseButton: true,
      color: "danger"
    });
    toast.present();
  }

  saveUser($postData: any) {
    localStorage.setItem('postLogin', JSON.stringify($postData));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('postLogin'));
  }

}