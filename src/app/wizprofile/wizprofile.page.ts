import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { InterfaceUsers } from '../interfaceusers';
import { Router } from '@angular/router';

import { ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-wizprofile',
  templateUrl: './wizprofile.page.html',
  styleUrls: ['./wizprofile.page.scss'],
})
export class WizprofilePage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false
  };

  public userData: InterfaceUsers;
  public postData: any;
  public dataAux: any;

  /* login */
  public username: string = "";
  public password: string = "";
  public confirmpassword: string = "";
  public email: string = "";
  public phone: string = "";

  /* address */
  public country: string = "";
  public address: string = "";
  public city: string = "";
  public state: string = "";
  public zipcode: string = "";

  /* info */
  public firstname: string = "";
  public lastname: string = "";
  public bloodtype: string = "";
  public dateofbirth: string = "";
  public classe: string = "";
  public status: string = "";
  public image: string = "";
  public id: number = 0;

  public showSkip = false;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    public global: GlobalService,
    public menu: MenuController,
    public http: HttpClient) { }

  ngOnInit() {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [{}]
    };
    this.userData = this.global.getUser();
    console.log(' arrancar daqui ', this.userData);
    this.searchCompleteUserData();

    this.username = this.userData.username;
    this.password = this.userData.password;
    this.email = this.userData.email;
    this.phone = this.userData.phone;
    this.firstname = this.userData.firstname;
    this.lastname = this.userData.lastname;
    this.classe = this.userData.classe;
    this.image = this.userData.image;
    this.id = this.userData.id;

  };

  searchCompleteUserData() {
    let postData = {
      "id": this.userData.id,
    }
    this.http.put<InterfaceUsers>(this.global.urlServer + "searchCompleteUserData", postData).
      subscribe(data => {
        this.userData = data;
        if (this.userData.id == 0) {
          this.global.presentToastGeneric('Sorry, wrong login! Plase try again!', 'danger');
          this.router.navigate(['/tutorial']);
        } else {
          /* login */
          this.username = data.username;
          this.email = data.email;
          this.phone = data.phone;
          /* address */
          this.country = data.country;
          this.address = data.address;
          this.city = data.city;
          this.state = data.state;
          this.zipcode = data.zipcode;
          /* info */
          this.firstname = data.firstname;
          this.lastname = data.lastname;
          this.bloodtype = data.bloodtype;
          this.dateofbirth = data.birth;
          console.log(' dados retornado do banco -->', data);
          console.log(this.firstname);
        }
      })
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    })
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    })
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }

  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isfEndSlide = istrue;
    });
  }

  takePicture() {
    this.router.navigate(['/avatar'])
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  updateUser() {
    if (this.confirmpassword == this.password) {
      this.postData = {
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
        firstname: this.firstname,
        lastname: this.lastname,
        classe: this.classe,
      };
      this.dataAux = {
        id: "",
        message: ""
      }
      this.http.put(this.global.urlServer + 'newUserMobile', this.postData).
        subscribe((data) => {
          this.dataAux = data;
          if (this.dataAux.id === "email") {
            this.global.presentToastGeneric('Sorry, This email exist in database. Plase try again!', "danger");
          } else if (this.dataAux.id === 'phone') {
            this.global.presentToastGeneric('Sorry, This Phone exist in database. Plase try again!', "danger");
          } else if (this.dataAux.id === 'username') {
            this.global.presentToastGeneric('Sorry, This UserName exist in database. Plase try again!', "danger");
          } else if (this.dataAux.id === 0) {
            this.global.presentToastGeneric('Sorry, wrong login! Plase try again!', "danger");
          } else {
            this.login();
          }
        })
    } else {
      this.global.presentToastGeneric('Plase, confirm password!', "danger");
    }
  }

  login() {
    return true;
  }

  sendPostRequest() {
    let postData = {
      "username": this.username,
      "password": this.password
    }
    this.http.put<InterfaceUsers>(this.global.urlServer + "seekUser", postData).
      subscribe(data => {
        this.userData = data;
        if (this.userData.id == 0) {
          this.global.presentToastGeneric('Sorry, wrong login! Plase try again!', "danger");
          this.router.navigateByUrl('/login');
        } else {
          let postData = {
            "id": this.userData.id,
            "firstname": this.userData.firstname,
            "lastname": this.userData.lastname,
            "classe": this.userData.classe,
            "status": this.userData.status,
            "email": this.userData.email,
            "phone": this.userData.phone,
            "image": this.userData.image,
          }
          this.global.saveUser(postData);
          this.global.presentToastGeneric('Login was successfull. Enjoy your app!', "success");
          this.router.navigate(['/welcome']);
        }
      })
  }

  updateUserProfile() {
    this.postData = {
      "username": this.username,
      "password": this.password,
      "email": this.email,
      "phone": this.phone,
      "country": this.country,
      "address": this.address,
      "city": this.city,
      "state": this.state,
      "zipcode": this.zipcode,
      "name": this.lastname,
      "firstname": this.firstname,
      "lastname": this.lastname,
      "birth": this.dateofbirth,
      "classe": this.classe,
      "user_id": this.userData.id,
      "id": this.userData.id,
    }
    console.log(' antes de tudo ', this.postData);
    this.http.put<InterfaceUsers>(this.global.urlServer + "saveLoginProfile", this.postData).
      subscribe(data => { })
  }
}