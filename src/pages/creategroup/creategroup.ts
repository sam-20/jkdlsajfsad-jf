import { Component, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController, ModalController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables';
import { Camera, CameraOptions } from '@ionic-native/camera'; /******************************************1 */
import { ActionSheetController } from 'ionic-angular'; /**************************************************** */
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
  selector: 'page-creategroup',
  templateUrl: 'creategroup.html',
})
export class CreategroupPage {

  //variables binded to our input fields
  groupnameinput: any;
  groupdescriptioninput: any;

  //will collect image selcted or taken by camera plugin
  base64Image: string;
  cameraData: string;

  /**  we want to know whether a user added a pic to the group or not
    * this will enable us know which of the insert statements we should use **/
  addpicture: boolean = false;

  //default group profile pic before user decides to change
  defaultgroupprofilepic: string = "/assets/imgs/defaultgroupprofilepic.jpg"; //we set our default profile pic else if pic is null database errors;


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


  //delete profile pic
  deleteprofilepic() {
    this.defaultgroupprofilepic = "/assets/imgs/defaultgroupprofilepic.jpg"; //set profile pic back to default
  }


  //change photo
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


  //this is what happens when user selects camera from the action sheet options
  openCamera() {   /***************************************************************************3 */
    const options: CameraOptions = {
      quality: 100, //quality of pic is reduced from 100 to 50 to allow small base64 code to be sent to api
      // targetWidth: 120,
      // targetHeight: 120, //size to scale image to
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI

      //if user updates profile pic and its chosen we show set updatepicture to true
      if (imageData) {
        this.addpicture = true; //meaning user will add picture to group
      }
      //if no pic is chosen or selected
      else {
        this.addpicture = false; //meaning user will not add picture to group
      }

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image
      this.defaultgroupprofilepic = this.base64Image; //for use in our html
    }, (err) => {
      // Handle error
    });
  }



  //this is what happens when user selects photos from the action sheet options
  openPhotos() {   /***************************************************************************3 */
    const options: CameraOptions = {
      quality: 100, //quality of pic is reduced from 100 to 50 to allow small base64 code to be sent to api
      // targetWidth: 120,
      // targetHeight: 120, //size to scale image to 
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI

      //if user updates profile pic and its chosen we show set updatepicture to true
      if (imageData) {
        this.addpicture = true; //meaning user will add picture to group
      }
      //if no pic is chosen or selected
      else {
        this.addpicture = false; //meaning user will not add picture to group
      }

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image
      this.defaultgroupprofilepic = this.base64Image; //for ure in our html
    }, (err) => {
      // Handle error
    });
  }


  creategroup() {
    //remove whitespaces in text entered
    try {
      this.groupnameinput = this.groupnameinput.toString().trim()
    } catch (e) {
      console.log(e)
    }

    //if user doenst enter any text dont perform any action
    if (!(this.groupnameinput)) {
      //do nothing
      console.log("no groupname!")
      this.toastvalidation("Provide a group name")
    }

    //if user enters a goup name we insert details into our database to create new group 
    else {
      console.log(this.groupnameinput);

      //now we insert our new group details into the database
      /**before we insert our new group details we want to know if user will add a group image or not*/

      //if group profile picture will be added 
      if (this.addpicture == true) {
        console.log("picture to be added")

        //assign null if groupdescription input is empty
        if (!(this.groupdescriptioninput)) {
          this.groupdescriptioninput = null;
        }

        let body = {
          groupnameDB: this.groupnameinput,
          groupprofilepicDB: this.cameraData,
          groupdescriptionDB: this.groupdescriptioninput,
          loggedinuseridDB: this.mymodulevariables.globaluserid, //we need the user's id so that after creating the group we add him again under the groupmembership to indeicate he's part of the group
          mydbfunc: 'createnewgroup_withprofilepic'
        };

        //now we are inserting the data to the api db server
        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

          //data fetched raw from the db echo statement
          console.log("raw data from db:", data);

          //we convert into integer
          var integerconvertedid: any = parseInt(data);
          console.log("converted data from db into integer :", integerconvertedid);

          //then convert back to string to be able to store in local storage
          var stringconvertedid: any = integerconvertedid.toString();
          console.log("converted data from db into string :", stringconvertedid);

          //save id of the created group into localstorage to be used for the next page
          localStorage.setItem('storednewlycreatedgroupid', stringconvertedid);

          //clear the inputs
          this.groupnameinput = "";
          this.groupdescriptioninput = "";

          //finally navigate to members page so that he can add new members to the group
          const modal = this.modalCtrl.create('AddgroupmembersPage');
          modal.present();
        });
      }

      //if no profile picture will be added 
      else if (this.addpicture == false) {
        console.log("no picture to be added")

        //assign null if groupdescription input is empty
        if (!(this.groupdescriptioninput)) {
          this.groupdescriptioninput = null;
        }

        let body = {
          groupnameDB: this.groupnameinput,
          groupdescriptionDB: this.groupdescriptioninput,
          loggedinuseridDB: this.mymodulevariables.globaluserid, //we need the user's id so that after creating the group we add him again under the groupmembership to indeicate he's part of the group
          mydbfunc: 'createnewgroup_withoutprofilepic'
        };

        //now we are inserting the data to the api db server
        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

          //data fetched raw from the db echo statement
          console.log("raw data from db:", data);

          //we convert into integer
          var integerconvertedid: any = parseInt(data);
          console.log("converted data from db into integer :", integerconvertedid);

          //then convert back to string to be able to store in local storage
          var stringconvertedid: any = integerconvertedid.toString();
          console.log("converted data from db into string :", stringconvertedid);

          //save id of the created group into localstorage to be used for the next page
          localStorage.setItem('storednewlycreatedgroupid', stringconvertedid);

          //clear the inputs
          this.groupnameinput = "";
          this.groupdescriptioninput = ""

          //finally navigate to members page so that he can add new members to the group
          const modal = this.modalCtrl.create('AddgroupmembersPage');
          modal.present();
        });
      }
    }
  }

  //toast for validation
  toastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}

