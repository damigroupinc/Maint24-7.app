import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IDataTutorial } from './IDataTutorial';
import { SyncRequestClient } from 'ts-sync-request/dist'

import { GlobalService } from '../global.service';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  public dataUrl: string;
  public alltexts: any;
  public page_layout: any;
  public page_buttons: any;
  public page_slides: any;
  public page_layout_name: string;
  public page_layout_titulo: string;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    public global: GlobalService
  ) {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,

    }
  }

  ngOnInit() {
    this.alltexts = new SyncRequestClient().get<Response>("assets/img/tutorial/tutorialenus.JSON");
    this.page_layout =  this.alltexts[0].PAGE_LAYOUT;
    this.page_buttons = this.alltexts[1].PAGE_BUTTONS;
    this.page_slides =  this.alltexts[2].PAGE_SLIDES;
    this.page_layout_name = this.alltexts[0].PAGE_LAYOUT.name;
    this.page_layout_titulo = this.alltexts[0].PAGE_LAYOUT.titulo;
  }
  
  getData() {
    return this.http.get("assets/img/tutorial/tutorialenus.JSON");
  }

  goFunction( i: number ) {
    if (i == 0) {
      this.router.navigate(['/recover']);
    } else if (i == 1 ) {
      this.router.navigate(['/register']);
    } else if (i == 2 ) {
      this.router.navigate(['/login']);
    }
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
}