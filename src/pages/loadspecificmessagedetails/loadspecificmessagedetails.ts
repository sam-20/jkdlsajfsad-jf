import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Tabs } from 'ionic-angular';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PostProvider } from '../../providers/post-provider';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-loadspecificmessagedetails',
  templateUrl: 'loadspecificmessagedetails.html',
})
export class LoadspecificmessagedetailsPage {

  commentedmessagelikecolor: any //stores the like color of the message which we are viewing its comments...was obtained from the previous page
  commentedmessagepincolor: any; //stores the pincolor of the message which we are viewing its comments...was obtained from the previous page
  commentedmessagecommentcolor: any // stores the comment color of the message which we are viewing its comments..was obtained from the previous page
  commentedmessageid: any; //this stores the id of the message whihc we are viewing its comments...was obtained from the previous page

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  commentedmessagetablerow: any = []; //this array will receive the rows from the from the converted jsonformat 

  specificmessagecommentstable: any = [];  //this array will store all comments related to the selected message
  specificmessagecommentsjsonconvertedrows: any[]; //this array will collect data from the db and convert into usuable formate


  /**this table will store the msg_id of messages that the logged in user has liked in the likedmessages table..
   * it will be run accross all the messages in the comments messages table
   * if a msg_id in comment messages table matches with a msg_id in likedmessages table it means the message has been liked 
   * hence we will set the default color for the like icon to show that the comment message has been liked already */
  likedmsgids: any = [];
  likedmsgsidsjsonconvertedrows: any[];


  /**this table will store the msg_id of messages that the logged in user has pinned in the pinnedmessages table..
   * it will be run accross all the messages in the comments messages table
   * if a msg_id in comment messages table matches with a msg_id in pinnedmessages table it means the message has been pinned 
   * hence we will set the default color for the pin icon to show that the comment message has been pinned already */
  pinnedmsgids: any = [];
  pinnedmsgsidsjsonconvertedrows: any[];



  server: string; /******************************a */

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mymodulevariables: ModulevariablesProvider,
    private photoViewer: PhotoViewer,
    private postPvdr: PostProvider,
    public viewCtrl: ViewController,
    private tabs:Tabs) {
    //loading the id, pincolor and likecolor of the commented message from the previous page to allow us to retrieve its info from the db into this page
    this.commentedmessageid = JSON.parse(localStorage.getItem('storedmessageid'));
    this.commentedmessagepincolor = (localStorage.getItem('storedpincolor'));
    this.commentedmessagelikecolor = (localStorage.getItem('storedlikecolor'));
    this.commentedmessagecommentcolor = (localStorage.getItem('storedcommentcolor'));
    this.server = postPvdr.server; /*********************b */
  }


  //codes here are executed when the page loads
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadspecificmessagecommentsmodalPage');
    console.log('message id of the commented message: ', this.commentedmessageid)
    console.log('pincolor of the commented message: ', this.commentedmessagepincolor);
    console.log('like color of the commented message: ', this.commentedmessagelikecolor);
  }

  //codes here are executed when the user selects the page
  ionViewWillEnter() {
    this.loadpagedata();  //used for loading asynchronous data
  }

  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    console.log('Refresh started');
    console.log(this.mymodulevariables.globaluserid);
    this.pinnedmsgids = [];  //clear all messages in the pinned messages array
    this.loadpinnedmessages();// load pinned messages
    this.likedmsgids = []; //clear all messages in the liked messages array
    this.loadlikedmessages();//load liked messages

    setTimeout(() => {
      this.commentedmessagetablerow = [];  //clear all messaegs in the commented message array
      //finally output our messages  
      this.loadcommentedmessage();  //first load commented message
      this.specificmessagecommentstable = [];
      this.loadspecificmessagecomments(); //then load all messsages relating to specific message selected
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


  /**before we load our comments for the selected message we need to load our likes and pin messages to compare with
   * the comments messages and assign the various colors wherever needed**/

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
      console.log('pinned messages: ', this.pinnedmsgids);
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
      console.log(this.likedmsgids);
      console.log(this.likedmsgids.length)
    });
  }


  //load all comments of the selected message
  loadspecificmessagecomments() {
    let body = {
      commentedmessageidDB: this.commentedmessageid,
      mydbfunc: 'loadspecificmessagecomments'
    }

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      /***data inside the .subscribe contains our records 
      * but we cant use it in its original format 
      * so we convert into a usable format 
      * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.specificmessagecommentsjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
       * into our specific comment messages table row for use in the html**/
      for (let count of this.specificmessagecommentsjsonconvertedrows) {
        this.specificmessagecommentstable.push(count);
      }

      this.specificmessagecommentstable.forEach(function (element) { element.commentmsg_pincolor = "dark"; });
      this.specificmessagecommentstable.forEach(function (element) { element.commentmsg_likecolor = "dark"; });
      this.specificmessagecommentstable.forEach(function (element) { element.commentmsg_commentcolor = "dark"; });


      //lets look at the data in commented message table
      console.log(this.specificmessagecommentstable);
      console.log(this.specificmessagecommentstable.length);

      /**now we have have the messages in the specifimessagecomments table array so we are 
     we are going to check if a profile pic is null then we assign our pic to the user of the commented message **/
      for (var key in this.specificmessagecommentstable) {
        if ((this.specificmessagecommentstable[key].commenter_profile_pic_fetched) == null) {
          this.specificmessagecommentstable[key].commenter_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }

      //we compare the the user's liked messages with the comment messages to see if a comment mesage has been
      //liked then we assign the like color to the comment message
      for (var commentstableloop = 0; commentstableloop < this.specificmessagecommentstable.length; commentstableloop++) { //looping through the entire comments messages rows
        for (var likedmsgloop = 0; likedmsgloop < this.likedmsgids.length; likedmsgloop++) { // looping through the liked messages rows
          if (this.specificmessagecommentstable[commentstableloop].commentmsg_id_fetched == this.likedmsgids[likedmsgloop].message_id_fetched) {  //if a match is found
            this.specificmessagecommentstable[commentstableloop].commentmsg_likecolor = "danger" //assign a danger color to the likecolor property of that comment message's row
          }
        }
      }

      //we compare the the user's pinned messages with the comment messages to see if a comment mesage has been
      //pinned then we assign the pin color to the comment message
      for (var commentstableloop2 = 0; commentstableloop2 < this.specificmessagecommentstable.length; commentstableloop2++) { //looping through the entire comments messages rows
        for (var pinnedmsgloop = 0; pinnedmsgloop < this.pinnedmsgids.length; pinnedmsgloop++) { // looping through the pinned messages rows
          if (this.specificmessagecommentstable[commentstableloop2].commentmsg_id_fetched == this.pinnedmsgids[pinnedmsgloop].message_id_fetched) {  //if a match is found
            this.specificmessagecommentstable[commentstableloop2].commentmsg_pincolor = "primary" //assign a primary color to the pincolor property of that comment message's row
          }
        }
      }


      /** now for the comments of the commented message there's also comments value of those various comments..
       * if the value is greater than 0 we change the color to green to indicate it has comments
       */
      for (var key in this.specificmessagecommentstable) {
        if ((this.specificmessagecommentstable[key].commentmsg_comments_fetched) > 0) {
          this.specificmessagecommentstable[key].commentmsg_commentcolor = "secondary";
        }
      }

      console.log(this.specificmessagecommentstable);
    });
  }


  //comment the commented message
  commentmessage(count) {
    localStorage.setItem('storedmessageid', count.commented_message_id_fetched) //storing the message id in a local storage for the next page
    localStorage.setItem('storedpincolor', this.commentedmessagepincolor); //storing the pincolor of the message to be commented so that we use it in the next page
    localStorage.setItem('storedlikecolor', this.commentedmessagelikecolor); //storing the likecolor of the message to be commented so that we use it in the next page
    localStorage.setItem('storedcommentcolor', this.commentedmessagecommentcolor); //storing the commentcolor of the message to commented so that we use it in the next  page
    localStorage.setItem('commentedmessageowner', count.commentedmsg_sender_user_id_fetched); //we need the id of owner whose message is being commented in the next page because we want to create a notification for taht owner
    this.navCtrl.push('CommentmessagePage');
  }

  //load details of a selected comment message
  loadmessagedetails(count) {
    localStorage.setItem('storedmessageid', count.commentmsg_id_fetched) //storing the message id in a local storage for the next page
    localStorage.setItem('storedpincolor', count.commentmsg_pincolor); //storing the pincolor of the message to be commented so that we use it in the next page
    localStorage.setItem('storedlikecolor', count.commentmsg_likecolor); //storing the likecolor of the message to be commented so that we use it in the next page
    localStorage.setItem('storedcommentcolor', count.commentmsg_commentcolor); //storing the commentcolor of the message to commented so that we use it in the next  page
    this.navCtrl.push('LoadspecificmessagedetailsPage');
}


  //open a selected user's profile in commented msg
  openuserprofilecommentedmsg(count) {
    console.log("selected user's id", count.commentedmsg_sender_user_id_fetched)

    //if selected user is ourself then we open our own profile tab
    if (count.commentedmsg_sender_user_id_fetched == this.mymodulevariables.globaluserid){
      console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else{
      localStorage.setItem('storeduserid',count.commentedmsg_sender_user_id_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }


  //open a selected user's profile in comment msg
  openuserprofilecommentmsg(count) {
    console.log("selected user's id", count.commenter_userid_fetched)

    //if selected user is ourself then we open our own profile tab
    if (count.commenter_userid_fetched == this.mymodulevariables.globaluserid){
      console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else{
      localStorage.setItem('storeduserid',count.commenter_userid_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }


  //view highlighted message's image
  viewimmage1(count){
    this.photoViewer.show(this.server+count.commented_message_media_fetched, count.commented_message_fetched);
    console.log("with server", this.server+count.commented_message_media_fetched);
  }

  //view image in comment messages
  viewimage2(count){
    this.photoViewer.show(this.server+count.commentmsg_messagemedia_fetched, count.commentmsg_message_fetched);
    console.log("with server", this.server+count.commentmsg_messagemedia_fetched);
  }


  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.pinnedmsgids = [];  //clear all messages in the pinned messages array
    this.loadpinnedmessages();// load pinned messages
    this.likedmsgids = []; //clear all messages in the liked messages array
    this.loadlikedmessages();//load liked messages
    //console.log('Refresh started');

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.commentedmessagetablerow = [];  //clear all messaegs in the commented message array
      //finally output our messages  
      this.loadcommentedmessage();  //first load commented message
      this.specificmessagecommentstable = [];
      this.loadspecificmessagecomments(); //then load all messsages relating to specific message selected
      //console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh
  }
}
