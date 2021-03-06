import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { NewItemPage } from '../new-item/new-item';
import Parse from 'parse'
import { query } from '@angular/core/src/animation/dsl';
import { ItemDetailPage } from '../item-detail/item-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public toggled:boolean = false;
  user: any
  items: Array<{name: string, description: string, imageURL: any, id: any, price: any}>
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController) {
    Parse.initialize("rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx", "5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  async load() {
    const User = Parse.User
    var query = new Parse.Query(User);
    this.storage.get('logged').then((userid)=>{
      console.log(userid)
      if (userid != null) {
        query.get(userid).then((user)=>{
          console.log(user)
          this.user = user
        })
      }
    })
    const loading = this.loadingCtrl.create({
      spinner: "dots",
    })
    loading.present()
    await this.parse()
    loading.dismiss()
  }

  async parse() {
    console.log(this.user)
    const Item = Parse.Object.extend("Items")
    const q = new Parse.Query(Item)
    if (this.user != null) {
      q.notEqualTo("user", this.user)
    }
    const results = await q.find();
    this.items = []
    for (let i = 0; i < results.length; ++i) {
      this.items.push({
        name: results[i].get('name'),
        price: results[i].get('price'),
        description: results[i].get('description'),
        imageURL: results[i].get('Image').url(), 
        id: results[i].id,
      })
    }
  }

  clickSearchToggle() {
    this.toggled = !this.toggled
  }
  
  async triggerInput(ev: any) {
    await this.load()
    let val = ev.target.value
    this.items = this.items.filter((item) => {
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
    })
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

  openDetailPage(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    })
  }

  ionViewWillEnter() {
    this.load()
  }
}
