import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast } from 'ionic-angular';
import Parse from 'parse'
import { HometabsPage } from '../hometabs/hometabs';
import {Storage} from '@ionic/storage'
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  logged: boolean = null
  constructor(private storage: Storage, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    Parse.initialize("rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx", "5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky");
   	Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);
      this.toastCtrl.create({
        message: 'Logged out successfully',
        duration: 2000
      }).present();
      this.storage.set("logged", null)
    }, err => {
      console.log('Error logging out', err);  
      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).present();
    })
  }

  loginPage() {
    this.navCtrl.push(LoginPage)
  }

  signUpPage() {
    this.navCtrl.push(SignUpPage)
  }

  ionViewWillEnter() {
    this.storage.get('logged').then((userid)=>{
      this.logged = true
    })
  }

}

