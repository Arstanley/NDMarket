import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import Parse from 'parse'
import {Storage} from '@ionic/storage'
import {NewItemPage} from '../new-item/new-item'
import { HometabsPage } from '../hometabs/hometabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: String
  password: String

  constructor(private storage: Storage, public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    Parse.initialize("rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx", "5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky");
   	Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
    Parse.User.logIn(this.username, this.password).then((user) => {
        console.log('Logged in successfully', user);
          if(user.get('emailVerified')) {
            // If you app has Tabs, set root to TabsPage
            this.navCtrl.setRoot(HometabsPage)
            this.navCtrl.push(NewItemPage)
            this.storage.set("logged", user.id)
        } else {
            Parse.User.logOut().then((resp) => {
                console.log('Logged out successfully', resp);
            }, err => {
                console.log('Error logging out', err);
            });

            this.alertCtrl.create({
                title: 'E-mail verification needed',
                message: 'Your e-mail address must be verified before logging in.',
                buttons: ['Ok']
            }).present();
        }
    }, err => {
        console.log('Error logging in', err);

        this.toastCtrl.create({
        message: err.message,
        duration: 2000
        }).present();
    });
}
}
