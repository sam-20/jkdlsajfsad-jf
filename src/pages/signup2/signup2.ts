import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, ToastController } from 'ionic-angular';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PostProvider } from '../../providers/post-provider';
import { Camera, CameraOptions } from '@ionic-native/camera'; /******************************************1 */
import { ActionSheetController } from 'ionic-angular'; /*****************************************************4 */


@IonicPage()
@Component({
  selector: 'page-signup2',
  templateUrl: 'signup2.html',
})
export class Signup2Page {
  //variables to receive the input fields from the previous page
  usernameinput: any;
  passwordinput: any;

  //variables in our current page
  aboutmeinput: any; //binds textarea property

  //we are using these two because we'd read data again from the accounts table to get the signed up user's user_id 
  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  searchresults: any = []; //this array will receive the rows from the from the converted jsonformat


  //generating our date for date_joined
  currentyear: any;
  currentmonth: any;
  //array to store months
  monthnames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  datejoined: any; //this will store month + year ...eg . July 2019

  /**  we want to know whether a user added a pic to the signup or not
   * this will enable us know which of the insert statements we should use **/
  addpicture: boolean = false;

  /********************************************7 */
  cameraData: string;
  base64Image: string = "/assets/imgs/defaultprofilepic3.jpg"; //we set our default profile pic else if pic is null database errors;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public mymodulevariables: ModulevariablesProvider,
    private postPvdr: PostProvider, private appCtrl: App, public toastCtrl: ToastController,
    private camera: Camera,               /********************************************************************2 */
    public actionSheetCtrl: ActionSheetController) { /***************************************************************************************5 */

    //transfer input fields from previous page into this page's variables to be used for signup
    this.usernameinput = mymodulevariables.mvusername;
    this.passwordinput = mymodulevariables.mvpassword;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup2Page');
  }

  ngOnInit() {

  }


  //signup button
  signupfunc() {
    setTimeout(() => {

      //all signup codes should start here
      this.signup();  //i gathered all the signup api codes into a single function and called it here
      //signup codes should end here

    }, 4000); //executes after 4 seconds
  }

  //this function displays the first loading event
  Loading1() {
    const loader = this.loadingCtrl.create({
      content: "Creating account...",
      duration: 2000  //event lasts for 2 seconds
    });
    loader.present();
  }


  //this function displays the second loading event however we have to delay it since loader 1 will take place 
  Loading2() {
    setTimeout(() => {
      const loader = this.loadingCtrl.create({
        content: "Redirecting to login page...",
        duration: 2000 //event lasts for 2 seconds
      });
      loader.present();
    }, 2000); //event loads after 2 seconds
  }

  signup() {
    this.insertdata();
    this.retrievedatainserted();
    this.redirectologinpage();
  }


  //api codes..i'd put this function inside the signupfunc() of the signup button
  insertdata() {
    //removing white spaces
    try{
      this.aboutmeinput = this.aboutmeinput.toString().trim()
    }
    catch(e){
      console.log(e);
    }

    /**before we signup or add details we want to know if user will add an image to the signup or not */

    //if profile picture will be added to the signup
    if (this.addpicture == true) {

      //we dont receive input for date_joined so we have to generate one ourselves
      let date = new Date();
      this.currentmonth = this.monthnames[date.getMonth()];
      this.currentyear = date.getFullYear();
      this.datejoined = this.currentmonth + ', ' + this.currentyear;

      //creating an array to store values in this page and assign them to variables for our database
      //variables on the left are the variables we'd use in the database php code
      let body = {
        usernameDB: this.usernameinput,
        passwordDB: this.passwordinput,
        profilepicDB: this.cameraData,  /*************************************8 */
        aboutmeDB: this.aboutmeinput,
        datejoinedDB: this.datejoined,
        mydbfunc: 'addaccount_withprofilepic'
      };

      //now we are inserting the data to the api db server
      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      });
    }

    //if no profile picture will be added to the signup
    else if (this.addpicture == false) {

      //we dont receive input for date_joined so we have to generate one ourselves
      let date = new Date();
      this.currentmonth = this.monthnames[date.getMonth()];
      this.currentyear = date.getFullYear();
      this.datejoined = this.currentmonth + ', ' + this.currentyear;

      //creating an array to store values in this page and assign them to variables for our database
      //variables on the left are the variables we'd use in the database php code
      let body = {
        usernameDB: this.usernameinput,
        passwordDB: this.passwordinput,
       // profilepicDB: this.cameraData,  we take this out since no profile pic is being added
        aboutmeDB: this.aboutmeinput,
        datejoinedDB: this.datejoined,
        mydbfunc: 'addaccount_withoutprofilepic'
      };

      //now we are inserting the data to the api db server
      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      });
    }


  }

  /**now data has been inserted but we dont know the user_id of the user who has signed up
       * since its generated automatically by the db
       * since we need the user_id to be used globally we have to read from the database again to retrieve the user_id
       * that was assigned to the new user*/

  retrievedatainserted() {
    //now to read from the accounts table again we use the same method as the login to display results for a particular user
    //first clear all data in searchresults to perform a fresh search
    this.searchresults = [];
    this.jsonconvertedrows = [];
    this.mymodulevariables.globaluserid = null //ensuring there's no data in globaluserid 

    /**we're sending the username and password to the php to retrieve the info NB: we added the added details 
     * because we've already defined body to take those details in the first query..we cant change the name 'body' and use and another name 
     * for this query because the post-data.ts file has been configured to post data with the parameter(body,file) hence 
     * changing the name will not cause allow no value to be sent for the body parameter
     * we therefore added the other details but we wont use them for our query..we'd only use the username
     * and password**/
    let body = {
      usernameDB: this.usernameinput,
      passwordDB: this.passwordinput,
      mydbfunc: 'displayallaccounts'
    };

    //now we are reading from the database using the body info we posted
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      console.log(data);

      //converting data results from db into a usable format
      this.jsonconvertedrows = JSON.parse(data);

      //transferring the data from converted array into our searchresults array
      for (let count of this.jsonconvertedrows) {
        this.searchresults.push(count);
      }

      /**now we have have the user's info in the searchresults array so we are 
      going to retrieve the user_id and insert it into globaluser_id **/
      for (var key in this.searchresults) {
        if (this.searchresults.hasOwnProperty(key)) {
          this.mymodulevariables.globaluserid = this.searchresults[key].user_id_fetched
        }
      }
    });
  }


  redirectologinpage() {
    //finally after reading the user_id from the database into globaluserid we can open the login page
    this.navCtrl.setRoot('LoginPage');

    //now load our welcome toast message who successfully signed up user
    //this.welcometoast("welcome " + this.usernameinput);
    this.mymodulevariables.globalusername = this.usernameinput //we need the username to be used across all the pages for db queries 
  }


  // //toast for welcoming user after successful login
  // welcometoast(msg) {
  //   setTimeout(() => {
  //     const toast = this.toastCtrl.create({
  //       message: msg,
  //       duration: 2000,
  //       position: 'top'
  //     });
  //     toast.present();
  //   }, 500);
  // }


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

      //if user takes a pic and its chosen we show set addpicture to true
      if (imageData) {
        this.addpicture = true; //meaning user will add picture to signup
      }
      //if no pic is chosen or selected
      else {
        this.addpicture = false; //meaning user will not add picture to signup
      }

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image
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

      //if user takes a pic and its chosen we show set addpicture to true
      if (imageData) {
        this.addpicture = true; //meaning user will add picture to signup
      }
      //if no pic is chosen or selected
      else {
        this.addpicture = false; //meaning user will not add picture to signup
      }

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image
    }, (err) => {
      // Handle error
    });
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


  //delete profile pic
  deleteprofilepic() {
    this.base64Image = "/assets/imgs/defaultprofilepic3.jpg"; //set profile pic back to default
  }
}




