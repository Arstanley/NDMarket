import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HometabsPage } from '../pages/hometabs/hometabs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { NewItemPage } from '../pages/new-item/new-item';
import {Camera} from '@ionic-native/camera'
import {File} from '@ionic-native/file'
import { AccountPage } from '../pages/account/account';
import {CommonModule} from '@angular/common'
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { FavoritesPage } from '../pages/favorites/favorites';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {swipeBackEnabled: true}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HometabsPage,
    LoginPage,
    SignUpPage,
    NewItemPage,
    AccountPage,
    ItemDetailPage,
    FavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
