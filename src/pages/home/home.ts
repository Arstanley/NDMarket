import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { NewItemPage } from '../new-item/new-item';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController) {

  }

  addNewItem() {
    this.storage.get('logged').then((data)=>{
      if (data) {
        this.navCtrl.push(NewItemPage)
      } else {
        this.alertCtrl.create({
          title: 'Message', 
          message: 'Need login or sign up to continue',
          buttons: [
            {
              text: 'Login',
              cssClass: 'secondary',
              handler: data=>{
                this.navCtrl.push(LoginPage)
              }
            },
            {
              text: 'Sign Up',
              cssClass: 'secondary',
              handler: data=>{
                this.navCtrl.push(SignUpPage)
              }
            }
          ]
        }).present()
      }
    })
  }
}
