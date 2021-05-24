import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables';
import { Camera, CameraOptions } from '@ionic-native/camera'; /******************************************1 */
import { ActionSheetController } from 'ionic-angular'; /**************************************************** */
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  userdetailstablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  /**in case user is updating username we'd check to see if it doesnt exist already */
  searchresults: any = [];
  searchresultsjsonconvertedrows: any = [];
  searchresultsusernamefetched: any = null;
  searchresultsuseridfetched: any = null;

  server: string; /******************************a */

  //variables to receive the fetched data
  username: any;
  userpassword: any;
  profilepic: any;
  about: any;
  datejoined: any;
  email: any;
  website: any;
  phonenumber: any;

  /**variable to recieve password the user will enter before he accesses the privacy page */
  accessprivacypassword: any;
  accessprivacypassword_nowhitespace : any; //this variable will be used for the prompt alert..ie. it removes the whitespace to enable us know if a user entered a txt or not

  //our variables binded to the input fields we'd collect these field inputs when we are updating in the db
  usernameinput: any;
  aboutinput: any;
  websiteinput: any;
  emailinput: any;
  phoneinput: any;

  /**  we want to know whether a user updated his profile pic or not
   * this will enable us know which of the update statements we should use **/
  updatepicture: boolean = false;

  /**if a user deletes the picutre we'd need to use a different sql query
   * ie. first delete profile pic from database and then update the other fields excluding the profile pic
   */
  picturedeleted: boolean = false;

  /**before we update we check if our new username to be used exists or not...
   * if it doesnt exist..we maintain "false" and proceed to update
   * if it exists we set it to "true" and stop the upate
   */
  usernameexists: boolean = false;

  //we set this to true if our profile pic is the default one
  //when we're updatin the details we'd check..if its set to true we'd just set the profile pic field to null
  weuseddefaultprofilepic: boolean = false;

  cameraData: string = null;
  base64Image: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, private postPvdr: PostProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private photoViewer: PhotoViewer,
    private camera: Camera,
    public mymodulevariables: ModulevariablesProvider,
    public actionSheetCtrl: ActionSheetController) {
    this.server = postPvdr.server; /*********************b */
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter Editprofilepage');
    this.loaduserdetails();
  }


  //load all logged in or signued up user's details
  loaduserdetails() {

    //variables and function to be used in php
    let body = {
      mydbfunc: 'displayloggedinorsignedupuserdetails',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      /***data inside the .subscribe contains our records 
       * but we cant use it in its original format 
       * so we convert into a usable format 
       * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.jsonconvertedrows = JSON.parse(data);
      //console.log('logged in user details: ',data);

      /**now we use a loop to transfer data from the converted array 
       * into our messagetablerows for use in the html**/
      for (let count of this.jsonconvertedrows) {
        this.userdetailstablerows.push(count);
      }

      console.log("userdetails: ", this.userdetailstablerows)

      //retrieving the user details from userdetailstablesrows array we also assign a default profile pic from our api folder into the picture box in case a user's profile pic is null
      for (var key in this.userdetailstablerows) {
        if (this.userdetailstablerows.hasOwnProperty(key)) {
          this.username = this.userdetailstablerows[key].username_fetched; //first assign username fetched to our html page
          this.usernameinput = this.userdetailstablerows[key].username_fetched; //then we bind to our ngmodel input field to detect changes

          this.userpassword = this.userdetailstablerows[key].userpassword_fetched;

          this.about = this.userdetailstablerows[key].about_fetched; //first assign about fetched to our html page
          this.aboutinput = this.userdetailstablerows[key].about_fetched; //then we bind to our ngmodel input field to detect changes

          this.datejoined = this.userdetailstablerows[key].date_joined_fetched;

          this.email = this.userdetailstablerows[key].user_email_fetched; //first assign email fetched to our html page
          this.emailinput = this.userdetailstablerows[key].user_email_fetched; //then we bind to our ngmodel input field to detect changes

          this.website = this.userdetailstablerows[key].user_website_fetched; //first assign website fetched to our html page
          this.websiteinput = this.userdetailstablerows[key].user_website_fetched; //then we bind to our ngmodel input field to detect changes

          this.phonenumber = this.userdetailstablerows[key].user_phonenumber_fetched; //first assign phonenumber fetched to our html page
          this.phoneinput = this.userdetailstablerows[key].user_phonenumber_fetched; ///then we bind to our ngmodel input field to detect changes

          //if profile pic is null 
          if (this.userdetailstablerows[key].profile_pic_fetched == null) {
            this.userdetailstablerows[key].profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";  //this directory is in htdocs/campfila/defaultprofilepic folder
            this.weuseddefaultprofilepic = true;
          }

          this.profilepic = this.server + this.userdetailstablerows[key].profile_pic_fetched;
        }
        //console.log('logged in user profilepic: ',this.profilepic);
      }

      // console.log(this.username);
      // console.log(this.profilepic);
    });
  }


  //update profile
  updateprofile() {
    console.log("new username to use", this.usernameinput);
    console.log("profile pic:", this.profilepic)
    //we need to ensure the user provides a username
    if (!(this.usernameinput)) {
      this.usernameToastvalidation("Please enter a username!")
    }

    //if username provides a username
    else {
      //validating fields where users can enter just space and removing those whitespaces
      try {
        this.aboutinput = this.aboutinput.toString().trim();
        this.websiteinput = this.websiteinput.toString().trim();
        this.emailinput = this.emailinput.toString().trim();
        this.phoneinput = this.phoneinput.toString().trim();
      } catch (e) {
        console.log(e)
      }

      //now we can update the details
      this.updatedetails();
    }
  }

  //database updating details
  updatedetails() {
    /**before we update details we want to know if the user made changes to the profile pic or not */
    if (this.picturedeleted == true) {
      if (this.updatepicture == true) {
        this.updatewithpic();
      }
      else if (this.updatepicture == false) {
        this.deletepicfromdb();
        this.updatewithoutpic();
      }
    }

    // else if (this.picturedeleted == false) {

    //   //if user didnt delete the pic but the profile pic is still our default one then there's no need to updaete the profile pic
    //   //since the initial profile was the default pic and he didnt delete it
    //   if (this.weuseddefaultprofilepic == true) {
    //     this.updatewithoutpic();
    //   }

    //   //if the user didnt delete the profile pic but the initial pic there is not the default pic tehn we'd update again with whatever pic is there
    //   else if (this.weuseddefaultprofilepic == false) {
    //     this.updatewithpic();
    //   }
    // }


    else if (this.picturedeleted == false) {

      //if user didnt delete the pic but the profile pic is still our default one then there's no need to updaete the profile pic
      //since the initial profile was the default pic and he didnt delete it
      // if (this.updatepicture == false && this.weuseddefaultprofilepic == true) {
      //   this.updatewithoutpic();
      // }

      if (this.updatepicture == false) {
        this.updatewithoutpic();
      }

      //if the user didnt delete the profile pic but the initial pic there is not the default pic tehn we'd update again with whatever pic is there
      else if (this.updatepicture == true) {
        this.updatewithpic();
      }
    }
  }


  deletepicfromdb() { //this acutaully updates the pic and sets the field to NULL to indicate the pic has been deleted
    let body = {
      user_idDB: this.mymodulevariables.globaluserid,
      mydbfunc: 'deleteprofilepic'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

    });

  }

  updatewithpic() {

    /**first check if username exists */
    this.searchresultsjsonconvertedrows = [];
    this.searchresults = [];

    let body = {
      usernameDB: this.usernameinput,
      mydbfunc: 'searchusername'
    };

    //posting our data to the api to perform db search
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.searchresultsjsonconvertedrows = JSON.parse(data);

      for (let count of this.searchresultsjsonconvertedrows) {
        this.searchresults.push(count);
      }
      //console.log("search results:",this.searchresults);

      /**we search through the search results and if there's data we want to see if there were results*/
      for (var key in this.searchresults) {
        if (this.searchresults.hasOwnProperty(key)) {
          this.searchresultsusernamefetched = this.searchresults[key].username_fetched;
          this.searchresultsuseridfetched = this.searchresults[key].user_id_fetched;
        }
      }

      console.log("searchresults:");
      console.log("username: ", this.searchresultsusernamefetched);
      console.log("id:", this.searchresultsuseridfetched);

      /**if username doesnt exists ie. is not null then we can set usernameexists to false and update*/
      if (this.searchresultsusernamefetched == null) {
        this.usernameexists = false;
      }

      else if (this.searchresultsusernamefetched != null) {
        //we cannot update but wait..if the userid is ours then we can still update with the same reults that was found
        if (this.searchresultsuseridfetched == this.mymodulevariables.globaluserid) {
          this.usernameexists = false; //it exists but we still set it to false since we can still update the username with the same one in the logged in user's field
        }

        else if (this.searchresultsuseridfetched != this.mymodulevariables.globaluserid) {
          this.usernameexists = true;
        }

        //now we can clear our results variables
        this.searchresultsusernamefetched = null;
        this.searchresultsuseridfetched = null;
      }
      console.log("username exists? :", this.usernameexists);
      /**we've now checked if username exists or not */

      if (this.usernameexists == false) {
        //proceed to update with profile pic

        let body = {
          globaluseridDB: this.mymodulevariables.globaluserid,
          usernameDB: this.usernameinput,
          aboutDB: this.aboutinput,
          profilepicDB: this.cameraData,
          websiteDB: this.websiteinput,
          phoneDB: this.phoneinput,
          emailDB: this.emailinput,
          mydbfunc: 'updateprofilewithprofilepic'
        }

        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

          //finally we move away from the page after making updates to the details
          this.viewCtrl.dismiss();

        });

        console.log("update with profile pic")
        console.log("username doesnt exist!");

        this.mymodulevariables.profilepic = this.profilepic;

        //finally we move away from the page after making updates to the details
        this.viewCtrl.dismiss();
      }

      //if username exists ..ie usernameexits == true
      else {
        //toast to prompt user
        console.log("username exists!");
        this.usernameToastvalidation("username exists!")
      }
    });
  }



  updatewithoutpic() {
    /**first check if username exists */
    this.searchresultsjsonconvertedrows = [];
    this.searchresults = [];

    let body = {
      usernameDB: this.usernameinput,
      mydbfunc: 'searchusername'
    };

    //posting our data to the api to perform db search
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.searchresultsjsonconvertedrows = JSON.parse(data);

      for (let count of this.searchresultsjsonconvertedrows) {
        this.searchresults.push(count);
      }
      //console.log("search results:",this.searchresults);

      /**we search through the search results and if there's data we want to see if there were results*/
      for (var key in this.searchresults) {
        if (this.searchresults.hasOwnProperty(key)) {
          this.searchresultsusernamefetched = this.searchresults[key].username_fetched;
          this.searchresultsuseridfetched = this.searchresults[key].user_id_fetched;
        }
      }

      console.log("searchresults:");
      console.log("username: ", this.searchresultsusernamefetched);
      console.log("id:", this.searchresultsuseridfetched);

      /**if username doesnt exists ie. is not null then we can set usernameexists to false and update*/
      if (this.searchresultsusernamefetched == null) {
        this.usernameexists = false;
      }

      else if (this.searchresultsusernamefetched != null) {
        //we cannot update but wait..if the userid is ours then we can still update with the same reults that was found
        if (this.searchresultsuseridfetched == this.mymodulevariables.globaluserid) {
          this.usernameexists = false; //it exists but we still set it to false since we can still update the username with the same one in the logged in user's field
        }

        else if (this.searchresultsuseridfetched != this.mymodulevariables.globaluserid) {
          this.usernameexists = true;
        }

        //now we can clear our results variables
        this.searchresultsusernamefetched = null;
        this.searchresultsuseridfetched = null;
      }
      console.log("username exists? :", this.usernameexists);
      /**we've now checked if username exists or not */

      if (this.usernameexists == false) {
        //proceed to update without profile pic
        let body = {
          globaluseridDB: this.mymodulevariables.globaluserid,
          usernameDB: this.usernameinput,
          aboutDB: this.aboutinput,
          websiteDB: this.websiteinput,
          phoneDB: this.phoneinput,
          emailDB: this.emailinput,
          mydbfunc: 'updateprofilewithoutprofilepic'
        }

        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

          //finally we move away from the page after making updates to the details
          this.viewCtrl.dismiss();
        });
      }

      //if username exists ..ie usernameexits == true
      else {
        //toast to prompt user
        console.log("username exists!");
        this.usernameToastvalidation("username exists!")
      }
    });
  }


  /**username exists toast validation */
  //toast for validation
  usernameToastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
        this.updatepicture = true; //meaning user will update profile pic
      }
      //if no pic is chosen or selected
      else {
        this.updatepicture = false; //meaning user will not update profilepic
      }

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image
      this.profilepic = this.base64Image; //for use in our html
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
        this.updatepicture = true; //meaning user will update profile pic
      }
      //if no pic is chosen or selected
      else {
        this.updatepicture = false; //meaning user will not update profilepic
      }

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image
      this.profilepic = this.base64Image; //for ure in our html
    }, (err) => {
      // Handle error
    });
  }

  //delete profile pic
  deleteprofilepic() {
    this.profilepic = "/assets/imgs/defaultprofilepic3.jpg"; //set profile pic back to default
    this.picturedeleted = true; // picture has been deleted
    this.updatepicture = false; //no picture will be sent to the db so we'd pefrom a delete query in the db to delete the pic there
  }



  //privacy page
  enterprivacypage() {
    const prompt = this.alertCtrl.create({
      title: 'Private information',
      message: "Enter password to continue",
      inputs: [
        {
          name: 'passwordfieldinput',
          placeholder: '',
          type : 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Next',
          handler: data => {
            /**data is the text which will be entered in the alert prompt textbox
             * if a user enters nothing or just spaces then we prompt them to enter something
             * else we proceed to check if password is true then we proceed
             */

            //remove white spaces before and after text entered before we assign to our accessprivacypassword
            this.accessprivacypassword_nowhitespace = data.passwordfieldinput.toString().trim()


            //if a user enters nothing
            if (!(this.accessprivacypassword_nowhitespace)) {
              console.log("nothing");
              this.passwordToastvalidation("enter password")
              return false; //do not dismiss alert prompt
            }

            //if a user enters a password
            else {
              console.log("password entered: ", this.accessprivacypassword);
              this.accessprivacypassword = data.passwordfieldinput; //now we need the original password entered including if the user added spaces before entering the password
              this.verifypassword();
            }
          }
        }
      ]
    });
    prompt.present();
  }


  //toast for validation when user doesnt enter password in the alert prompt for accessing the privacy
  passwordToastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  //verify if password is correct for logged in user so that we can let him access his privacy page
  verifypassword() {
    //remove white spaces in userpassword fetched from database 
    try {
      this.userpassword = this.userpassword.toString().trim();
    } catch (e) {
      console.log(e);
    }

    //if user's password entered is correct with the one fetched from the database
    if (this.accessprivacypassword == this.userpassword) {
      //this.passwordToastvalidation("correct password")
      this.navCtrl.push('PrivacyPage');
      localStorage.setItem('storedprofilepic', this.profilepic) //we'd send the profile pic to the privacy page
    }

    //if password enteerd was different from the one fetched from the database
    else {
      this.passwordToastvalidation("password incorrect!")
    }
  }


  //view profile picture in full
  viewprofileimage() {
    this.photoViewer.show(this.profilepic);
  }


}
