import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import {File} from '@ionic-native/file'
import Parse from 'parse'
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
  constructor(public file: File, private sanitizer: DomSanitizer,private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {
    Parse.initialize("rf2NBv5Xp2401bA8qdEVOTpsw04gjuUjyzgQBwZx", "5T7hpBGbnVOAsh2dcwnFSHzoZTk1miTvwqXqo7ky");
   	Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewItemPage');
  }
  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetHeight: 1024,
      targetWidth: 1024
    }
    
    this.camera.getPicture(options).then((imageData) => {
      //needs to import file plugin
      //split the file and the path from FILE_URI result
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
      //then use the method reasDataURL  btw. var_picture is ur image variable
      this.file.readAsDataURL(path, filename).then(res=> this.myphoto = res  );
      this.takenPhoto = true
    })
  }

  submit() {
    
  }
}
