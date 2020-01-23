import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Sing-Out',
      url: '/login',
      icon: 'power'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },    
    {
      title: 'Move-In',
      url: '/movein',
      icon: 'movein'
    },    
    {
      title: 'Move-out',
      url: '/moveout',
      icon: 'moveout'
    },
    {
      title: 'profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'about'
    },
    {
      title: 'Tutorial',
      url: '/tutorial',
      icon: 'about'
    }
  ]; 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
/*
    {
      title: 'Change Your Password',
      url: '/changepass',
      icon: 'brush'
    },
    */