import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Alert, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import {File} from '@ionic-native/file'
import {Storage} from '@ionic/storage'
import Parse from 'parse'
import { query } from '@angular/core/src/render3/instructions';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { SelectorMatcher } from '@angular/compiler';
/**
 * Generated class for the NewItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {

  myphoto: any
  takenPhoto: boolean = false
  user: any
  name: string
  description: any
  photofile: any
  price: any
  email: string
  number: any 
  wechat: string
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private storage: Storage, public file: File, private sanitizer: DomSanitizer,private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {
    Parse.initialize("rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx", "5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    const User = Parse.User
    var query = new Parse.Query(User);
    storage.get('logged').then((userid)=>{
      query.get(userid).then((user)=>{
        this.user = user
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewItemPage');
  }
  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetHeight: 1024,
      targetWidth: 1024
    }
    
    this.camera.getPicture(options).then((imageData) => {
      //needs to import file plugin
      //split the file and the path from FILE_URI result
      this.photofile = 'data:image/jpeg;base64,' + imageData;
      this.takenPhoto = true
    })
  }
  async loading() {
    const loading = this.loadingCtrl.create({
      spinner: "dots",
      duration: 10000
    })
    loading.present()
    await this.submit()
    loading.dismiss()
  }

  checkInput() {
    if (this.name == "") {
      this.alertCtrl.create({
        message: "Please enter a name for your object"
      }).present()
      return false
    } else if(this.takenPhoto == false) {
      this.alertCtrl.create({
        message: "Please add at least one photo for your object"
      }).present()
      return false 
    } else if ((this.email == "" && this.wechat == "") && this.number == "") {
      this.alertCtrl.create({
        message: "Please add at least one contact information"
      }).present()
      return false 
    } else if (this.price="") {
      this.alertCtrl.create({
        message: "Please enter a price for your object"
      }).present()
      return false 
    } 
    return true
  }
  
  submit() {
    if (this.checkInput()) {
      var ParseFile = new Parse.File("item.jpg", {base64: this.photofile});
      const Item = Parse.Object.extend("Items")
      var item = new Item();
      item.set("user", this.user)
      item.set("name", this.name)
      item.set("description", this.description)
      item.set("price", this.price)
      item.set("Image", ParseFile)
      item.save().then(()=>{
        this.toastCtrl.create (
          {
            message: "Success",
            duration: 2000
          }
        ).present()
      }, (err) => {
        alert('Error occurs in updating')
        alert(err.message)
      }) 
    }
  }

  encodeImageFileAsURL(file) {
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);
  }
}
