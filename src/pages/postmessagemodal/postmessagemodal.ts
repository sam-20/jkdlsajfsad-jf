import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PostProvider } from '../../providers/post-provider';
import { Camera, CameraOptions } from '@ionic-native/camera'; /******************************************1 */
import { ActionSheetController } from 'ionic-angular'; /*****************************************************4 */
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
  selector: 'page-postmessagemodal',
  templateUrl: 'postmessagemodal.html',
})
export class PostmessagemodalPage {

  cameraData: string; //this will contain the image that will be sent to the database
  base64Image: string;

  display: any; //condition that displays card (if == true ) or hides card (if == false)  

  //default values for some of the message content that will be sent to database
  //nb: we didnt include message time stamp because we'd let the php generate it for us
  messagelikes: number = 0;
  messagecomments: number = 0;
  messagetextareainput: any; //binded to our message textarea field


  /**  we want to know whether a user added a pic to the message or not
   * this will enable us know which of the insert statements we should use **/
  addpicture: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private photoViewer: PhotoViewer,
    public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController,
    private postPvdr: PostProvider, private camera: Camera,
    public mymodulevariables: ModulevariablesProvider,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostmessagemodalPage');
  }


  //upload picture action sheet options           
  presentActionSheet() {                  /************************************************************************6 */
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


  //camera and gallery functions
  //this is what happens when user selects camera from the action sheet options
  openCamera() {   /***************************************************************************3 */
    const options: CameraOptions = {
      quality: 100, //quality of pic is reduced from 100 to 50 to allow small base64 code to be sent to api
      // targetWidth: 320,
      // targetHeight: 200, //size to scale image to
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI

      //if user takes a pic and its chosen we show the card
      if (imageData) {
        this.showcard();
        this.addpicture = true; //user will add picture to message
      }
      //if no pic is chosen or selected
      else {
        this.hidecard();
        this.addpicture = false; //user will not add picture to message
      }

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      console.log("camera data: ", this.cameraData)
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image
    }, (err) => {
      // Handle error
    });
  }



  //this is what happens when user selects photos from the action sheet options
  openPhotos() {   /***************************************************************************3 */
    const options: CameraOptions = {
      quality: 100, //quality of pic is reduced from 100 to 50 to allow small base64 code to be sent to api
      // targetWidth: 320,
      // targetHeight: 200, //size to scale image to 
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI

      //if user takes a pic and its chosen we show the card
      if (imageData) {
        this.showcard();
        this.addpicture = true; //user will add picture to message
      }
      //if no pic is chosen or selected
      else {
        this.hidecard();
        this.addpicture = false; //user will not add picture to message
      }

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      console.log("camera data: ", this.cameraData)
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image
    }, (err) => {
      // Handle error
    });
  }

  //delete message picture
  deletephoto() {
    this.base64Image = null;
    this.hidecard(); //hide the card
  }

  //this function shows the picture message card
  showcard() {
    this.display = true;
  }

  //this function hides the picture message card
  hidecard() {
    this.display = false;
  }

  //send or post message
  sendmessage() {
    //remove white spaces in text entered
    try {
      this.messagetextareainput = this.messagetextareainput.toString().trim()
    } catch (e) {
      console.log(e)
    }


    /**before we send message we want to know if user will add an image or not */

    //if picture will be added to the message
    if (this.addpicture == true) {
      let body = {
        messageDB: this.messagetextareainput,
        message_mediaDB: this.cameraData,
        likesDB: this.messagelikes,
        commentsDB: this.messagecomments,
        user_idDB: this.mymodulevariables.globaluserid,
        mydbfunc: 'insertmsgwithmedia'
      };

      //now we are inserting the data to the api db server
      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      });

      //now we can finally leave the page
      this.viewCtrl.dismiss();
    }

    //if no picture will be added to the message
    else if (this.addpicture == false) {

      //if no picture is being added to the message then we should enter the text area is not empty
      if (!(this.messagetextareainput)) {
        this.Toastvalidation("enter a message")
      }

      //if theres a text then we can proceed to send our message to the db
      else {
        let body = {
          messageDB: this.messagetextareainput,
          likesDB: this.messagelikes,
          commentsDB: this.messagecomments,
          user_idDB: this.mymodulevariables.globaluserid,
          mydbfunc: 'insertmsgwithoutmedia'
        };

        //now we are inserting the data to the api db server
        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
        });

        //now we can finally leave the page
        this.viewCtrl.dismiss();
      }
    }
  }


  //view selected message image in full
  viewimage() {
    this.photoViewer.show(this.base64Image);
  }

  //toast for validation
  Toastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


}
