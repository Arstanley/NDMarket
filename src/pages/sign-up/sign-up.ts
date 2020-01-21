import { Component } from '@angular/core';
import {ActionSheetController ,IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import Parse from 'parse'
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  username: String
  password: String
  email: String
  takenAvatar: Boolean = true
  photoFile: any
  constructor(public camera: Camera, public actionSheetCtrl: ActionSheetController ,public toastCtrl: ToastController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
    Parse.initialize("rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx", "5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky");
   	Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  showAlert() {
    this.alertCtrl.create({
      title: 'Message',
      message: 'Currently only supporting ND students',
      buttons: ['OK']
    }).present()
  }

  addAvatar() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Input Source',
      buttons: [
        {
          text: "Take Photo",
          handler: () => {
            this.takePhoto()
          }
        },
        {
          text: "Library",
          handler: () => {
            this.selectPhotoFromLibrary()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).present()
  }

  selectPhotoFromLibrary() {

  }

  takePhoto() {
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
      this.photoFile = 'data:image/jpeg;base64,' + imageData;
      this.takenAvatar = true
    })
  }

  signUp() {
    if (this.email.slice(-6) != 'nd.edu') {
      this.alertCtrl.create({
        title: 'Error',
        message: 'You must use a nd affiliated email address',
        buttons: ['OK']
      }).present()
    } else {
      Parse.User.signUp(this.username, this.password, {email: this.email}).then((resp) => {
          console.log('Signed up successfully', resp);

          // Clears up the form
          this.username = '';
          this.password = '';
          this.email = '';

          this.toastCtrl.create({
          message: 'Account created successfully',
          duration: 2000
          }).present();
      }, err => {
          console.log('Error signing in', err);

          this.toastCtrl.create({
          message: err.message,
          duration: 2000
          }).present();
      });
    }
}
}
