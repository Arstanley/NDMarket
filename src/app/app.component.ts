import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { HometabsPage } from '../pages/hometabs/hometabs';

import Parse from 'parse'
import { ParseError } from '@angular/compiler';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HometabsPage

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    Parse.initialize('rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx', '5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky')
    Parse.serveURL = 'https://parseapi.back4app.com/'
  }
}

