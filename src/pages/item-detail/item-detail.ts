import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import Parse from 'parse'
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import {Storage} from '@ionic/storage'

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  cur_item: any;
  cur_usrname: any;
  description: any;
  pics: Array<any>;
  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private storage: Storage) {
    this.pics = []
    this.cur_item = navParams.get('item');
    Parse.initialize("rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx", "5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    console.log(this.cur_item.price)
  }

  async load(){
    const loading = this.loadingCtrl.create({
      spinner: "dots",
    })
    loading.present()
    await this.fetch()
    loading.dismiss()
  }

  async fetch() {
    this.getPicList()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailPage');
  }

  getPicList() {
    const Item = Parse.Object.extend("Items")
    const q = new Parse.Query(Item)
    q.get(this.cur_item.id).then((item)=> {
      this.pics.push(item.get('Image').url())
      this.cur_usrname = item.get('user').get('username')
      this.description = item.get('description')
      console.log(this.description)
    }
    )
  }

  ionViewWillEnter() {
    this.load()
  }

  save() {
    this.storage.get('logged').then((data)=>{
      if (data) {
        console.log(data)
        const Usr = Parse.Object.extend('User')
        const q = new Parse.Query(Usr)
        q.get(data).then(
          (user)=>{
            user.addUnique('Favorites', this.cur_item.id)
            user.save()
          })
        this.alertCtrl.create({
          title: 'Message',
          message: 'Success! You can now view this item in Favorites.'
        }).present()
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
