
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Content, ToastController, Platform, ViewController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { Camera, CameraOptions } from '@ionic-native/camera'; /******************************************1 */
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CallNumber } from '@ionic-native/call-number';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser'
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { StreamingMedia } from '@ionic-native/streaming-media'
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture';
import { VideoEditor, CreateThumbnailOptions } from '@ionic-native/video-editor/';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { DocumentPicker } from '@ionic-native/document-picker';
import { FileOpener } from '@ionic-native/file-opener';

@IonicPage()
@Component({
  selector: 'page-viewspecificgroupchat',
  templateUrl: 'viewspecificgroupchat.html',
})
export class ViewspecificgroupchatPage {
  //this allows our chat page to scroll to the bottom
  //we'd want to do automatically so that whenever the chat page is opened the page is automatically scrolled to the bottom of the page whtere the last messag is
  @ViewChild(Content) content: Content;


  //we will retrieve the details of the group we are chatting in so that we can put their picture into the chat header
  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  groupdetailstablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  //these tables will store the results of whether the group which we are chatting in has its records initialized already in the lastgroupmessage db table
  lastgroupmessagetable: any = [];
  lastgroupmessagejsonconvertedrows: any = [];
  foundrecord: boolean = false; //this will tell us if a record was found for this group in the lastgroupmessage db table or not

  //we store the profile pic of the group we are chatting in this
  groupprofilepic: any;

  //we'd pass this info to the viewgroupchatdetails page
  groupabout_fetched: any;
  members_joined: any

  server: string; /******************************a */

  //the id of the group we are chatting in is retrieved from previous page so that we can load chats for that group
  group_id_retrieved: any;
  groupname: any; //for name of the group in header

  /**table to store group messages for the selected group */
  groupmessagesjsonvertedrows: any;
  groupmessagestablerows: any;

  /**virtual table to store virtual group messages of the selected group
   * the difference with this and the groupmesssagestablerows is that the virtual table will keep refreshing
   * after every second to contain newly added messages
   * after every refresh if a new message is added then we reload the groupmessagestables so that the html reflects
   * displays the new messages
   */
  virtualgroupmsgsjsonvertedrows: any;
  virtualgroupmsgstablerows: any;

  //this binds the send message textarea property
  sendgroupmessagetextareainput: any;

  private timeoutId: number; //auto refresh 1

  cameraData: string; //this will contain the image that will be sent to the database when user wants to send an image as a message
  base64Image: string;

  /***this variables will store the state of the mic fab to allow the buttons to switch when one is clicked */
  // mic_on: boolean = true;
  // mic_off: boolean = true;

  myaudio: any; //the audio object that will create the audio file

  positioninput: any; //position of the paused audio will be sent to this textarea
  audioduration: any = 0;  //save duration of the recorded audio
  extractedaudiofile: any; //this will retrieve the actual audio file that we created with media.create when recording
  extractedaudiofilename: any;

  /**loader used when audio or video is being sent */
  loader: any;

  /**this stores the thumbnail generated from a video by the videoeditor plugin */
  thumbnailfromvideo: string;

  //for file picker and file opening functions
  selectedfilename: any;
  selectedfileextension: any;
  selectedfilemimetype: any;
  selectedfilepath: any;
  selectedfilesize: any;

  /**we are using this to prevent multiple popup messages when a user swipes to delte a message */
  popupmessageshownalready: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mymodulevariables: ModulevariablesProvider,
    private media: Media,
    private file: File,
    private base64: Base64,
    public alertCtrl: AlertController,
    private streamingMedia: StreamingMedia,
    private platform: Platform,
    public loadingCtrl: LoadingController,
    private docPicker: DocumentPicker,
    private fileOpener: FileOpener,
    private viewCtrl: ViewController,
    private callNumber: CallNumber,
    public camera: Camera,
    private mediaCapture: MediaCapture,
    private photoViewer: PhotoViewer,
    private videoEditor: VideoEditor,
    private postPvdr: PostProvider,
    public toastCtrl: ToastController,
    private sanitizer: DomSanitizer,
    private transfer: FileTransfer,
    private filePath: FilePath,
    private fileChooser: FileChooser) {
    this.server = postPvdr.server; /*********************b */

    //retrieving the group id from the previous chat list page
    this.group_id_retrieved = (localStorage.getItem('storedgroupid'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewspecificgroupchatPage');
    console.log("group id", this.group_id_retrieved);
  }

  ionViewDidEnter() {
    this.startAutoRefresh();  //auto refresh 2 
  }

  private startAutoRefresh() {  //auto refresh 3
    this.refreshcode();
    this.timeoutId = setInterval(() => this.refreshcode(), 1 * 1000); //auto refresh after 5 seconds
  }


  private refreshcode() { //auto refresh 4
    /**this loads the group messages for the selected group from the db table after eevery 3 seconds
     * if after loading from the db, a new message has been sent by any other group participant it calls the 'loadgroupmessages' function in the ts file to reload the new
     * messages into the html
     * if after autoloading from the db , no message has been sent by any other group participant then we do nothing
     */
    this.loadvirtualgroupmessages();
  }

  private stopRefresh() { //auto refresh 5
    clearInterval(this.timeoutId);
  }

  ionViewDidLeave() { //auto refresh 6
    this.stopRefresh();
  }


  ionViewWillEnter() {
    this.createormaintainlastdmrecordfield()  //create  an initial record in the lastgroupmessage table in the db so that the group members can update their lastgroupmessages for view in the previous page ie.groupchatlist
    this.loadgroupdetails(); //we need the group's pic for the chat header
    this.loadgroupmessages();  //load all messages in the group

    this.scrolltobottom(); //scrolls page to the bottom so that we can see the new messages
  }


  //scrolls page to bottom
  scrolltobottom() {
    setTimeout(() => {
      this.content.scrollToBottom(0);
    }, 100);
  }


  /**in the lastgroupmessage db table..we create a new (and only one) field record for the  group and set the default lastgroupmessage id to null
   * as the group participants are chatting including the loggedin user..whenever any of them sends a message we update the lastmsgid in the lastgroupmessagetable db table to the id of the last message any one of the users sent
   * so that we can display that last messsage in the groupchat list in the previous page
   * however we execute this code once so that the lastgroupmessage table in the db has  one record for the group where the lastmessage id will be updated
   * based on whoever sent the last message
   * if we open this page again and the last group message record for this group exists already then we dont have to create a new record again
   */
  createormaintainlastdmrecordfield() {

    /**we first check if the group we are chatting in already has its record in the lastgroupmessage db table 
     * if it does..we dont need to create a new record for the group
     * if the result is empty we create a new record for the group
     */
    this.lastgroupmessagejsonconvertedrows = [];
    this.lastgroupmessagetable = [];

    //variables and function to be used in php
    let body = {
      mydbfunc: 'searchlastgroupmessage_forselectedgroup',
      group_idDB: this.group_id_retrieved
    };


    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      /***data inside the .subscribe contains our records 
       * but we cant use it in its original format 
       * so we convert into a usable format 
       * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.lastgroupmessagejsonconvertedrows = JSON.parse(data);


      /**now we use a loop to transfer data from the converted array 
       * into our messagetablerows for use in the html**/
      for (let count of this.lastgroupmessagejsonconvertedrows) {
        this.lastgroupmessagetable.push(count);
      }

      console.log("last group message for selected group", this.lastgroupmessagetable);

      /**now to check if a record was found or not */
      for (var key in this.lastgroupmessagetable) {
        if (this.lastgroupmessagetable.hasOwnProperty(key)) {
          this.foundrecord = true;  //set found record to true if there was a value in the table
        }
      }

      console.log("found record?: ", this.foundrecord);

      /**if a record was found then there's no need to create one for the group since its exists and all the participants have to do is just update the lastmsgid with the messages they send */
      if (this.foundrecord == true) {
        //do nothing
      }

      //if no record was found we insert a new record for the group so that next time the group participants just update the lastmsgids there..note that  for the new row that will be created
      //the lastmsg id will be set to null and it will be changed as the participants start to enter messages
      else {
        //insert new record for the group 
        let body = {
          mydbfunc: 'insertnewlastgroupmessagerecordforgroup',
          group_idDB: this.group_id_retrieved
        };


        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
        });
      }

    });


  }

  //load group's details so that we can assign its name and group pic to the header
  loadgroupdetails() {
    this.jsonconvertedrows = [];
    this.groupdetailstablerows = [];

    //variables and function to be used in php
    let body = {
      mydbfunc: 'displaygroupdetails',
      group_idDB: this.group_id_retrieved
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
        this.groupdetailstablerows.push(count);
      }

      console.log("selected group's details: ", this.groupdetailstablerows)

      //retrieving the group details from groupdetailstablesrows array we also assign a default profile pic from our api folder into the picture box in case a group's profile pic is null
      for (var key in this.groupdetailstablerows) {
        if (this.groupdetailstablerows.hasOwnProperty(key)) {
          this.groupname = this.groupdetailstablerows[key].group_name_fetched;
          this.groupabout_fetched = this.groupdetailstablerows[key].about_fetched;
          this.members_joined = this.groupdetailstablerows[key].members_joined_fetched;

          //if profile pic is null 
          if (this.groupdetailstablerows[key].group_profile_pic_fetched == null) {
            this.groupdetailstablerows[key].group_profile_pic_fetched = "defaultprofilepic/defaultgroupprofilepic.jpg";  //this directory is in htdocs/campfila/defaultprofilepic folder
          }
          this.groupprofilepic = this.server + this.groupdetailstablerows[key].group_profile_pic_fetched;;
        }

      }

      // console.log(this.groupname);
      // console.log(this.groupprofilepic);
    });
  }

  //load messages for selected group
  loadgroupmessages() {
    this.groupmessagesjsonvertedrows = [];
    this.groupmessagestablerows = [];

    //variables and function to be used in php
    let body = {
      mydbfunc: 'displayspecificgroupmessages',
      group_idDB: this.group_id_retrieved
    };


    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      /***data inside the .subscribe contains our records 
       * but we cant use it in its original format 
       * so we convert into a usable format 
       * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.groupmessagesjsonvertedrows = JSON.parse(data);


      /**now we use a loop to transfer data from the converted array 
       * into our messagetablerows for use in the html**/
      for (let count of this.groupmessagesjsonvertedrows) {
        this.groupmessagestablerows.push(count);
      }

      /**we add these properties to each item in the table 
      * however we'd only use it for rows which have audiorecorded_fetched items
      * the function of these is store the state of the selected audio's icon
      * they are made active or inactive based on the icon selected in the particular audiorecorded file selected
      */
      this.groupmessagestablerows.forEach(function (element) { element.playiconactive = true; });
      this.groupmessagestablerows.forEach(function (element) { element.pauseiconactive = false; });
      this.groupmessagestablerows.forEach(function (element) { element.resumeiconactive = false; });
      this.groupmessagestablerows.forEach(function (element) { element.stopiconactive = false; });
      this.groupmessagestablerows.forEach(function (element) { element.audioconvertedtomediapluginformat = false; });

      /**these properties will also track the downloading status of any type of file ie.if message row is a file of any type: image,audio,file, video */
      this.groupmessagestablerows.forEach(function (element) { element.download = true; });
      this.groupmessagestablerows.forEach(function (element) { element.downloading = false; });

      //sorting the ids of the gropu messages so that it appears message after messages based on id in the html
      this.groupmessagestablerows.sort((a, b) => a.grp_msg_id_fetched - b.grp_msg_id_fetched)

      // var res = this.dmmsgstablerows.sort((a, b) => a.dm_msg_id_fetched - b.dm_msg_id_fetched)
      //console.log(res)

      this.groupmessagestablerows = this.groupmessagestablerows.reduce((unique, o) => {
        if (!unique.some(obj => obj.grp_msg_id_fetched === o.grp_msg_id_fetched)) {
          unique.push(o);
        }
        return unique;
      }, []);

      console.log("selected group's details", this.groupdetailstablerows);
    });
  }


  /**this loads the group message for the selected group from the db table after eevery 3 seconds
       * if after loading from the db, a new message has been sent by any other participant in the group it calls the 'loadgroupmessages' function in the ts file to reload the new
       * messages into the html
       * if after loading from the db , no message has been sent by any other participant in the group then we do nothing
       */
  loadvirtualgroupmessages() {
    this.virtualgroupmsgsjsonvertedrows = [];
    this.virtualgroupmsgstablerows = [];

    //variables and function to be used in php
    let body = {
      mydbfunc: 'displayspecificgroupmessages',
      group_idDB: this.group_id_retrieved
    };


    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      /***data inside the .subscribe contains our records 
       * but we cant use it in its original format 
       * so we convert into a usable format 
       * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.virtualgroupmsgsjsonvertedrows = JSON.parse(data);


      /**now we use a loop to transfer data from the converted array 
       * into our messagetablerows for use in the html**/
      for (let count of this.virtualgroupmsgsjsonvertedrows) {
        this.virtualgroupmsgstablerows.push(count);
      }


      /**we add these properties to each item in the table 
      * however we'd only use it for rows which have audiorecorded_fetched items
      * the function of these is store the state of the selected audio's icon
      * they are made active or inactive based on the icon selected in the particular audiorecorded file selected
      */
      this.virtualgroupmsgstablerows.forEach(function (element) { element.playiconactive = true; });
      this.virtualgroupmsgstablerows.forEach(function (element) { element.pauseiconactive = false; });
      this.virtualgroupmsgstablerows.forEach(function (element) { element.resumeiconactive = false; });
      this.virtualgroupmsgstablerows.forEach(function (element) { element.stopiconactive = false; });
      this.virtualgroupmsgstablerows.forEach(function (element) { element.audioconvertedtomediapluginformat = false; });


      /**these properties will also track the downloading status of any type of file ie.if message row is a file of any type: image,audio,file, video */
      this.virtualgroupmsgstablerows.forEach(function (element) { element.download = true; });
      this.virtualgroupmsgstablerows.forEach(function (element) { element.downloading = false; });

      //sorting the ids of the gropu messages so that it appears message after messages based on id in the html
      this.virtualgroupmsgstablerows.sort((a, b) => a.grp_msg_id_fetched - b.grp_msg_id_fetched)

      // var res = this.dmmsgstablerows.sort((a, b) => a.dm_msg_id_fetched - b.dm_msg_id_fetched)
      //console.log(res)

      console.log("selected group's virtual messages", this.virtualgroupmsgstablerows);

      /**now we have the chats for the selected group in our virtual groupmsgs table
       * since the data here keeps refreshing it means it will contain freshly posted messages by any group participant
       * so we compare the data here with the normal groupmsgstable whihc displays in the hmtl
       * if an id in the virtual table is not in the normal groupsgstable we call the function to reload the groupmessages table again 
       * in order to display the fresh messages
       */
      for (var count of this.virtualgroupmsgstablerows) { //loop through the virtual table whihc has the fresh data
        var index = this.groupmessagestablerows.findIndex(x => x.grp_msg_id_fetched == count.grp_msg_id_fetched) //go to the original groupmessgetable and compare the msg ids with the virtual table's msg ids

        if (index === -1) { //if the id in virtual table wasnt found in the original groupmessagetable
          //this.loadgroupmessages();

          /**instead of reloading the whole groupmessages table we just add our new update or message from the virtual
           * table rows into the original groupmessages table so that it immediately joins the messages in the html
           * without having to reload the entire messages
           */
          this.groupmessagestablerows.push(count);

          this.scrolltobottom();
        }

        else {//if the message id is present already
          //do nothing
        }
      }
    });

  }


  //send group message
  sendgroupmessage() {
    //remove white spaces from text entered
    try {
      this.sendgroupmessagetextareainput = this.sendgroupmessagetextareainput.toString().trim()
    }
    catch (e) {
      console.log(e)
    }

    //if user doenst enter any text dont perform any action
    if (!(this.sendgroupmessagetextareainput)) {
      //do nothing
      console.log("no message to send!")
    }

    //if user enters a text we insert into the specifcgroupmessagges database table and update the lastmsgid in the lastgroupmessage database table
    else {
      console.log(this.sendgroupmessagetextareainput);

      //now we insert our group message into the database
      /**note that after inserting we'd need to update the lastgroupmessage db table with the sent message id  however we can only retrieve that id after we've sent the message
       * so in this 'senddmmessage' function..after inserting the group mesage we also retrieve the id of that message sent and use it to update the lastgroupmessage id value in the lastgroupmessage db table
       */
      let body = {
        mydbfunc: 'sendgroupmessage_nopicture',
        loggedinuseridDB: this.mymodulevariables.globaluserid,
        group_idDB: this.group_id_retrieved,
        groupmessageDB: this.sendgroupmessagetextareainput
      };

      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

        //refresh the loaded group messages into the html again to get the new message sent
        //this.loadgroupmessages();

        /**we reload the messages in the virtualgroup table which adds the newly sent message to the l
         * groupmessages table after reloading itself automatically
         */
        this.loadvirtualgroupmessages();
        this.scrolltobottom(); //finally scroll to the bottom of the page to see the last message
      });

      //empty the message textbox
      this.sendgroupmessagetextareainput = "";
    }
  }

  //view group chat details
  viewgroupchatdetails() {
    localStorage.setItem('storedgroupid', this.group_id_retrieved);
    this.navCtrl.push('GroupchatdetailsPage');
  }


  //take photo and add to message
  openCamera() {   /***************************************************************************3 */
    const options: CameraOptions = {
      quality: 100, //quality of pic is reduced from 100 to 50 to allow small base64 code to be sent to api
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image

      //if a user takes a picture then we'd open the next page where he can caption or not, the image and send
      //if no image is taken we do nothing
      if (imageData) {

        /***********use this if u want to send the image to another page in order to caption it */
        // //after the user has taken the pic we open a new page with the picture there and a texbox for adding messsage or caption to the image then
        // //we also provide a send button to send the message and image
        // localStorage.setItem('storedimagefordisplay', this.base64Image);  //picture taken which has been coverted for display in the html for the next page
        // localStorage.setItem('storedcameradata', this.cameraData) //direct image from camera that we'd save in the database as the image in our next page

        // //we need the id of the person we're chatting with so that we can save the message with their id and ours
        // localStorage.setItem('storedgroupid', this.group_id_retrieved);

        // //now we can open our next page whihc will display the image selected, a textbox for adding a message to the image and a send button
        // this.navCtrl.push('GroupsendpicturepopupPage');


        //if an image is taken we send to the db
        // this.sendingloader(); //show sending... loader as backend functions are being run
        console.log("send image to database");

        //send image to database
        //now we insert our group message into the database
        /**note that after inserting we'd need to update the lastdmmessage db table with the sent message id  however we can only retrieve that id after we've sent the message
         * so in this 'sendgroupmessage' function..after inserting the dm mesage we also retrieve the id and use it to update the lastdmmessage id value in the lastdmmessage db table
         */
        let body = {
          mydbfunc: 'sendgroupmessage_withpicture',
          loggedinuseridDB: this.mymodulevariables.globaluserid,
          group_idDB: this.group_id_retrieved,
          groupmessageDB: this.sendgroupmessagetextareainput,
          grpmessage_mediaDB: this.cameraData
        };

        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

          // this.loader.dismiss();

          //refresh the virtual table messages to add only the neww message to the list of html messages
          this.loadvirtualgroupmessages();
          this.scrolltobottom(); //finally scroll to the bottom of the page to see the last message
        });
      }

      //if no image is selected do nothing
      else {
        //do nothing
        this.alertmsg("no image selected");
      }
    }, (err) => {
      // Handle error
    });
  }



  //upload photo from gallery and add to message
  openPhotos() {   /***************************************************************************3 */
    const options: CameraOptions = {
      quality: 100, //quality of pic is reduced from 100 to 50 to allow small base64 code to be sent to api
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI

      // If it's base64 (DATA_URL):
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //image selected is stored into this.bas64Image

      //if a user selects a picture then we'd open the next page where he can caption or not, the image and send
      //if no image is taken we do nothing
      if (imageData) {

        /***********use this if u want to send the image to another page in order to caption it */
        // //after the user has selected the pic from gallery we open a new page with the picture there and a texbox for adding a messsage or caption to the image then
        // //we also provide a send button to send the message and image
        // localStorage.setItem('storedimagefordisplay', this.base64Image);  //picture taken which has been coverted for display in the html for the next page
        // localStorage.setItem('storedcameradata', this.cameraData) //direct image from camera that we'd save in the database as the image in our next page

        // //we need the id of the person we're chatting with so that we can save the message with their id and ours
        // localStorage.setItem('storedgroupid', this.group_id_retrieved);

        // //now we can open our next page whihc will display the image selected, a textbox for adding a message to the image and a send button
        // this.navCtrl.push('GroupsendpicturepopupPage');

        //if an image is selected then we send to the db
        // this.sendingloader(); //show sending... loader as backend functions are being run
        console.log("send image to database");

        //send image to database
        //now we insert our group message into the database
        /**note that after inserting we'd need to update the lastdmmessage db table with the sent message id  however we can only retrieve that id after we've sent the message
         * so in this 'sendgroupmessage' function..after inserting the dm mesage we also retrieve the id and use it to update the lastdmmessage id value in the lastdmmessage db table
         */
        let body = {
          mydbfunc: 'sendgroupmessage_withpicture',
          loggedinuseridDB: this.mymodulevariables.globaluserid,
          group_idDB: this.group_id_retrieved,
          groupmessageDB: this.sendgroupmessagetextareainput,
          grpmessage_mediaDB: this.cameraData
        };

        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

          // this.loader.dismiss();

          //refresh the virtual table messages to add only the neww message to the list of html messages
          this.loadvirtualgroupmessages();
          this.scrolltobottom(); //finally scroll to the bottom of the page to see the last message
        });
      }

      //if no image is selected
      else {
        //do nothing
        this.alertmsg("no image selected");
      }
    }, (err) => {
      // Handle error
      this.alertmsg(err);
    });
  }


  //view selected message image in full
  viewimage(count) {
    this.photoViewer.show(this.server + count.grp_msg_media_fetched, count.grp_msg_fetched);
    console.log("with server", this.server + count.grp_msg_media_fetched);
  }


  //record audio
  recordaudio() {
    let options: CaptureAudioOptions = { limit: 1 }
    this.mediaCapture.captureAudio(options)
      .then((data: MediaFile[]) => {

        this.myaudio = data;
        console.log("media captured audio data: ", this.myaudio);

        //sorting the array in the returned data to retrieve our audio file
        this.myaudio = JSON.stringify(data);
        this.myaudio = JSON.parse(this.myaudio)

        //finally we can retrieve our audio file with
        for (var key in this.myaudio) {
          this.extractedaudiofile = this.myaudio[key].fullPath;
          this.extractedaudiofilename = this.myaudio[key].name;
        }

        console.log("media captured audio path", this.extractedaudiofile);

        //after obtaining the audio file we retrieve the duration
        this.mediacapturedaudioduration(this.extractedaudiofile)
      })
      .catch((err: CaptureError) => {
        console.log(err);
        this.alertmsg(JSON.stringify(err));
      });
  }



  //get the duration of the media captured audio
  mediacapturedaudioduration(audiofile) {
    audiofile = this.media.create(audiofile); //convert into format to be played by media plugin
    audiofile.setVolume(0.0)
    audiofile.play();

    var interval = setInterval(() => {

      if (this.audioduration <= 0) {
        audiofile.setVolume(0.0)
        this.audioduration = audiofile.getDuration()
      }
      else {
        audiofile.stop();
        audiofile.setVolume(1.0)
        clearInterval(interval)
      }

      /**if duration is less than 60 we assign "sec"
      * if duration is greater than 60 we assign min */
      if (this.audioduration >= 60) {

        this.audioduration = (this.audioduration / 60).toFixed(0);

        if (this.audioduration == 1) {
          this.audioduration = (this.audioduration + " min");
        }
        else {
          this.audioduration = (this.audioduration + " mins");
        }

      }

      else {
        this.audioduration = this.audioduration.toFixed(0) + " sec"
      }
      console.log("new dur: ", this.audioduration);

      //if we still getting -1 for duration we assign nothing to avoid confusion
      if (this.audioduration == "-1 sec") {
        this.audioduration = "";
      }

      //finally send the audio details to the database
      this.sendaudiotodb(this.extractedaudiofilename, this.extractedaudiofile, this.audioduration);

    }, 100);
  }


  //actual sending of audio to db
  sendaudiotodb(audioname, audiopath, audioduration) {
    setTimeout(() => {

      //finally send the audio to the database
      /**this time we send only the audio without any message..the time sent for the audio will be genereateed in the php */
      let body = {
        mydbfunc: 'sendgroupmessage_audio',
        loggedinuseridDB: this.mymodulevariables.globaluserid,
        group_idDB: this.group_id_retrieved,
        audiorecordedDB: audiopath,
        audiodurationDB: audioduration,
        audionameDB: audioname
      };

      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

        //refresh the virtual table messages to add only the neww message to the list of html messages
        this.loadvirtualgroupmessages();
        this.scrolltobottom(); //finally scroll to the bottom of the page to see the last message
        this.audioduration = 0; //clear the audioduration variable
      });
    }, 500); //we save into the database after 0.5 seconds because the duration of the file would have been retrieved by then
  }



  //play the recorded audio
  playrecordedaudio(count) {

    /**if we are playing the file for the first time that means we first need to use the media
     * plugin to convert it then we set the converted state to true so that next time we play again 
     * we dont need to convert
     */

    //if audio has been converted by media plugin already
    if (count.audioconvertedtomediapluginformat == true) {
      count.playiconactive = false;
      count.pauseiconactive = true;
      count.stopiconactive = true;
      this.styledToastmessage("playing audio")

      count.grp_audio_recorded_fetched.setVolume(1.0);
      count.grp_audio_recorded_fetched.play();
    }

    //if audio hasnt been converted by media plugin
    else {
      count.grp_audio_recorded_fetched = this.media.create(count.grp_audio_recorded_fetched);
      count.audioconvertedtomediapluginformat = true;

      count.playiconactive = false;
      count.pauseiconactive = true;
      count.stopiconactive = true;
      this.styledToastmessage("playing audio")

      count.grp_audio_recorded_fetched.setVolume(1.0);
      count.grp_audio_recorded_fetched.play();
    }
  }

  //pause the playing audio
  pauserecordedaudio(count) {
    count.pauseiconactive = false;
    count.resumeiconactive = true;
    console.log("paused audio")

    //now to pause the playing audio
    //before it pauses we get the position of the audio
    count.grp_audio_recorded_fetched.getCurrentPosition().then((position) => {

      //retrieve position of the paused video into our textarea
      this.positioninput = position + " sec";

      //then we pause it 
      count.grp_audio_recorded_fetched.pause();
    });
  }

  //resume the paused audio
  resumerecordedaudio(count) {
    count.resumeiconactive = false;
    count.pauseiconactive = true;
    console.log("resumed audio")

    count.grp_audio_recorded_fetched.play();

    // // SeekTo to 10 seconds after 5 seconds
    // //ie. move play to what is at second 10 and continue from there
    // setTimeout(() => {
    //   this.myaudio.seekTo(10000)
    // }, 5000);
  }

  //stop the playing audio
  stoprecordedaudio(count) {
    count.stopiconactive = false;
    count.playiconactive = true;
    count.pauseiconactive = false;
    count.resumeiconactive = false;
    console.log("stopped audio")

    //now to stop the  playing audio
    count.grp_audio_recorded_fetched.stop();
  }


  //capture video
  capturevideo() {
    let options: CaptureVideoOptions = { limit: 1 }
    this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => {

      //sorting the array in the returned data to retrieve our video file
      var videodata: any = data;
      videodata = JSON.stringify(data);
      videodata = JSON.parse(videodata);

      //finally we can retrieve the video file with
      for (var key in videodata) {
        var videofileretrieved: any = videodata[key].fullPath;
      }

      const confirm = this.alertCtrl.create({
        title: '',
        message: 'Send video?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {

              this.sendingloader(); //show sending... loader as backend functions are being run
              console.log("send video to database");

              //send video to database
              this.sendvideotodb(videofileretrieved);
            }
          },
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      confirm.present();
    }, (err) => {
      this.alertmsg(err);
      console.log(err);
    })
  }


  //upload video 
  uploadvideo() {
    var CameraOptions = {
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.VIDEO
    };

    this.camera.getPicture(CameraOptions).then((data) => {

      /**playing video with streamingmedia plugin */
      this.streamingMedia.playVideo(data);

      console.log("video data", data);

      const confirm = this.alertCtrl.create({
        title: '',
        message: 'Send video?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {

              this.sendingloader(); //show sending... loader as backend functions are being run
              console.log("send video to database");

              //send video to database
              data = 'file://' + data;  //we add this so that we can be able to use filetransfer plugin to download
              this.sendvideotodb(data);
            }
          },
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      confirm.present();
    }, (err) => {
      this.alertmsg(err);
      console.log(err);
    })
  }


  //actual sending of video to db
  sendvideotodb(videofile) {

    //first generate thumbnail from video file
    const options: CreateThumbnailOptions = {
      atTime: 1,
      height: 1024,
      width: 1024,
      quality: 100,
      fileUri: videofile, // looks something like this : http://example.com/filename.mp4
      outputFileName: videofile.substring(videofile.lastIndexOf('/') + 1)
    };

    this.videoEditor.createThumbnail(options).then((thumbnailfile) => {

      console.log("thumbnail image", thumbnailfile);

      this.thumbnailfromvideo = 'file://' + thumbnailfile;  //we've generated our thumbnail
      console.log("thumbnail path: ", this.thumbnailfromvideo);

      var fileName = this.thumbnailfromvideo.substring(this.thumbnailfromvideo.lastIndexOf("/") + 1)
      console.log("thumbnail name: ", fileName);

      //convert for ionic webview presentation
      // this.thumbnailfromvideo = this.win.Ionic.WebView.convertFileSrc(this.thumbnailfromvideo); 

      //now to encode the thumbnail retrieved into base64
      JSON.stringify(this.thumbnailfromvideo);

      //encoding function
      this.base64.encodeFile(this.thumbnailfromvideo).then((base64File: string) => {
        console.log("base64 converter data", base64File);

        //remove some characters at the beginning of the base64file string
        base64File = base64File.replace('data:image/*;charset=utf-8;base64,', '')

        // this.thumbnailfromvideo = base64File;

        //finally send video to db
        let body = {
          mydbfunc: 'sendgroupmessage_video',
          loggedinuseridDB: this.mymodulevariables.globaluserid,
          group_idDB: this.group_id_retrieved,
          thumbnailDB: base64File,
          videoDB: videofile
        };

        this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
          this.loader.dismiss();
          this.styledToastmessage("video sent")

          //refresh the virtual table messages to add only the neww message to the list of html messages
          this.loadvirtualgroupmessages();
          this.scrolltobottom(); //finally scroll to the bottom of the page to see the last message
        });

      }, (err) => {
        console.log("base64 converter error", err);
      });

    }, (err) => {
      this.alertmsg(err);
      console.log(err);
    });

  }


  //play video in message
  playvideo(count) {
    this.streamingMedia.playVideo(count.grp_video_fetched);
  }



  //upload file 
  uploadfile() {
    if (this.platform.is('android')) {
      this.fileChooser.open()
        .then(
          uri => {
            this.filePath.resolveNativePath(uri)
              .then(url => {

                this.sendingloader(); //show sending... loader as backend functions are being run

                // url is path of selected file
                console.log("file path: ", url);
                this.selectedfilepath = url;

                var fileName = url.substring(url.lastIndexOf("/") + 1)
                // fileName is selected file's name
                console.log("file name: ", fileName)
                this.selectedfilename = fileName;

                //retrieve mime type and extension of selected file
                this.viewfileextensionandmimetype();

                //retrieve size of selected file
                this.viewselectedfilesize();

                //finally send file to database after a few seconds(delay due to the fact that we want to retrieve file size and mime type)
                setTimeout(() => {
                  this.sendfiletodb();
                }, 2000);

              })
              .catch(err => console.log(err));
          }
        )
        .catch(error => {
          console.log(error)
        });
    } else {

      //use getFile('all') if u want to select all file types
      this.docPicker.getFile('pdf')
        .then(uri => {

          //uri is the path of the selected file
          console.log("file path: ", uri)
          this.selectedfilepath = uri;

          var fileName = uri.substring(uri.lastIndexOf("/") + 1)
          //fileName is the selected file's name
          console.log("file name: ", fileName);
          this.selectedfilename = fileName;

          //retrieve mime type and extension of selected file
          this.viewfileextensionandmimetype();

          //retrieve size of selected file
          this.viewselectedfilesize();

          //finally send file to database after a few seconds(delay due to the fact that we want to retrieve file size and mime type)
          setTimeout(() => {
            this.sendfiletodb();
          }, 2000);

        })
        .catch(e => console.log(e));
    }
  }



  //retrive the extension  and mime type of selected file   eg. .mp3, .mp4, .xlsx, .ppt, .pptx, etc
  viewfileextensionandmimetype() {
    let fileExtn = this.selectedfilename.split('.').reverse()[0];
    this.selectedfileextension = fileExtn;

    console.log("selected file's extension", this.selectedfileextension);

    let fileMIMEType = this.getMIMEtype(this.selectedfileextension);
    this.selectedfilemimetype = fileMIMEType;

    console.log("selected file's mime type", this.selectedfilemimetype);

  }



  //retrieve the mime type of selected file eg. 'image/jpeg', 'text/plain', 'application/pdf'
  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {

      //text file
      'txt': 'text/plain',
      'html': 'text/html',
      'htm': 'text/html',
      'css': 'text/css',
      'vcf': 'text/x-vcard',

      //office document files
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf': 'application/rtf',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

      //pdf files
      'pdf': 'application/pdf',

      //image files
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'bmp': 'image/bmp',
      'png': 'image/png',
      'gif': 'image/gif',
      'ico': 'image/x-icon',
      'tif': 'image/tiff',
      'tiff': 'image/tiff',

      //mime for audio files
      'mp3': 'audio/mpeg',
      'm3u': 'audio/x-mpegurl',
      'wav': 'audio/x-wav',

      //zip files
      'tgz': 'application/x-compressed',
      'zip': 'application/zip',

      //video files
      'swf': 'application/x-shockwave-flash',
      'mp4': 'video/mp4',
      'avi': 'video/x-msvideo',
      'movie': 'video/x-sgi-movie',
      'mov': 'video/quicktime',
      'flv': 'video/x-flv',
      'ts': 'video/MP2T',
      '3gp': 'video/3gpp',
      'wmv': 'video/x-ms-wmv',
    }
    return MIMETypes[ext];
  }



  //view selected file's size
  viewselectedfilesize() {

    this.file.resolveLocalFilesystemUrl(this.selectedfilepath).then((fileEntry: any) => {
      fileEntry.getMetadata((metadata) => {

        //the size returned from metadata is in bytes
        this.selectedfilesize = metadata.size;

        //now we convert to kb , mb or gb
        if (this.selectedfilesize < 1024) {
          this.selectedfilesize = this.selectedfilesize + " Bytes";
        }

        else if (this.selectedfilesize < 1048576) {
          this.selectedfilesize = (this.selectedfilesize / 1024).toFixed(1) + " KB"; //toFixed is the number of decimal points u want

          // this.selectedfilesize = parseInt(this.selectedfilesize); //convert from string to number
          // this.selectedfilesize = Math.ceil(this.selectedfilesize); //round to nearest whole number
          // this.selectedfilesize = this.selectedfilesize.toString() + "KB" //convert back to string and add size name
        }

        else if (this.selectedfilesize < 1073741824) {
          this.selectedfilesize = (this.selectedfilesize / 1048576).toFixed(1) + " MB"; //toFixed is the number of decimal points u want

          // this.selectedfilesize = parseInt(this.selectedfilesize); //convert from string to number
          // this.selectedfilesize = Math.ceil(this.selectedfilesize); //round to nearest whole number
          // this.selectedfilesize = this.selectedfilesize.toString() + "MB" //convert back to string and add size name
        }

        else {
          this.selectedfilesize = (this.selectedfilesize / 1073741824).toFixed(1) + " GB"; //toFixed is the number of decimal points u want

          // this.selectedfilesize = parseInt(this.selectedfilesize); //convert from string to number
          // this.selectedfilesize = Math.ceil(this.selectedfilesize); //round to nearest whole number
          // this.selectedfilesize = this.selectedfilesize.toString() + "GB" //convert back to string and add size name
        }

        console.log("selected file size in bytes", this.selectedfilesize);//metadata.size is the size in bytes     
      });
    });
  }




  //actual sending of file to database
  sendfiletodb() {

    let body = {
      mydbfunc: 'sendgroupmessage_file',
      loggedinuseridDB: this.mymodulevariables.globaluserid,
      group_idDB: this.group_id_retrieved,
      filenameDB: this.selectedfilename,
      filepathDB: this.selectedfilepath,
      filemimetypeDB: this.selectedfilemimetype,
      filesizeDB: this.selectedfilesize
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.loader.dismiss();
      this.styledToastmessage("file sent")

      //refresh the virtual table messages to add only the neww message to the list of html messages
      this.loadvirtualgroupmessages();
      this.scrolltobottom(); //finally scroll to the bottom of the page to see the last message
    });
  }




  //open file with its default application from chat page 
  openfile(count) {
    this.fileOpener.open(count.grp_file_path_fetched, count.grp_file_mime_type_fetched)
      .then(() => {
        console.log('File is opened');
      })
      .catch(e => {
        console.log('Error openening file', e);
        this.styledToastmessage("No application to open file")
      });
  }


  //download file from chat page
  downloadfile(count) {

    count.download = false; //hide the download icon
    count.downloading = true; //show the downloading spinner

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(count.grp_file_path_fetched, this.file.externalRootDirectory + '/CamfilaDownloads/Documents/' + count.grp_file_name_fetched).then(  //creates a folder with the one given in the parameter even if the folder doesn't exist
      (data) => {

        count.downloading = false;  //hide the downloading spinner
        count.download = true;  //show the download icon

        // this.styledToastmessage("Document saved to " + 'CamfilaDownloads/Documents/' + count.grp_file_name_fetched);
        this.styledToastmessage("Document saved");
      }, (err) => {
        console.log("Download error", err);
        this.alertmsg(JSON.stringify(err));
      });
  }



  //download video from chat page
  downloadvideo(count) {

    count.download = false; //hide the download icon
    count.downloading = true; //show the downloading spinner

    //retrieve the video name from the video path given since we didnt store the video name in the database
    var videoName = count.grp_video_fetched.substring(count.grp_video_fetched.lastIndexOf("/") + 1)

    //now to download our video
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(count.grp_video_fetched, this.file.externalRootDirectory + '/CamfilaDownloads/Videos/' + videoName).then(  //creates a folder with the one given in the parameter even if the folder doesn't exist
      (data) => {

        count.downloading = false;  //hide the downloading spinner
        count.download = true;  //show the download icon

        // this.styledToastmessage("Video saved to " + 'CamfilaDownloads/Videos/' + videoName);
        this.styledToastmessage("Video saved");
      }, (err) => {
        console.log("Download error", err);
        this.alertmsg(JSON.stringify(err));
      });
  }


  //download image from chat page
  downloadimage(count) {

    count.download = false; //hide the download icon
    count.downloading = true; //show the downloading spinner

    //retrieve the image name from the image path given since we didnt store the image name in the databaase
    var imageName = count.grp_msg_media_fetched.substring(count.grp_msg_media_fetched.lastIndexOf("/") + 1)

    //now to download our video
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(count.grp_msg_media_fetched, this.file.externalRootDirectory + '/CamfilaDownloads/Images/' + imageName).then(  //creates a folder with the one given in the parameter even if the folder doesn't exist
      (data) => {

        count.downloading = false;  //hide the downloading spinner
        count.download = true;  //show the download icon

        // this.styledToastmessage("Image saved to " + 'CamfilaDownloads/Images/' + imageName);
        this.styledToastmessage("Image saved");
      }, (err) => {
        console.log("Download error", err);
        this.alertmsg(JSON.stringify(err));
      });
  }


  //download audio from chat page
  downloadaudio(count) {

    count.download = false; //hide the download icon
    count.downloading = true; //show the downloading spinner

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(count.grp_audio_recorded_fetched, this.file.externalRootDirectory + '/CamfilaDownloads/Audio/' + count.grp_audio_name_fetched).then(  //creates a folder with the one given in the parameter even if the folder doesn't exist
      (data) => {

        count.downloading = false;  //hide the downloading spinner
        count.download = true;  //show the download icon

        // this.styledToastmessage("Audio saved" + 'CamfilaDownloads/Audio/' + count.grp_audio_name_fetched);
        this.styledToastmessage("Audio saved");
      }, (err) => {
        console.log("Download error", err);
        this.alertmsg(JSON.stringify(err));
      });
  }


  //cancel download for file or image or audio or video
  canceldownload(count) {
    count.downloading = false;  //hide the downloading spinner
    count.download = true;  //show the download icon

    //cancel download function
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.abort();
  }


  //styled toast message
  styledToastmessage(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'middle',
      cssClass: "microphonetoast"
    });
    toast.present();
  }


  //alert message
  alertmsg(msg) {
    const alert = this.alertCtrl.create({
      title: 'alert!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  //this function displays the loading event
  sendingloader() {
    this.loader = this.loadingCtrl.create({
      content: "sending...",
      //duration: 2000 ...when no duration is set it loads forever until loader.dismiss() is called
    });
    this.loader.present();
  }



  /************************exit group functions ***********************/

  //show alert before exit
  showalert() {
    const confirm = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Are you sure you want to leave this group?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            //exit group function
            this.updategroup_members_joined();
            this.exitgroup();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    confirm.present();
  }


  exitgroup() {
    let body = {
      logged_in_useridDB: this.mymodulevariables.globaluserid, //logged in user's id
      group_joining_idDB: this.group_id_retrieved, //followed person's id 
      mydbfunc: 'exitgroup'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      //now we can finally leave the page
      this.viewCtrl.dismiss();
    });
  }

  //update the number of members who are in the selected group
  updategroup_members_joined() {

    //sub one from the members joined since we are exiting the group
    this.members_joined--;

    let body = {
      group_idDB: this.group_id_retrieved, //followed person's id 
      members_joinedDB: this.members_joined,
      mydbfunc: 'updategroup_memberscount'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }


  /************************exit group functions ***********************/



  //swipe to delete user's own message
  deletemymessage($e, count) {

    console.log($e.deltaX + ", " + $e.deltaY);
    if ($e.deltaX > 0) {
      console.log("Swipe from Left to Right");

    } else {

      console.log("Swipe from Right to Left");

      /**to ensure the accuracy of the swipe i
       * defined a range of swipe to which we can perform a delete
       */
      if (($e.deltaY >= 2) && ($e.deltaY <= 30)) {  //good range for a swipe from right to left

        if (this.popupmessageshownalready == false) { //if popup for this selected message hasnt been shown already when user tried to delete the selceted message

          //display popup message to delete selected message and set the state to true
          this.popupmessageshownalready = true;

          //now delete message from db
          const confirm = this.alertCtrl.create({
            title: '',
            message: 'delete message?',
            enableBackdropDismiss: false, //prevent control box from closing when user clicks outside of box area
            buttons: [
              {
                text: 'Yes',
                handler: () => {

                  //delete message from db
                  let body = {
                    message_idDB: count.grp_msg_id_fetched,
                    mydbfunc: 'delete_groupmessage'
                  }

                  this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
                    // this.groupmessagetablerows.splice(count); //remove message from array
                    this.loadgroupmessages();
                    this.scrolltobottom();
                    this.popupmessageshownalready = false; //indicating we can show our popup message again
                  });
                }
              },
              {
                text: 'Cancel',
                handler: () => {
                  console.log('Cancel clicked');
                  this.popupmessageshownalready = false; //indicating we can show our popup message again
                }
              }
            ]
          });
          confirm.present();
        }
        else {
          //do nothing
        }
      }
    }
  }


  //swipe to delete other user's message (note we just remove it from the page..we shouldnt delte someone's messages he has sent from the database)
  deleteotherusersmessage($e, count) {
    console.log($e.deltaX + ", " + $e.deltaY);
    if ($e.deltaX > 0) {
      console.log("Swipe from Left to Right");
      //remove message from page
      //this.dmmsgstablerows.splice(count, 1);
      // count.dm_msg_fetched ="this message was deleted"
      // count.dm_msg_time_fetched = "";

    } else {
      console.log("Swipe from Right to Left");
    }
  }


}
