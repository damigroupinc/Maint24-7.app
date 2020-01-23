import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  public postData: any;
  public userData: any;
  public email: any;

  constructor(
    private router: Router,
    public global: GlobalService,
    public http: HttpClient ) {}

  ngOnInit() {
    this.userData = this.global.getUser();
  }

  sendEmailChangePassword() {
    this.postData = {
      email: this.email
    };
    this.http.put(this.global.urlServer + 'searchPassword', this.postData).subscribe((data) => {
      this.global.presentToastGeneric('The your password sended for email!', 'success');
      this.router.navigateByUrl('/login');
    }, error => {
      this.global.presentToastGeneric("Please make sure you're connected to the internet and try again.", 'danger');
    });
  }
}

/*
Informe o seu email ou o phone number resitrados no database e a sua senha ser'a enviada por mensagem de texto
'The your password sended for email!', 'success'
"Please make sure you're connected to the internet and try again.
*/