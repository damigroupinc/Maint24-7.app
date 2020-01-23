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
export class TutorialPage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  public dataUrl: string;
  public textos: any;
  
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.textos = this.getData();
    console.log(' Olha aqui os ----> ', this.textos);
  }

  getData() {
    this.http.get("assets/img/tutorial/tutorialenus.JSON").subscribe
    (response => { this.textos = response; 
      console.log(' textos ==>', this.textos); return this.textos; });
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goSignup() {
    this.router.navigate(['/register']);
  }

  goRecover() {
    this.router.navigate(['/recover']);
  }

  slideNext() {
    this.slideWithNav.slideNext();
  }

  slidePrev() {
    this.slideWithNav.slidePrev();
  }
}
