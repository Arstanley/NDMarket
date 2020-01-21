import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import Parse from 'parse'
import {Storage} from '@ionic/storage'
import { loadavg } from 'os';

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
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
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
    this.storage.get('logged').then((data)=>{
      if (data) {
        const Usr = Parse.Object.extend('User')
        const q = new Parse.Query(Usr)

        q.get(data).then((user)=>{
          user.get('Favorites').then((res)=>{
            console.log(res)
          })
          
        })

        const Item = Parse.Object.extend('Items')
        const q_item = new Parse.Query(Item)
        this.items = []

        for (let i = 0; i < this.favorites_list.length; ++i) {
          var cur_item = q_item.get(this.favorites_list[i])
          this.items.push({
            name: cur_item.name,
            description: cur_item.description,
            imageURL: cur_item.Image.url(),
            id: cur_item.id,
            price: cur_item.price
          })
        }

      } else {

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

}
