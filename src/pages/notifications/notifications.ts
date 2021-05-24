import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Tabs } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notificationsjsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  notificationsmessagetablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  //to store notifications without the ones sent by loggedin user
  notificationsmessagetablerows2: any = []; //this array will contain the final notifications excluding the ones sent by the logged in user

  server: string; /******************************a */

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localNoti: LocalNotifications, private platform: Platform,
    private photoViewer: PhotoViewer,
    private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
    private tabs: Tabs) {
    this.server = postPvdr.server; /*********************b */
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NotificationsPage');
  }

  //codes here are executed when the user selects the tab
  ionViewWillEnter() {
    this.loadpagedata(); //used for loading asynchronous data
  }

  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    //console.log('Refresh started');
    //console.log('logged in user id: ', this.mymodulevariables.globaluserid);
    this.notificationsmessagetablerows = []; //clear all notifications in the table
    this.notificationsmessagetablerows2 = []; //clear all notifications in our final notifications table

    setTimeout(() => {
      //finally output our messages 
      this.loadnotificationmessages(); //load notification messages
      //console.log('Refresh complete');

    }, 0); //duration of refresh
  }

  //load notification messages
  loadnotificationmessages() {

    let body = {
      mydbfunc: 'displayusernotificationmessages',
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
      this.notificationsjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.notificationsjsonconvertedrows) {
        this.notificationsmessagetablerows.push(count);
      }

      console.log(this.notificationsmessagetablerows);


      /**when the user opens the notification page it means he's seen the messages there now..we want to update the read_status of those notifications in the page
    * so that our local notifications plugin will only display notifications which have their read_status set to "unread"
     */
      for (var key in this.notificationsmessagetablerows) {

        //for follow notifications
        if ((this.notificationsmessagetablerows[key].notmsg_type_fetched == "follow") && (this.notificationsmessagetablerows[key].read_status_fetched == "unread")) {
          //now we are updating by setting read_status to "read" where msg type= follow and the sender and receiver id are given
          let body = {
            mydbfunc: 'updatefollowreadstatus',
            senderidDB: this.notificationsmessagetablerows[key].senderID_fetched,
            receiveridDB: this.mymodulevariables.globaluserid
          };

          //post data to api
          this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
          });
        }


        //for like notification
        if ((this.notificationsmessagetablerows[key].notmsg_type_fetched == "like") && (this.notificationsmessagetablerows[key].read_status_fetched == "unread")) {
          //now we are updating by setting read_status to "read" where msg type= like and the sender and receiver id are given, as well as the liked message of the receiver
          let body = {
            mydbfunc: 'updatelikereadstatus',
            senderidDB: this.notificationsmessagetablerows[key].senderID_fetched,
            receiveridDB: this.mymodulevariables.globaluserid,
            receivermsgidDB: this.notificationsmessagetablerows[key].receiverMessageID_fetched
          };

          //post data to api
          this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
          });
        }


        //comment notification
        if ((this.notificationsmessagetablerows[key].notmsg_type_fetched == "comment") && (this.notificationsmessagetablerows[key].read_status_fetched == "unread")) {
          //now we are updating by setting read_status to "read" where msg type= cooment and the sender and receiver id are given, as well as the message of the receiver and the comment msg of the sender
          let body = {
            mydbfunc: 'updatecommentreadstatus',
            senderidDB: this.notificationsmessagetablerows[key].senderID_fetched,
            sendermsgidDB: this.notificationsmessagetablerows[key].senderMessageID_fetched,
            receiveridDB: this.mymodulevariables.globaluserid,
            receivermsgidDB: this.notificationsmessagetablerows[key].receiverMessageID_fetched,
          };

          //post data to api
          this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
          });
        }
      }


      /**now we have have the notification messages in the notificationmessagetablerows array so we are 
     we are going to check if a sender's profile pic is null then we assign our pic to the sender **/
      for (var key in this.notificationsmessagetablerows) {
        if ((this.notificationsmessagetablerows[key].senderProfilepic_fetched) == null) {
          this.notificationsmessagetablerows[key].senderProfilepic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**now we have have the notificationmessages in the notificationmessagetablerows array so we are 
     we are going to check if a receiver's profile pic is null then we assign our pic to the user **/
      for (var key in this.notificationsmessagetablerows) {
        if ((this.notificationsmessagetablerows[key].receiverProfilepic_fetched) == null) {
          this.notificationsmessagetablerows[key].receiverProfilepic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**now we have have the notificationmessages in the notificationmessagetablerows array so we are 
      we are going to check if a user has commented his own message..we dont want that to show in the notifications page **/
      for (var key in this.notificationsmessagetablerows) {
        if ((this.notificationsmessagetablerows[key].senderID_fetched) == this.mymodulevariables.globaluserid) {
          this.notificationsmessagetablerows[key].notmsg_type_fetched = "sender is loggedinuser";
        }
      }


      /**we have our messages in the notificationessage table now and can display in the html
       * when we do that we realize that whenever a notification is "sender is loggedinuser", the html doesnt display that notification however it leaves that ion-item space in the html
       * so we need to push the items which are not sent by ourselves into a new array so that the html only displays notifications sent by others 
      */
      for (var count = 0; count < this.notificationsmessagetablerows.length; count++) {
        if (this.notificationsmessagetablerows[count].notmsg_type_fetched == "sender is loggedinuser") {
          //do nothing
        }

        //push into our new table
        else {
          //this.notificationsmessagetablerows2.push({newid: this.notificationsmessagetablerows[count].notmsg_type_fetched})
          this.notificationsmessagetablerows2.push({
            date_created_fetched: this.notificationsmessagetablerows[count].date_created_fetched,
            notmsg_id_fetched: this.notificationsmessagetablerows[count].notmsg_id_fetched,
            notmsg_type_fetched: this.notificationsmessagetablerows[count].notmsg_type_fetched,
            read_status_fetched: this.notificationsmessagetablerows[count].read_status_fetched,
            receiverID_fetched: this.notificationsmessagetablerows[count].receiverID_fetched,
            receiverMessageID_fetched: this.notificationsmessagetablerows[count].receiverMessageID_fetched,
            receiverMessage_fetched: this.notificationsmessagetablerows[count].receiverMessage_fetched,
            receiverMessagecomments_fetched: this.notificationsmessagetablerows[count].receiverMessagecomments_fetched,
            receiverMessagedate_fetched: this.notificationsmessagetablerows[count].receiverMessagedate_fetched,
            receiverMessagelikes_fetched: this.notificationsmessagetablerows[count].receiverMessagelikes_fetched,
            receiverMessagemedia_fetched: this.notificationsmessagetablerows[count].receiverMessagemedia_fetched,
            receiverProfilepic_fetched: this.notificationsmessagetablerows[count].receiverProfilepic_fetched,
            receiverUsername_fetched: this.notificationsmessagetablerows[count].receiverUsername_fetched,
            senderID_fetched: this.notificationsmessagetablerows[count].senderID_fetched,
            senderMessageID_fetched: this.notificationsmessagetablerows[count].senderMessageID_fetched,
            senderMessage_fetched: this.notificationsmessagetablerows[count].senderMessage_fetched,
            senderMessagecomments_fetched: this.notificationsmessagetablerows[count].senderMessagecomments_fetched,
            senderMessagedate_fetched: this.notificationsmessagetablerows[count].senderMessagedate_fetched,
            senderMessagelikes_fetched: this.notificationsmessagetablerows[count].senderMessagelikes_fetched,
            senderMessagemedia_fetched: this.notificationsmessagetablerows[count].senderMessagemedia_fetched,
            senderProfilepic_fetched: this.notificationsmessagetablerows[count].senderProfilepic_fetched,
            senderUsername_fetched: this.notificationsmessagetablerows[count].senderUsername_fetched
          })
        }
      }
      //console.log("not1", this.notificationsmessagetablerows);
      //console.log("not2",this.notificationsmessagetablerows2);

    });
  }


  //notification alert
  notificationalert() {
    this.platform.ready().then(() => {
      this.localNoti.schedule({
        title: 'friend',
        text: 'Samuel followed you',
        icon: '/assets/imgs/5.jpg',
        trigger: { at: new Date(new Date().getTime() + 2000) },
        led: 'FF0000'
      });
    });
  }


  //open a selected user's profile
  openuserprofile(count) {
    console.log("selected user's id", count.senderID_fetched)

    //if selected user is ourself then we open our own profile tab
    if (count.senderID_fetched == this.mymodulevariables.globaluserid) {
      console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else {
      localStorage.setItem('storeduserid', count.senderID_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }


  //open own profile
  openownprofile() {
      console.log("open profile tab page")
      this.tabs.select(0);
  }

  //view selected message image in full
  viewimage(count){
    this.photoViewer.show(this.server+count.receiverMessagemedia_fetched, count.receiverMessage_fetched);
    console.log("with server", this.server+count.receiverMessagemedia_fetched);
  }

   //view selected message image in full for comment image
   viewimage2(count){
    this.photoViewer.show(this.server+count.senderMessagemedia_fetched, count.senderMessage_fetched);
    console.log("with server", this.server+count.senderMessagemedia_fetched);
  }

  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    console.log("Refresh started");

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.loadpagedata() //load all notifications
      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh
  }

}
