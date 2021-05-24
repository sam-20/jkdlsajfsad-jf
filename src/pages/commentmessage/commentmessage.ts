import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PostProvider } from '../../providers/post-provider';
import { Camera, CameraOptions } from '@ionic-native/camera'; /******************************************1 */
import { ActionSheetController } from 'ionic-angular'; /*****************************************************4 */
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-commentmessage',
  templateUrl: 'commentmessage.html',
})
export class CommentmessagePage {

  cameraData: string; //this will contain the image that will be sent to the database
  base64Image: string;

  display: any; //condition that displays card (if == true ) or hides card (if == false) 

  //default values for some of the message content that will be sent to database
  //nb: we didnt include message time stamp because we'd let the php generate it for us
  messagelikes: number = 0;
  messagecomments: number = 0;
  messagetextareainput: any; //binded to our message textarea field


  //after commenting the message we'd add one to the total comments and update it in the database as well
  commentedmsgtotalcomments: any;

  /**  we want to know whether a user added a pic to the message or not
  * this will enable us know which of the insert statements we should use **/
  addpicture: boolean = false;

  //this stores the id of the message we are commenting
  commentedmessageid: any;

  commentedmessagelikecolor: any //stores the like color of the message to be commented..was obtained from the previous page
  commentedmessagepincolor: any; //stores the pincolor of the message to be commented...was obtained from the previous page
  commentedmessagecommentcolor: any // stores the comment color of the message to be commentes..was obtained from the previous page

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  commentedmessagetablerow: any = []; //this array will receive the rows from the from the converted jsonformat 

  receiveridforDB: any //this will collect the commented message's user id ..for use in notifications

  /**we will load all comments messages from the db when the user leaves this page
   * so that we can get updated data for the home messages
  */
  commentmsgids: any = [];
  commentmsgsidsjsonconvertedrows: any[];

  server: string; /******************************a */

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mymodulevariables: ModulevariablesProvider, public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private postPvdr: PostProvider, private camera: Camera,
    private photoViewer: PhotoViewer,
    public viewCtrl: ViewController) {

    //loading the id, pincolor and likecolor of the commented message from the previous page to allow us to retrieve its info from the db into this page
    this.commentedmessageid = JSON.parse(localStorage.getItem('storedmessageid'));
    this.commentedmessagepincolor = (localStorage.getItem('storedpincolor'));
    this.commentedmessagelikecolor = (localStorage.getItem('storedlikecolor'));
    this.commentedmessagecommentcolor = (localStorage.getItem('storedcommentcolor'));
    this.receiveridforDB = (localStorage.getItem('commentedmessageowner'));
    this.server = postPvdr.server; /*********************b */
  }

  //back function
  back() {
    this.viewCtrl.dismiss();
  }

  //codes here are executed when the page loads
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentmessagemodalPage');
    console.log('message id of the commented message: ', this.commentedmessageid)
    console.log('pincolor of the commented message: ', this.commentedmessagepincolor);
    console.log('like color of the commented message: ', this.commentedmessagelikecolor);
  }

  //codes here are executed when the user selects the page
  ionViewWillEnter() {
    this.loadpagedata();  //used for loading asynchronous data
  }

  //when we leave the page we'd refresh the comments table for the home page
  ionViewDidLeave() {
    this.commentmsgids = [];
    this.loadcommentmessages();
  }

  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    console.log('Refresh started');
    console.log(this.mymodulevariables.globaluserid);

    setTimeout(() => {
      //finally output our messages 
      this.commentedmessagetablerow = [];  //clear all messaegs in the commented message array
      this.loadcommentedmessage();
      console.log('Refresh complete');

    }, 0); //duration of refresh
  }


  //load commented message
  loadcommentedmessage() {

    //stuff we want to post to our database
    let body = {
      commentedmessageidDB: this.commentedmessageid,
      mydbfunc: 'displaycommentedmessage' //function  to be used in php file
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //console.log(data);

      /***data inside the .subscribe contains our records 
       * but we cant use it in its original format 
       * so we convert into a usable format 
       * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.jsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
       * into our commented message table row for use in the html**/
      for (let count of this.jsonconvertedrows) {
        this.commentedmessagetablerow.push(count);
      }

      //lets look at the data in commented message table
      console.log(this.commentedmessagetablerow);
      console.log(this.commentedmessagetablerow.length);


      /**now we have have the messages in the commented message table array so we are 
      we are going to check if a profile pic is null then we assign our pic to the user of the commented message **/
      for (var key in this.commentedmessagetablerow) {
        if ((this.commentedmessagetablerow[key].commentedmsg_sender_profile_pic_fetched) == null) {
          this.commentedmessagetablerow[key].commentedmsg_sender_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }
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

  //send or post message + send notification message to user whose message is being commented
  sendmessage() {
    //removing white spaces in text entered
    try {
      this.messagetextareainput = this.messagetextareainput.toString().trim()
    } catch (e) {
      console.log(e)
    }

    /**before we send message we want to know if user will add an image or not */

    //if picture will be added to the message
    if (this.addpicture == true) {

      //now we have to add 1 to the total comments of the message we're commenting
      for (var key in this.commentedmessagetablerow) {
        ++this.commentedmessagetablerow[key].commentedmsg_comments_fetched;
        this.commentedmsgtotalcomments = this.commentedmessagetablerow[key].commentedmsg_comments_fetched;
        console.log('commentedmessage total comments: ', this.commentedmsgtotalcomments);
      }

      let body = {
        messageDB: this.messagetextareainput,
        message_mediaDB: this.cameraData,
        likesDB: this.messagelikes,
        commentsDB: this.messagecomments,
        user_idDB: this.mymodulevariables.globaluserid,
        /**when we're done with inserting our msg we'd need the id of the
        message we are commenting so that we can also insert that into the 
        commented messages tabe ..Another id we'd need is the id of the msg we are posting
        and we'd derive that in the php db function**/
        commentedmsg_idDB: this.commentedmessageid,
        commentedmsgtotalcommentsDB: this.commentedmsgtotalcomments,
        receiveridDB: this.receiveridforDB, //the id of the person who's message we are commenting
        mydbfunc: 'commentmsgwithmedia'
      };

      //now we are inserting the data to the api db server
      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      });

      //now we can finally leave the page
      this.viewCtrl.dismiss();

      //sending updated comments table to home page
      this.ionViewDidLeave();
    }

    //if no picture will be added to the message
    else if (this.addpicture == false) {

      //if no picture is being added to the message then we should enter the text area is not empty
      if (!(this.messagetextareainput)) {
        this.Toastvalidation("enter a message")
      }

      //if theres a text then we can proceed to send our message to the db
      else {
        //now we have to add 1 to the total comments of the message we're commenting
        for (var key in this.commentedmessagetablerow) {
          ++this.commentedmessagetablerow[key].commentedmsg_comments_fetched;
          this.commentedmsgtotalcomments = this.commentedmessagetablerow[key].commentedmsg_comments_fetched;
          console.log('commentedmessage total comments: ', this.commentedmsgtotalcomments);
        }

        let body = {
          messageDB: this.messagetextareainput,
          likesDB: this.messagelikes,
          commentsDB: this.messagecomments,
          user_idDB: this.mymodulevariables.globaluserid,
          /**when we're done with inserting our msg we'd need the id of the
          message we are commenting so that we can also insert that into the 
          commented messages tabe ..Another id we'd need is the id of the msg we are posting
          and we'd derive that in the php db function**/
          commentedmsg_idDB: this.commentedmessageid,
          commentedmsgtotalcommentsDB: this.commentedmsgtotalcomments,
          receiveridDB: this.receiveridforDB, //the id of the person who's message we are commenting
          mydbfunc: 'commentmsgwithoutmedia'
        };

        //now we are inserting the data to the api db server
        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
        });

        //now we can finally leave the page
        this.viewCtrl.dismiss();

        //sending updated comments table to home page
        this.ionViewDidLeave();

        //this.navCtrl.push('MenuholderPage');
      }
    }
  }


  //load all comment messages info..note we have to see everyone's comments in our home messagess
  loadcommentmessages() {
    let body = {
      mydbfunc: 'displayusercommentmsgids_and_commentedmsgs_info'
    };

    //posting our data to the api 
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //console.log(data);

      /***data inside the .subscribe contains our records 
            * but we cant use it in its original format 
            * so we convert into a usable format 
            * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.commentmsgsidsjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our pinnedmsgids table for matching up with the tablerows data**/
      for (let count of this.commentmsgsidsjsonconvertedrows) {
        this.commentmsgids.push(count);
      }
      console.log('comment messages: ', this.commentmsgids);
      //console.log('comment messages length', this.commentmsgids.length)
    });
  }


  //view selected message image in full
  viewimage(count) {
    this.photoViewer.show(this.server + count.commented_message_media_fetched, count.commented_message_fetched);
    console.log("with server", this.server + count.commented_message_media_fetched);
  }

  //view image in comment message
  viewimage2() {
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
