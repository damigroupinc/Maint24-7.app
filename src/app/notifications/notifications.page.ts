import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { InterfaceNotifications } from 'app/interfaceNotifications';
import { Router } from '@angular/router';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public listNotifications: InterfaceNotifications;
  public postData: any;
  public image: any;
  public userData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public http: HttpClient,
    public global: GlobalService
  ) { }

  ngOnInit() {
    this.userData = this.global.getUser();
    this.postData = {
      user_id: this.userData.id,
    };
    this.http.put<InterfaceNotifications>(
      this.global.urlServer + 'listNotifications', this.postData).
      subscribe(data => { this.listNotifications = data; });
  }

  checkTenLan(kind: string) {
    if (kind == 'LANDLORD') { return true }
    else {
      return false
    }
  }

  goSeeDocto($docto_id, $kind) {
    let $param = JSON.stringify({ id: $docto_id });
    this.router.navigate(['/viewservices/' + $param]);
  }

}
