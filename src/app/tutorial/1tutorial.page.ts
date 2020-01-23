import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IDataTutorial } from './IDataTutorial';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {
  @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;
  sliderOne: any;
  
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  };

  public dataUrl: string;
  public textos: any;

  constructor(
    private http: HttpClient,    
    private router: Router,
  ) {
    this.textos = this.getData();
    console.log(" aqui que temos a variavel texto", this.textos);
    
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 1,
          image: '../../assets/images/slide1.jpg'
        },
        {
          id: 2,
          image: '../../assets/images/slide2.jpg'
        },
        {
          id: 3,
          image: '../../assets/images/slide3.jpg'
        },
        {
          id: 3,
          image: '../../assets/images/slide4.jpg'
        }
      ]
    };}

    getData() { 
      return this.http.get("assets/img/tutorial/tutorialenus.JSON").subscribe((data) => { console.log(" aqui tem os datas: ", data) });
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
    });;
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

  goLogin() {
    this.router.navigate(['/login']);
  }

  goSignup() {
    this.router.navigate(['/register']);
  }
  
  goRecover(){
    this.router.navigate(['/recover']);
  }
}
