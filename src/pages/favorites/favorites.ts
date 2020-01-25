import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import Parse from 'parse'
import {Storage} from '@ionic/storage'
import { loadavg } from 'os';
import { LoginPage } from '../login/login';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favorites_list: Array<any>
  items: Array<{name: string, description: string, imageURL: any, id: any, price: any}>
  constructor(private storage: Storage, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    Parse.initialize("rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx", "5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ionViewWillEnter() {
    this.loadData()
  }

  async loadData() {
    const loading = this.loadingCtrl.create({
      spinner: "dots",
    })
    loading.present()
    await this.parse()
    loading.dismiss()
  }

  async parse() {
    this.storage.get('logged').then(async (data)=>{
      if (data) {
        const Usr = Parse.Object.extend('User')
        const q = new Parse.Query(Usr)

        await q.get(data).then(async (user)=>{
          this.favorites_list = await user.get('Favorites')
        })

        const Item = Parse.Object.extend('Items')
        const q_item = new Parse.Query(Item)
        this.items = []
        
        for (let i = 0; i < this.favorites_list.length; ++i) {
          
          var cur_item = await q_item.get(this.favorites_list[i])
         
          this.items.push({
            name: cur_item.get('name'),
            description: cur_item.get('description'),
            imageURL: cur_item.get('Image').url(),
            id: cur_item.get('id'),
            price: cur_item.get('price')
          })
        }

      } else {
        this.alertCtrl.create({
          message: 'Please login to continue',
          buttons: [
            {text: "Login", 
             handler: () => {
              this.navCtrl.push(LoginPage)
              }
            }, 
            {text: 'Cancel',
             role: 'cancel'}
          ]
        }).present()
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

}
