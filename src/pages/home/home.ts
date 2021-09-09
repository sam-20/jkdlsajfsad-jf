import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController, ModalController, Tabs, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  //splashscreen settings
  splash = this.mymodulevariables.activatesplash;
  tabBarElement: any;

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  messagetablerows: any = []; //this array will receive the rows from the from the converted jsonformat 


  /**another table to store the messages in the database just like the table above
   * however this will be a virtual one and we wont display the messages from this table into the html
   * its function is to just reload automatically after every second so that it always keeps the new messages being
   * entered by other users..
   * after every reload if theres a new message which has been sent by a user then we add that particular
   * message to the original messagetablerows so that it displays it as well
   * if ther's no new messages after reloading ..we do nothing
   */
  virtualjsonconvertedrows: any = [];
  virtualmessagetablerows: any = [];

  /**this table will store the msg_id of messages that the logged in user has pinned in the pinnedmessages table..
   * it will be run accross all the messages in the messages table
   * if a msg_id in messages table matches with a msg_id in pinnedmessages table it means the message has been pinned 
   * hence we will set the default color for the pin icon to show that the message has been pinned already */
  pinnedmsgids: any = [];
  pinnedmsgsidsjsonconvertedrows: any[];


  /**this table will store the msg_id of messages that the logged in user has liked in the likedmessages table..
   * it will be run accross all the messages in the messages table
   * if a msg_id in messages table matches with a msg_id in likedmessages table it means the message has been liked 
   * hence we will set the default color for the like icon to show that the message has been liked already */
  likedmsgids: any = [];
  likedmsgsidsjsonconvertedrows: any[];


  /**this table will store the msg_id of messages that the logged in user has posted as comments
   * it will be run accross all the messages in the messages table
   * if a msg_id in messages table matches with a msg_id in commentmsgids table it means the message is a comment 
   * hence we will set the "iscomment" property for that message to "true" and add that comment msg's commented message's info into the message table rows 
   * by  means of the new properties we have added to the messagetablerows*/
  commentmsgids: any = [];
  commentmsgsidsjsonconvertedrows: any[];


  messageidforDB: any //this will collect any selected message's id and store it to be used in the database
  receiveridforDB: any //this will collect the selected message's user id ..for use in notifications
  totallikes: any // this will collect the total likes for a selected message and use for update in the messages table

  server: string; /******************************a */

  private timeoutId: number; //auto refresh 1


  /**we want to show an error message when there's no internet connection 
   * initially this variable is set to false before the page loads
   * after it has loaded and there's no internet connection, it gives the error message and then sets the variable to true to prevent it 
   * from repeating in case theer's still no internet connection
  */
  alreadysenterrormessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private photoViewer: PhotoViewer,
    public alertCtrl: AlertController, public app: App,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
    private tabs: Tabs,
    public toastCtrl: ToastController) {

    //splash screen settings..(retreiveing the class of the tabbar of the page so that we can hide it when splash screen loads and display after loading splash screen)
    this.tabBarElement = document.querySelector('.tabbar');

    this.server = postPvdr.server; /*********************b */
  }

  //codes here are executed when the page loads
  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');
    //console.log('logged in user id :', this.mymodulevariables.globaluserid);
    //this.loadpagedata();  //used for loading asynchronous data

    /*settings for our splash screen **/

    /**if there's going to be a splash we set our splashscreen to last for 6seconds*/
    if (this.splash == true) {
      this.tabBarElement.style.display = 'none';    //hiding the tab bar when the splash screen is loading
      setTimeout(() => {
        this.splash = false;
        this.tabBarElement.style.display = 'flex';  //showing the tab bar again after hiding it 
      }, 6000);
    }

    /**if ther's not going to a splash then we want the splash time to run out early so that we can display the tabbar of the home page */
    else {
      this.tabBarElement.style.display = 'none';    //hiding the tab bar when the splash screen is loading
      setTimeout(() => {
        this.splash = false;
        this.tabBarElement.style.display = 'flex';  //showing the tab bar again after hiding it 
      }, 0);
    }

  }

  ionViewCanEnter() {
    //this.loadpagedata();  //used for loading asynchronous data
  }

  ionViewDidEnter() {
    this.startAutoRefresh();  //auto refresh 2 
  }


  private startAutoRefresh() {  //auto refresh 3
    this.refreshcode();
    this.timeoutId = setInterval(() => this.refreshcode(), 1 * 1000); //auto refresh after 5 seconds
  }


  private refreshcode() { //auto refresh 4
    /**this function is to just reload automatically after every second so that it always keeps the new messages being
   * entered by other users into the virtual messages table rows
   * after every reload if theres a new message which has been sent by a user then we add that particular
   * message to the original messagetablerows so that it displays it as well
   * if ther's no new messages after reloading ..we do nothing
   */
    this.virtualloadallmessages();
  }



  private stopRefresh() { //auto refresh 5
    clearInterval(this.timeoutId);
  }

  ionViewDidLeave() { //auto refresh 6
    this.stopRefresh();

    // this.pinnedmsgids = [];
    // this.likedmsgids = [];
    // this.commentmsgids = [];
    // this.messagetablerows = [];
  }


  // //codes here are executed when the user selects the tab
  // ionViewWillEnter() {
  //   this.loadpagedata();  //used for loading asynchronous data

  //   //store user id credential for auto login in case user didnt logout 
  //   window.localStorage.setItem("userIDcredential", this.mymodulevariables.globaluserid);
  // }

  ngOnInit() {
    this.loadpagedata();  //used for loading asynchronous data

    //store user id credential for auto login in case user didnt logout 
    window.localStorage.setItem("userIDcredential", this.mymodulevariables.globaluserid);
  }

  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    //console.log('Refresh started');
    //console.log('logged in user id: ', this.mymodulevariables.globaluserid);
    this.pinnedmsgids = []; //clear all messages in the pinnedmessages array
    this.loadpinnedmessages();  //load new pinned messages into pinned messages array
    this.likedmsgids = []; // clear all the messages in the likedtable array
    this.loadlikedmessages(); //load newly liked messages into the liked messages array
    this.commentmsgids = []; //clear all messages in the commentmsgs array
    this.loadcommentmessages()  //load newly commented messages into the comments messages array

    setTimeout(() => {
      //finally output our messages 
      this.commentmsgids = []; //clear all messages in the commentmsgs array
      this.loadcommentmessages()  //load newly commented messages into the comment array
      this.finalload();
      //console.log('Refresh complete');

    }, 0); //duration of refresh
  }

  finalload() {

    setTimeout(() => {
      //finally output our messages 
      this.messagetablerows = [];  //clear all messaegs in the messages array
      this.loadallmessages();
    }, 10); //duration after which it should execute
  }


  //load only user's pinned messages
  loadpinnedmessages() {
    let body = {
      mydbfunc: 'displayuserpinnedmessages',  //we can get the pinned messages ids from the db query function which we use to load the pinned messages in our pinnedmessages page
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    //posting our data to the api 
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //console.log(data);

      /***data inside the .subscribe contains our records 
            * but we cant use it in its original format 
            * so we convert into a usable format 
            * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.pinnedmsgsidsjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our pinnedmsgids table for matching up with the tablerows data**/
      for (let count of this.pinnedmsgsidsjsonconvertedrows) {
        this.pinnedmsgids.push(count);
      }
      // console.log('pinned messages: ', this.pinnedmsgids);
      //console.log('pinned messages length: ', this.pinnedmsgids.length)
    });
  }



  //load only user's liked messages
  loadlikedmessages() {
    let body = {
      mydbfunc: 'displayuserlikedmessages',  //we can get the pinned messages ids from the db query function which we use to load the pinned messages in our pinnedmessages page
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    //posting our data to the api 
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //console.log(data);

      /***data inside the .subscribe contains our records 
            * but we cant use it in its original format 
            * so we convert into a usable format 
            * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.likedmsgsidsjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our pinnedmsgids table for matching up with the tablerows data**/
      for (let count of this.likedmsgsidsjsonconvertedrows) {
        this.likedmsgids.push(count);
      }
      // console.log('liked messages: ', this.likedmsgids);
      //console.log('liked messages length', this.likedmsgids.length)
    });
  }



  //load all comment messages info..note we have to see everyone's comments in our home messages
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
      // console.log('comment messages: ', this.commentmsgids);
      //console.log('comment messages length', this.commentmsgids.length)
    });
  }



  //load all messages
  loadallmessages() {

    //stuff we want to post to our database
    let body = {
      mydbfunc: 'displayallmessages' //function  to be used in php file
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
       * into our messagetablerows for use in the html**/
      for (let count of this.jsonconvertedrows) {
        this.messagetablerows.push(count);
      }


      //sorting the ids of the dm messages so that it appears message after messages based on id in the html
      //this.messagetablerows.sort((a, b) => b.message_id_fetched - a.message_id_fetched) 
      //b comes before a in the second part of the line because i want the latest ids to be at the top


      //lets look at the data in messagetablerows
      //console.log('messages: ', this.messagetablerows);
      //console.log('messages length: ', this.messagetablerows.length);

      /**we add another property called pincolor to messagetablerows and assign default colors to it for it to look like
       * {message_id_fetched: "64", message_fetched: "look at me", pincolor:"dark"}
       * so that we can call it in the html like {{count.pincolor}}**/
      this.messagetablerows.forEach(function (element) { element.pincolor = "dark"; });
      this.messagetablerows.forEach(function (element) { element.pinIcon = "star-outline"; });

      this.messagetablerows.forEach(function (element) { element.likecolor = "dark"; });
      this.messagetablerows.forEach(function (element) { element.heartIcon = "ios-heart-outline"; });

      this.messagetablerows.forEach(function (element) { element.commentcolor = "dark"; });
      this.messagetablerows.forEach(function (element) { element.commentIcon = "ios-text-outline"; });


      //adding new properties to the messagetablerows once again to store info of messages that have been commented
      //only msgs that are comments will have values assigned to them
      //these are the values we assign by default
      this.messagetablerows.forEach(function (element) { element.iscomment = "false"; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_id = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_message = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_messagemedia = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_likes = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_comments = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_date_created = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_userid = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_username = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_profile_pic = null; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_commentcolor = "secondary"; });

      this.messagetablerows.forEach(function (element) { element.commentedmsg_likecolor = "dark"; });
      this.messagetablerows.forEach(function (element) { element.commentedmsg_heartIcon = "ios-heart-outline"; });

      this.messagetablerows.forEach(function (element) { element.commentedmsg_pincolor = "dark"; });


      //lets look at how the data in messagetable rows looks like now ie. it has added another property or column to the array
      //console.log('messages + all properties addded', this.messagetablerows);
      //console.log('messages length', this.messagetablerows.length);

      /**now we have have the messages in the messagetablerows array so we are 
      we are going to check if a profile pic is null then we assign our pic to the user **/
      for (var key in this.messagetablerows) {
        if ((this.messagetablerows[key].sender_profile_pic_fetched) == null) {
          this.messagetablerows[key].sender_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**we have our messages data and pinned messages data
      we run a loop comparing those two tables and when we realize that a msg id in the messages table
      has been pinned by the user in the pinnedmessages table
      we change the default pincolor value which was dark to primary indicating that the message has been pinned **/
      for (var msgtableloop1 = 0; msgtableloop1 < this.messagetablerows.length; msgtableloop1++) { //looping through the entire messages rows
        for (var pinnedmsgloop = 0; pinnedmsgloop < this.pinnedmsgids.length; pinnedmsgloop++) { // looping through the pinned messages rows
          if (this.messagetablerows[msgtableloop1].message_id_fetched == this.pinnedmsgids[pinnedmsgloop].message_id_fetched) {  //if a match is found
            //console.log('pinned msg id: ', this.messagetablerows[msgtableloop1].message_id_fetched);  //log matched up msg id
            this.messagetablerows[msgtableloop1].pincolor = "primary" //assign a primary color to the pincolor property of that message's row
            this.messagetablerows[msgtableloop1].pinIcon = "star"
          }
        }
      }


      /**we have our messages data and liked messages data
      we run a loop comparing those two tables and when we realize that a msg id in the messages table
      has been liked by the user in the likedmessages table
      we change the default likecolor value which was dark to danger indicating that the message has been liked by the user already **/
      for (var msgtableloop2 = 0; msgtableloop2 < this.messagetablerows.length; msgtableloop2++) { //looping through the entire messages rows
        for (var likedmsgloop = 0; likedmsgloop < this.likedmsgids.length; likedmsgloop++) { // looping through the liked messages rows
          if (this.messagetablerows[msgtableloop2].message_id_fetched == this.likedmsgids[likedmsgloop].message_id_fetched) {  //if a match is found
            //console.log('liked message id: ', this.messagetablerows[msgtableloop2].message_id_fetched);  //log matched up msg id
            this.messagetablerows[msgtableloop2].likecolor = "danger" //assign a danger color to the likecolor property of that message's row
            this.messagetablerows[msgtableloop2].heartIcon = "ios-heart"
          }
        }
      }


      /**we have our messages data and comments messages data
     we run a loop comparing those two tables and when we realize that a msg id in the messages table = a msg id in the comments table
     then the message is a comment..now for that message which is a comment we attach to the newly created properties of the messagetablerows, the info the message
     we commented**/
      for (var msgtableloop3 = 0; msgtableloop3 < this.messagetablerows.length; msgtableloop3++) { //looping through the entire messages rows
        for (var commentmsgloop = 0; commentmsgloop < this.commentmsgids.length; commentmsgloop++) { // looping through the comment messages rows
          if (this.messagetablerows[msgtableloop3].message_id_fetched == this.commentmsgids[commentmsgloop].commenter_msg_id_fetched) {  //if a match is found
            //console.log('comment message id: ', this.messagetablerows[msgtableloop3].message_id_fetched);  //log matched up msg id

            //now if we found a match we change and add some new values to the properties which were created and joined to the messagetablerows
            this.messagetablerows[msgtableloop3].iscomment = "true" //we are made aware the message is a comment
            this.messagetablerows[msgtableloop3].commentedmsg_id = this.commentmsgids[commentmsgloop].commentedmsg_id_fetched;
            this.messagetablerows[msgtableloop3].commentedmsg_message = this.commentmsgids[commentmsgloop].commentedmsg_message_fetched;
            this.messagetablerows[msgtableloop3].commentedmsg_messagemedia = this.commentmsgids[commentmsgloop].commentedmsg_messagemedia_fetched;
            this.messagetablerows[msgtableloop3].commentedmsg_likes = this.commentmsgids[commentmsgloop].commentedmsg_likes_fetched;
            this.messagetablerows[msgtableloop3].commentedmsg_comments = this.commentmsgids[commentmsgloop].commentedmsg_comments_fetched;
            this.messagetablerows[msgtableloop3].commentedmsg_date_created = this.commentmsgids[commentmsgloop].commentedmsg_date_created_fetched;
            this.messagetablerows[msgtableloop3].commentedmsg_userid = this.commentmsgids[commentmsgloop].commentedmsg_userid_fetched;
            this.messagetablerows[msgtableloop3].commentedmsg_username = this.commentmsgids[commentmsgloop].commentedmsg_username_fetched;
            this.messagetablerows[msgtableloop3].commentedmsg_profile_pic = this.commentmsgids[commentmsgloop].commentedmsg_profile_pic_fetched;

            //if there's no profile pic for the user of the commented message..assign a default pic
            if ((this.messagetablerows[msgtableloop3].commentedmsg_profile_pic) == null) {
              this.messagetablerows[msgtableloop3].commentedmsg_profile_pic = "defaultprofilepic/defaultprofilepic.jpg";
            }
          }
        }
      }


      //we have our messages data now but for any message that has been liked or unliked we have to let any commented message of the same id to also be automatically liked or unliked
      //we compare the overall table messages with itself again to match any message id with a commented message id..then we assign the like color of the original message
      //to the like color of the commented message
      for (var overallmessagesloopA = 0; overallmessagesloopA < this.messagetablerows.length; overallmessagesloopA++) {
        for (var overallmessagesloopB = 0; overallmessagesloopB < this.messagetablerows.length; overallmessagesloopB++) {
          if (this.messagetablerows[overallmessagesloopA].message_id_fetched == this.messagetablerows[overallmessagesloopB].commentedmsg_id) {
            this.messagetablerows[overallmessagesloopB].commentedmsg_likecolor = this.messagetablerows[overallmessagesloopA].likecolor;
          }
        }
      }


      /**
       * compare liked messages table with commented message to see if user
       * has already liked commented message
       */
      for (var msgtableloop2 = 0; msgtableloop2 < this.messagetablerows.length; msgtableloop2++) { //looping through the entire messages rows
        for (var likedmsgloop = 0; likedmsgloop < this.likedmsgids.length; likedmsgloop++) { // looping through the liked messages rows
          if (this.messagetablerows[msgtableloop2].commentedmsg_id == this.likedmsgids[likedmsgloop].message_id_fetched) {  //if a match is found
            this.messagetablerows[msgtableloop2].commentedmsg_likecolor = "danger" //assign a danger color to the likecolor property of that message's row
            this.messagetablerows[msgtableloop2].commentedmsg_heartIcon = "ios-heart"
          }
        }
      }




      //we have our messages data now but for any message that has been pinned or unpinneed we have to let any commented message of the same id to also be automatically pinned or unpinned
      //we compare the overall table messages with itself again to match any message id with a commented message id..then we assign the pin color of the original message
      //to the pin color of the commented message
      for (var overallmessagesloopA = 0; overallmessagesloopA < this.messagetablerows.length; overallmessagesloopA++) {
        for (var overallmessagesloopB = 0; overallmessagesloopB < this.messagetablerows.length; overallmessagesloopB++) {
          if (this.messagetablerows[overallmessagesloopA].message_id_fetched == this.messagetablerows[overallmessagesloopB].commentedmsg_id) {
            this.messagetablerows[overallmessagesloopB].commentedmsg_pincolor = this.messagetablerows[overallmessagesloopA].pincolor;
          }
        }
      }



      console.log('messagetablerows: ', this.messagetablerows);

      /**now by default our comments icon is dark..however we want to differentiate commented msgs from others by changing the color of the icon
       * hence when the comments for the particular msg is more than 0 we change the color of the comment icon to indicate someone has commented on the message
       */
      for (var key in this.messagetablerows) {
        if ((this.messagetablerows[key].comments_fetched) > 0) {
          this.messagetablerows[key].commentcolor = "secondary";
          this.messagetablerows[key].commentIcon = "ios-text";
        }
      }

      /**remove duplicates from the messagestablerows */
      this.messagetablerows = this.messagetablerows.reduce((unique, o) => {
        if (!unique.some(obj => obj.message_id_fetched === o.message_id_fetched)) {
          unique.push(o);
        }
        return unique;
      }, []);

    }, err => {  //log php connection error
      // console.log(err);

      if (this.alreadysenterrormessage == true) {
        // do nothing 
      }

      else { //show the internet conncetion error msg 
        this.connectionerrorAlert();
        this.alreadysenterrormessage = true;
      }

      this.loadpagedata();  //load page data again 
    });
  }


  /**this function is to just reload automatically after every second so that it always keeps the new messages being
   * entered by other users into the virtual messages table rows
   * after every reload if theres a new message which has been sent by a user then we add that particular
   * message to the original messagetablerows so that it displays it as well
   * if ther's no new messages after reloading ..we do nothing
   */
  virtualloadallmessages() {
    this.virtualjsonconvertedrows = [];
    this.virtualmessagetablerows = [];

    //stuff we want to post to our database
    let body = {
      mydbfunc: 'displayallmessages' //function  to be used in php file
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //console.log(data);

      /***data inside the .subscribe contains our records 
       * but we cant use it in its original format 
       * so we convert into a usable format 
       * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.virtualjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
       * into our messagetablerows for use in the html**/
      for (let count of this.virtualjsonconvertedrows) {
        this.virtualmessagetablerows.push(count);
      }

      //sorting the ids of the dm messages so that it appears message after messages based on id in the html
      //this.virtualmessagetablerows.sort((a, b) => b.message_id_fetched - a.message_id_fetched) 
      //b comes before a in the second part of the line because i want the latest ids to be at the top

      //lets look at the data in messagetablerows
      //console.log('messages: ', this.messagetablerows);
      //console.log('messages length: ', this.messagetablerows.length);

      /**we add another property called pincolor to messagetablerows and assign default colors to it for it to look like
       * {message_id_fetched: "64", message_fetched: "look at me", pincolor:"dark"}
       * so that we can call it in the html like {{count.pincolor}}**/
      this.virtualmessagetablerows.forEach(function (element) { element.pincolor = "dark"; });
      this.virtualmessagetablerows.forEach(function (element) { element.pinIcon = "star-outline"; });

      this.virtualmessagetablerows.forEach(function (element) { element.likecolor = "dark"; });
      this.virtualmessagetablerows.forEach(function (element) { element.heartIcon = "ios-heart-outline"; });

      this.virtualmessagetablerows.forEach(function (element) { element.commentcolor = "dark"; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentIcon = "ios-text-outline"; });

      //adding new properties to the messagetablerows once again to store info of messages that have been commented
      //only msgs that are comments will have values assigned to them
      //these are the values we assign by default
      this.virtualmessagetablerows.forEach(function (element) { element.iscomment = "false"; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_id = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_message = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_messagemedia = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_likes = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_comments = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_date_created = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_userid = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_username = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_profile_pic = null; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_commentcolor = "secondary"; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_likecolor = "dark"; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_heartIcon = "ios-heart-ou"; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentedmsg_pincolor = "dark"; });


      //lets look at how the data in messagetable rows looks like now ie. it has added another property or column to the array
      //console.log('messages + all properties addded', this.messagetablerows);
      //console.log('messages length', this.messagetablerows.length);

      /**now we have have the messages in the messagetablerows array so we are 
      we are going to check if a profile pic is null then we assign our pic to the user **/
      for (var key in this.virtualmessagetablerows) {
        if ((this.virtualmessagetablerows[key].sender_profile_pic_fetched) == null) {
          this.virtualmessagetablerows[key].sender_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**we have our messages data and pinned messages data
      we run a loop comparing those two tables and when we realize that a msg id in the messages table
      has been pinned by the user in the pinnedmessages table
      we change the default pincolor value which was dark to primary indicating that the message has been pinned **/
      for (var msgtableloop1 = 0; msgtableloop1 < this.virtualmessagetablerows.length; msgtableloop1++) { //looping through the entire messages rows
        for (var pinnedmsgloop = 0; pinnedmsgloop < this.pinnedmsgids.length; pinnedmsgloop++) { // looping through the pinned messages rows
          if (this.virtualmessagetablerows[msgtableloop1].message_id_fetched == this.pinnedmsgids[pinnedmsgloop].message_id_fetched) {  //if a match is found
            //console.log('pinned msg id: ', this.messagetablerows[msgtableloop1].message_id_fetched);  //log matched up msg id
            this.virtualmessagetablerows[msgtableloop1].pincolor = "primary" //assign a primary color to the pincolor property of that message's row
            this.virtualmessagetablerows[msgtableloop1].pinIcon = "star" //assign a primary color to the pincolor property of that message's row
          }
        }
      }


      /**we have our messages data and liked messages data
      we run a loop comparing those two tables and when we realize that a msg id in the messages table
      has been liked by the user in the likedmessages table
      we change the default likecolor value which was dark to danger indicating that the message has been liked by the user already **/
      for (var msgtableloop2 = 0; msgtableloop2 < this.virtualmessagetablerows.length; msgtableloop2++) { //looping through the entire messages rows
        for (var likedmsgloop = 0; likedmsgloop < this.likedmsgids.length; likedmsgloop++) { // looping through the liked messages rows
          if (this.virtualmessagetablerows[msgtableloop2].message_id_fetched == this.likedmsgids[likedmsgloop].message_id_fetched) {  //if a match is found
            //console.log('liked message id: ', this.messagetablerows[msgtableloop2].message_id_fetched);  //log matched up msg id
            this.virtualmessagetablerows[msgtableloop2].likecolor = "danger" //assign a danger color to the likecolor property of that message's row
            this.virtualmessagetablerows[msgtableloop2].heartIcon = "ios-heart" //assign a danger color to the likecolor property of that message's row
          }
        }
      }


      /**we have our messages data and comments messages data
     we run a loop comparing those two tables and when we realize that a msg id in the messages table = a msg id in the comments table
     then the message is a comment..now for that message which is a comment we attach to the newly created properties of the messagetablerows, the info the message
     we commented**/
      for (var msgtableloop3 = 0; msgtableloop3 < this.virtualmessagetablerows.length; msgtableloop3++) { //looping through the entire messages rows
        for (var commentmsgloop = 0; commentmsgloop < this.commentmsgids.length; commentmsgloop++) { // looping through the comment messages rows
          if (this.virtualmessagetablerows[msgtableloop3].message_id_fetched == this.commentmsgids[commentmsgloop].commenter_msg_id_fetched) {  //if a match is found
            //console.log('comment message id: ', this.messagetablerows[msgtableloop3].message_id_fetched);  //log matched up msg id

            //now if we found a match we change and add some new values to the properties which were created and joined to the messagetablerows
            this.virtualmessagetablerows[msgtableloop3].iscomment = "true" //we are made aware the message is a comment
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_id = this.commentmsgids[commentmsgloop].commentedmsg_id_fetched;
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_message = this.commentmsgids[commentmsgloop].commentedmsg_message_fetched;
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_messagemedia = this.commentmsgids[commentmsgloop].commentedmsg_messagemedia_fetched;
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_likes = this.commentmsgids[commentmsgloop].commentedmsg_likes_fetched;
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_comments = this.commentmsgids[commentmsgloop].commentedmsg_comments_fetched;
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_date_created = this.commentmsgids[commentmsgloop].commentedmsg_date_created_fetched;
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_userid = this.commentmsgids[commentmsgloop].commentedmsg_userid_fetched;
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_username = this.commentmsgids[commentmsgloop].commentedmsg_username_fetched;
            this.virtualmessagetablerows[msgtableloop3].commentedmsg_profile_pic = this.commentmsgids[commentmsgloop].commentedmsg_profile_pic_fetched;

            //if there's no profile pic for the user of the commented message..assign a default pic
            if ((this.virtualmessagetablerows[msgtableloop3].commentedmsg_profile_pic) == null) {
              this.virtualmessagetablerows[msgtableloop3].commentedmsg_profile_pic = "defaultprofilepic/defaultprofilepic.jpg";
            }
          }
        }
      }


      //we have our messages data now but for any message that has been liked or unliked we have to let any commented message of the same id to also be automatically liked or unliked
      //we compare the overall table messages with itself again to match any message id with a commented message id..then we assign the like color of the original message
      //to the like color of the commented message
      for (var overallmessagesloopA = 0; overallmessagesloopA < this.virtualmessagetablerows.length; overallmessagesloopA++) {
        for (var overallmessagesloopB = 0; overallmessagesloopB < this.virtualmessagetablerows.length; overallmessagesloopB++) {
          if (this.virtualmessagetablerows[overallmessagesloopA].message_id_fetched == this.virtualmessagetablerows[overallmessagesloopB].commentedmsg_id) {
            this.virtualmessagetablerows[overallmessagesloopB].commentedmsg_likecolor = this.virtualmessagetablerows[overallmessagesloopA].likecolor;
          }
        }
      }


      //we have our messages data now but for any message that has been pinned or unpinneed we have to let any commented message of the same id to also be automatically pinned or unpinned
      //we compare the overall table messages with itself again to match any message id with a commented message id..then we assign the pin color of the original message
      //to the pin color of the commented message
      for (var overallmessagesloopA = 0; overallmessagesloopA < this.virtualmessagetablerows.length; overallmessagesloopA++) {
        for (var overallmessagesloopB = 0; overallmessagesloopB < this.virtualmessagetablerows.length; overallmessagesloopB++) {
          if (this.virtualmessagetablerows[overallmessagesloopA].message_id_fetched == this.virtualmessagetablerows[overallmessagesloopB].commentedmsg_id) {
            this.virtualmessagetablerows[overallmessagesloopB].commentedmsg_pincolor = this.virtualmessagetablerows[overallmessagesloopA].pincolor;
          }
        }
      }



      // console.log('virtualmessagetablerows: ', this.virtualmessagetablerows);

      /**now by default our comments icon is dark..however we want to differentiate commented msgs from others by changing the color of the icon
       * hence when the comments for the particular msg is more than 0 we change the color of the comment icon to indicate someone has commented on the message
       */
      for (var key in this.virtualmessagetablerows) {
        if ((this.virtualmessagetablerows[key].comments_fetched) > 0) {
          this.virtualmessagetablerows[key].commentcolor = "secondary";
          this.virtualmessagetablerows[key].commentIcon = "ios-text";
        }
      }

      /**now we have the virtual messages after it was loaded by the above codes
       * since the data keeps refreshing it will have new messages that the original message table wont have
       * so we compare the virtual messages with the origianl messages..if a new message has been added
       * then we send that message to the messagetablerows so that we can see that new message too in the html
       * if no new messages we do nothin
       */
      for (var count of this.virtualmessagetablerows) { //loop through the virtual table whihc has the fresh data
        var index = this.messagetablerows.findIndex(x => x.message_id_fetched == count.message_id_fetched) //go to the original dmmessgetable and compare the msg ids with the virtual table's msg ids

        if (index === -1) { //if the id in virtual table wasnt found in the original dmmessagetable
          //this.loaddmmessages();
          // this.dmmsgstablerows.push({
          //   dm_msg_fetched: this.virtualdmmsgstablerows[count].dm_msg_fetched,
          //   dm_msg_id_fetched: this.virtualdmmsgstablerows[count].dm_msg_id_fetched,
          //   dm_msg_time_fetched: this.virtualdmmsgstablerows[count].dm_msg_time_fetched,
          //   loggedinuser_id_fetched: this.virtualdmmsgstablerows[count].loggedinuser_id_fetched,
          //   user2_id_fetched: this.virtualdmmsgstablerows[count].user2_id_fetched,
          // })

          this.mymodulevariables.globalsendnewmessagealert = 0;

          //push only that message details so that it adds to the current messages in the page
          //if we reload the entire loaddmmessages function its going to load the whole messags and they'd have to disappear and appear again
          this.messagetablerows.push(count);

          this.messagetablerows.sort((a, b) => b.message_id_fetched - a.message_id_fetched)
          //b comes before a in the second part of the line because i want the latest ids to be at the top
          // console.log("message has been added");

          /**update the value in the home tab icon badge to 0 so display a value in the badge which
           * we have modified into a dot so display the dot instead of the badge value
           */
        }

        else {//if the message id is present already
          //do nothing
        }
      }

    }, err => {
      // console.log(err);

      if (this.alreadysenterrormessage == true) {
        // do nothing 
      }

      else { //show the internet conncetion error msg 
        this.connectionerrorAlert();
        this.alreadysenterrormessage = true;
      }

      // this.loadpagedata();  //load page data again 
    });
  }


  //load all comments of selected message
  loadmessagedetails(count) {
    console.log(`count is: ${count}`);


    localStorage.setItem('storedmessageid', count.message_id_fetched) //storing the message id in a local storage for the next page
    localStorage.setItem('storedpincolor', count.pincolor); //storing the pincolor of the message to be commented so that we use it in the next page

    localStorage.setItem('storedlikecolor', count.likecolor); //storing the likecolor of the message to be commented so that we use it in the next page
    localStorage.setItem('storedHeartIcon', count.heartIcon)

    localStorage.setItem('storedcommentcolor', count.commentcolor); //storing the commentcolor of the message to commented so that we use it in the next  page
    this.navCtrl.push('LoadspecificmessagedetailsPage');
  }


  //load all comments of selected commented message
  loadcommentedmessagedetails(count) {
    localStorage.setItem('storedmessageid', count.commentedmsg_id) //storing the message id in a local storage for the next page
    localStorage.setItem('storedpincolor', count.commentedmsg_pincolor); //storing the pincolor of the message to be commented so that we use it in the next page

    localStorage.setItem('storedlikecolor', count.commentedmsg_likecolor); //storing the likecolor of the message to be commented so that we use it in the next page
    localStorage.setItem('storedHeartIcon', count.commentedmsg_heartIcon)

    localStorage.setItem('storedcommentcolor', count.commentcolor); //storing the commentcolor of the message to commented so that we use it in the next  page
    this.navCtrl.push('LoadspecificmessagedetailsPage');
  }


  //pin message
  pinmessage(count) {
    //console.log(this.mymodulevariables.globaluserid);
    //console.log(count.message_id_fetched);  //display the id of the message selected
    this.messageidforDB = count.message_id_fetched;

    if (count.pincolor == 'primary') {
      count.pincolor = 'dark' //meaning user has unpinned msg
      count.pinIcon = 'star-outline'
      this.removepinnedmessage();
      this.pinORunpincommentedmsgwithsameid();  //update any commented message's pin color with the pincolor of the same id as the original message's pincolor 
    }

    else {
      count.pincolor = 'primary'  //meaning user has pinned msg
      count.pinIcon = 'star'
      this.insertpinnedmessage();
      this.pinORunpincommentedmsgwithsameid();  //update any commented message's pin color with the pincolor of the same id as the original message's pincolor 
    }

  }

  //pin message for card 3
  pinmessagecard3(count) {
    //console.log(this.mymodulevariables.globaluserid);
    //console.log(count.message_id_fetched);  //display the id of the message selected
    this.messageidforDB = count.commentedmsg_id;

    if (count.commentedmsg_pincolor == 'primary') {
      count.commentedmsg_pincolor = 'dark' //meaning user has unpinned msg
      count.commentedmsg_pinIcon = 'star-outline' //meaning user has unpinned msg
      this.removepinnedmessage();
      this.pinORunpinoriginalmsgwithsameidcard3();  //update any original message's pin color with the pincolor of the same id as the commented message's pincolor 
    }

    else {
      count.commentedmsg_pincolor = 'primary'  //meaning user has pinned msg
      count.commentedmsg_pinIcon = 'star' //meaning user has unpinned msg
      this.insertpinnedmessage();
      this.pinORunpinoriginalmsgwithsameidcard3();  //update any original message's pin color with the pincolor of the same id as the commented message's pincolor 
    }

  }

  //liking or unliking a message
  likeORunlikemessage(count) {
    //console.log(this.mymodulevariables.globaluserid);
    //console.log(count.message_id_fetched);  //display the id of the message liked
    this.messageidforDB = count.message_id_fetched; //we'd need the liked msg's id for inserting into the likedmessages table
    this.receiveridforDB = count.user_id_fetched //we'd need the id of the user whose msg we have liked to notify them that their message has been liked in the notifications table

    if (count.likecolor == 'dark') {
      count.likecolor = 'danger' //meaning user has liked message
      count.heartIcon = "ios-heart"
      ++count.likes_fetched //add 1 to the total value of likes
      this.totallikes = count.likes_fetched;  //after adding one we send it to the total likes variable for message table likes update
      this.likemessage();
      this.updatetotallikes(); //update the total likes of the message in the database and in the messages table as well
      this.likeORunlikecommentedmsgwithsameid();  //update any commented message in the home messages with the same id as the liked message id

      //if we are liking our own message do nothing
      if (this.receiveridforDB == this.mymodulevariables.globaluserid) {
        //do nothing
      }
      //if we like someone else's message they should receive a notification that their message has been liked
      else {
        this.sendlikenotification();
      }
    }

    else {
      count.likecolor = 'dark'  //meaning user has unliked message 
      count.heartIcon = "ios-heart-outline"
      --count.likes_fetched;  //sub 1 from the total value of likes
      this.totallikes = count.likes_fetched; //after subtracting one we send it to the total likes variable for message table likes update

      //to ensure totallikes doesnt move to -ve
      if (this.totallikes < 0) {
        this.totallikes = 0
      }
      this.unlikemessage();
      this.deletelikenotification()// delete from notification so that the person's whose message has been unliked is not made aware 
      this.updatetotallikes(); //update the total likes of the message in the database and in the messages table as well
      this.likeORunlikecommentedmsgwithsameid();  //update any commented message in the home messages with the same id as the unliked message id
    }
  }


  //liking or unliking a message
  likeORunlikemessagecard3(count) {
    //console.log(this.mymodulevariables.globaluserid);
    //console.log(count.message_id_fetched);  //display the id of the message liked
    this.messageidforDB = count.commentedmsg_id; //we'd need the liked msg's id for inserting into the likedmessages table
    this.receiveridforDB = count.commentedmsg_userid //we'd need the id of the user whose msg we have liked to notify them that their message has been liked in the notifications table

    if (count.commentedmsg_likecolor == 'dark') {
      count.commentedmsg_likecolor = 'danger' //meaning user has liked message
      count.commentedmsg_heartIcon = 'ios-heart'
      ++count.commentedmsg_likes //add 1 to the total value of likes
      this.totallikes = count.commentedmsg_likes;  //after adding one we send it to the total likes variable for message table likes update
      this.likemessage();
      this.updatetotallikes(); //update the total likes of the message in the database and in the messages table as well
      this.likeORunlikeoriginalmsgwithsameid();  //update any original message in the home messages with the same id as the liked commented message id

      //if we are liking our own message do nothing
      if (this.receiveridforDB == this.mymodulevariables.globaluserid) {
        //do nothing
      }
      //if we like someone else's message they should receive a notification that their message has been liked
      else {
        this.sendlikenotification();
      }
    }

    else {
      count.commentedmsg_likecolor = 'dark'  //meaning user has unliked message
      count.commentedmsg_heartIcon = 'ios-heart-outline'
      --count.commentedmsg_likes;  //sub 1 from the total value of likes
      this.totallikes = count.commentedmsg_likes; //after subtracting one we send it to the total likes variable for message table likes update

      //to ensure totallikes doesnt move to -ve
      if (this.totallikes < 0) {
        this.totallikes = 0
      }
      this.unlikemessage();
      this.deletelikenotification()// delete from notification so that the person's whose message has been unliked is not made aware 
      this.updatetotallikes(); //update the total likes of the message in the database and in the messages table as well
      this.likeORunlikeoriginalmsgwithsameid();  //update any original message in the home messages with the same id as the unliked message id of the commented message
    }
  }



  //inserting pinned message into pinnedmessages table
  insertpinnedmessage() {
    let body = {
      pinneruseridDB: this.mymodulevariables.globaluserid,
      pinnedmessageidDB: this.messageidforDB,
      mydbfunc: 'pinmessage'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      //now refresh the pinned messsages table again to update changes
      this.pinnedmsgids = [];
      this.loadpinnedmessages();
      // console.log(this.pinnedmsgids);
    });
  }

  //removing pinned message from pinnedmessages table
  removepinnedmessage() {
    let body = { //we are unpinning from pinnedmessages table where the pinner's user_id =.. and the pinnedmessage's id =..
      pinneruseridDB: this.mymodulevariables.globaluserid,
      pinnedmessageidDB: this.messageidforDB,
      mydbfunc: 'unpinmessage'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      //now refresh the pinned messsages table again to update changes
      this.pinnedmsgids = [];
      this.loadpinnedmessages();
      // console.log(this.pinnedmsgids);
    });
  }


  //inserting liked message id into likedmessages table
  likemessage() {
    let body = {
      likeruseridDB: this.mymodulevariables.globaluserid,
      likedmessageidDB: this.messageidforDB,
      mydbfunc: 'likemessage'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //insert into notifications table the logged in user id, the id of the message he has likked and the id of the owner of that messsage
  sendlikenotification() {
    let body = {
      senderidDB: this.mymodulevariables.globaluserid, //logged in user's id
      receiveridDB: this.receiveridforDB, //the id of the person who's message we are liking
      receivermsgidDB: this.messageidforDB, //the id of the messaeg we are liking  
      mydbfunc: 'sendlikenotification'
    }

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }


  //removing liked message from likedmessages table
  unlikemessage() {
    let body = { //we are unliking from likedmessages table where the liker's user_id =.. and the likedmessage's id =..
      likeruseridDB: this.mymodulevariables.globaluserid,
      likedmessageidDB: this.messageidforDB,
      mydbfunc: 'unlikemessage'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }


  //insert into notifications table the logged in user id, the id of the message he has likked and the id of the owner of that messsage
  deletelikenotification() {
    let body = {
      senderidDB: this.mymodulevariables.globaluserid, //logged in user's id
      receiveridDB: this.receiveridforDB, //the id of the person who's message we are liking
      receivermsgidDB: this.messageidforDB, //the id of the messaeg we are liking  
      mydbfunc: 'deletelikenotification'
    }

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //updating the total likes the message has gotten in the messages table
  updatetotallikes() { //update messages, set likes = 'messagelikesDB' where message_id='messageidDB'
    let body = {
      messageidDB: this.messageidforDB,
      messagelikesDB: this.totallikes,
      mydbfunc: 'updatetotallikes'
    }
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      //now refresh the likes table again to update changes
      this.likedmsgids = [];
      this.loadlikedmessages();
      // console.log(this.likedmsgids);
    });
  }


  //when we like or unlike a message we have to let any commented message of the same id to also be automatically liked or unliked
  //we compare the overall table messages with itself again to match any message id with a commented message id..then we assign the like color of the original message
  //to the like color of the commented message
  likeORunlikecommentedmsgwithsameid() {
    for (var overallmessagesloopA = 0; overallmessagesloopA < this.messagetablerows.length; overallmessagesloopA++) { //loop through the messages table picking out the id of the original message
      for (var overallmessagesloopB = 0; overallmessagesloopB < this.messagetablerows.length; overallmessagesloopB++) { //loop through the messaegs table picking out the id of the commented message
        if (this.messagetablerows[overallmessagesloopA].message_id_fetched == this.messagetablerows[overallmessagesloopB].commentedmsg_id) {  //if a match is found
          this.messagetablerows[overallmessagesloopB].commentedmsg_likecolor = this.messagetablerows[overallmessagesloopA].likecolor; //assign like color  of original message to like color of commented message
          this.messagetablerows[overallmessagesloopB].commentedmsg_likes = this.messagetablerows[overallmessagesloopA].likes_fetched; //we want to automatically update the new total likes in the commented msg using the total likes in the original message
        }
      }
    }
  }



  //when we like or unlike a commented message we have to let any original or actual message of the same id to also be automatically liked or unliked
  //we compare the overall table messages with itself again to match any message id with a commented message id..then we assign the like color of the commented message
  //to the like color of the original message
  likeORunlikeoriginalmsgwithsameid() {
    for (var overallmessagesloopB = 0; overallmessagesloopB < this.messagetablerows.length; overallmessagesloopB++) { //loop through the messages table picking out the id of the commented message
      for (var overallmessagesloopA = 0; overallmessagesloopA < this.messagetablerows.length; overallmessagesloopA++) { // loop through the messages table picking out the id of the origianl message
        if (this.messagetablerows[overallmessagesloopB].commentedmsg_id == this.messagetablerows[overallmessagesloopA].message_id_fetched) {  //if a match is found
          this.messagetablerows[overallmessagesloopA].likecolor = this.messagetablerows[overallmessagesloopB].commentedmsg_likecolor; //assingn like color of the commented message to the like color of the actual message
          this.messagetablerows[overallmessagesloopA].likes_fetched = this.messagetablerows[overallmessagesloopB].commentedmsg_likes; //we want to automatically update the new total likes in the commented msg using the total likes in the original message
        }
      }
    }
  }


  //when we pin or unpin a message we have to let any commented message of the same id to also be automatically pinned or unpinned
  //we compare the overall table messages with itself again to match any message id with a commented message id..then we assign the pin color of the original message
  //to the pin color of the commented message
  pinORunpincommentedmsgwithsameid() {
    for (var overallmessagesloopA = 0; overallmessagesloopA < this.messagetablerows.length; overallmessagesloopA++) { //loop through the messages table picking out the id of the original message
      for (var overallmessagesloopB = 0; overallmessagesloopB < this.messagetablerows.length; overallmessagesloopB++) { //loop through the messages table picking out the id of the commented message
        if (this.messagetablerows[overallmessagesloopA].message_id_fetched == this.messagetablerows[overallmessagesloopB].commentedmsg_id) {  //if a match is found
          this.messagetablerows[overallmessagesloopB].commentedmsg_pincolor = this.messagetablerows[overallmessagesloopA].pincolor; //assign pincolor of original message to pincolor of commented message
        }
      }
    }
  }


  //when we pin or unpin a commented message we have to let any original message of the same id to also be automatically pinned or unpinned
  //we compare the overall table messages with itself again to match any commentedmsg id with the actual message id..then we assign the pin color of the commented message
  //to the pin color of the actual message
  pinORunpinoriginalmsgwithsameidcard3() {
    for (var overallmessagesloopB = 0; overallmessagesloopB < this.messagetablerows.length; overallmessagesloopB++) { //loop through the messages table picking out the id of the commented message
      for (var overallmessagesloopA = 0; overallmessagesloopA < this.messagetablerows.length; overallmessagesloopA++) {  //loop through the messages table picking out the id of the original message
        if (this.messagetablerows[overallmessagesloopB].commentedmsg_id == this.messagetablerows[overallmessagesloopA].message_id_fetched) { //if a match is found
          this.messagetablerows[overallmessagesloopA].pincolor = this.messagetablerows[overallmessagesloopB].commentedmsg_pincolor; //assign pincolor of commented message to pincolor of actual message
        }
      }
    }
  }


  //open a selected user's profile
  openuserprofile(count) {
    // console.log("selected user's id", count.user_id_fetched)

    //if selected user is ourself then we open our own profile tab
    if (count.user_id_fetched == this.mymodulevariables.globaluserid) {
      // console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else {
      localStorage.setItem('storeduserid', count.user_id_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }

  //open a selected user's profile in a commented message
  openuserprofilecommentedmsg(count) {
    // console.log("selected user's id", count.commentedmsg_userid)

    //if selected user is ourself then we open our own profile tab
    if (count.commentedmsg_userid == this.mymodulevariables.globaluserid) {
      // console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else {
      localStorage.setItem('storeduserid', count.commentedmsg_userid);
      this.navCtrl.push('Profile2Page');
    }
  }


  //post message
  postmessage() {
    this.navCtrl.push('PostmessagemodalPage');
  }

  //search people
  searchpeople() {
    this.navCtrl.push('SearchPage');
  }

  //view selected message image in full
  viewimage(count) {
    this.photoViewer.show(this.server + count.message_media_fetched, count.message_fetched);
    // console.log("with server", this.server + count.message_media_fetched);
  }

  //view selected message image in full - for commented message
  viewimage2(count) {
    this.photoViewer.show(this.server + count.commentedmsg_messagemedia, count.commentedmsg_message);
    // console.log("with server", this.server + count.commentedmsg_messagemedia);
  }

  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    //console.log('Refresh started');
    //console.log('logged in user id: ', this.mymodulevariables.globaluserid);
    // this.pinnedmsgids = []; //clear all messages in the pinnedmessages array
    // this.loadpinnedmessages();  //load new pinned messages into pinned messages array
    // this.likedmsgids = []; // clear all the messages in the likedtable array
    // this.loadlikedmessages(); //load newly liked messages into the liked messages array
    // this.commentmsgids = []; //clear all messages in the comment messages array
    // this.loadcommentmessages(); //load newly commented messages and comments messages in the commentararay

    setTimeout(() => {
      //operation to perform when refresh has completed
      // this.messagetablerows = [];  //clear all messaegs in the messages array
      // this.loadallmessages();
      //console.log('Refresh complete');
      // this.virtualloadallmessages()   
      this.loadpagedata()
      event.complete();
    }, 500); //duration of refresh
  }


  //infinite scroll
  loadData(event) {

    console.log("scroll started")

    setTimeout(() => {

      this.virtualloadallmessages();
      // console.log('scroll ended');

      /**after the user has scrolled it means he has seen the new messages hence we set the badge icon in the home 
       * tab to null so that it disappears
       */
      this.mymodulevariables.globalsendnewmessagealert = null;

      event.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      event.disabled = true;
    }, 500);
  }


  //toast for validation
  Toastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  //internet connection error
  connectionerrorAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Unable to load messages, check internet connection',
      buttons: ['OK']
    });
    alert.present();
  }


}
