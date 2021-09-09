import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController, ModalController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular'; 
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
  selector: 'page-creategroup',
  templateUrl: 'creategroup.html',
})
export class CreategroupPage {

  groupnameinput: any;
  groupdescriptioninput: any;

  base64Image: string;
  cameraData: string;

  addpicture: boolean = false;

  defaultgroupprofilepic: string = "/assets/imgs/defaultgroupprofilepic.jpg"; 


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private postPvdr: PostProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private photoViewer: PhotoViewer,
    private modalCtrl: ModalController,
    private camera: Camera,
    public mymodulevariables: ModulevariablesProvider,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreategroupPage');
  }


  deleteprofilepic() {
    this.defaultgroupprofilepic = "/assets/imgs/defaultgroupprofilepic.jpg"; 
  }

         
  presentActionSheet() {                 
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Media',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.openCamera();
          }
        }, {
          text: 'Photos',
          icon: 'images',
          handler: () => {
            this.openPhotos();
          }
        }
      ]
    });
    actionSheet.present();
  }


  openCamera() {  
    const options: CameraOptions = {
      quality: 100, 
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.addpicture = true; 
      }
      else {
        this.addpicture = false; 
      }

      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; 
      this.defaultgroupprofilepic = this.base64Image; 
    }, (err) => {
    });
  }



  openPhotos() { 
    const options: CameraOptions = {
      quality: 100, 
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.addpicture = true; 
      }
      else {
        this.addpicture = false;
      }

      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.defaultgroupprofilepic = this.base64Image; 
    }, (err) => {
    });
  }


  creategroup() {
    try {
      this.groupnameinput = this.groupnameinput.toString().trim()
    } catch (e) {
      console.log(e)
    }

    if (!(this.groupnameinput)) {
      console.log("no groupname!")
      this.toastvalidation("Provide a group name")
    }

    else {
      console.log(this.groupnameinput);

      if (this.addpicture == true) {
        console.log("picture to be added")

        if (!(this.groupdescriptioninput)) {
          this.groupdescriptioninput = null;
        }

        let body = {
          groupnameDB: this.groupnameinput,
          groupprofilepicDB: this.cameraData,
          groupdescriptionDB: this.groupdescriptioninput,
          loggedinuseridDB: this.mymodulevariables.globaluserid, 
          mydbfunc: 'createnewgroup_withprofilepic'
        };

        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

          console.log("raw data from db:", data);

          var integerconvertedid: any = parseInt(data);
          console.log("converted data from db into integer :", integerconvertedid);

          var stringconvertedid: any = integerconvertedid.toString();
          console.log("converted data from db into string :", stringconvertedid);

          localStorage.setItem('storednewlycreatedgroupid', stringconvertedid);

          this.groupnameinput = "";
          this.groupdescriptioninput = "";

          const modal = this.modalCtrl.create('AddgroupmembersPage');
          modal.present();
        });
      }

      else if (this.addpicture == false) {
        console.log("no picture to be added")

        if (!(this.groupdescriptioninput)) {
          this.groupdescriptioninput = null;
        }

        let body = {
          groupnameDB: this.groupnameinput,
          groupdescriptionDB: this.groupdescriptioninput,
          loggedinuseridDB: this.mymodulevariables.globaluserid,
          mydbfunc: 'createnewgroup_withoutprofilepic'
        };

        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

          console.log("raw data from db:", data);

          var integerconvertedid: any = parseInt(data);
          console.log("converted data from db into integer :", integerconvertedid);

          var stringconvertedid: any = integerconvertedid.toString();
          console.log("converted data from db into string :", stringconvertedid);

          localStorage.setItem('storednewlycreatedgroupid', stringconvertedid);

          this.groupnameinput = "";
          this.groupdescriptioninput = ""

          const modal = this.modalCtrl.create('AddgroupmembersPage');
          modal.present();
        });
      }
    }
  }

  toastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}

