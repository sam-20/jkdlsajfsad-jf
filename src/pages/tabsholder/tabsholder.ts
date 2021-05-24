import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables';
import { PostProvider } from '../../providers/post-provider';
import { LocalNotifications } from '@ionic-native/local-notifications';


@IonicPage()
@Component({
  selector: 'page-tabsholder',
  templateUrl: 'tabsholder.html',
})
export class TabsholderPage {

  //navigate to the tab pages
  tab1 = 'ProfilePage';
  tab2 = 'DmPage';
  tab3 = 'HomePage';
  tab4 = 'SearchPage';
  tab5 = 'NotificationsPage';
  tab6 ='MygroupsPage';

  private timeoutId: number; //auto refresh 1

  unreadnotificationsjsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  unreadnotificationsmessagetablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  server: string; /******************************a */

  trackalertednotificationids: any = []; //this stores ids of notifications which have been alerted so that when the notifications refresh we dont need to alert the ids again

  //for notification alerts 
  notificationheading: any;
  notificationmessage: any;
  notificationid: any;

  //this will store the number of unread notifciations for the notfications tab badge
  unreadnotifications: number = 0;

  //this will tell the home tab icon badge to diplay the dot or not
  /**the home tab icon uses a badge icon which we have designed for it to look like a dot
   * if new messages are reloaded we assign a value to it from the globalsendnewmessagealert module variable
   */
  newmessagescount : number ; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mymodulevariables: ModulevariablesProvider,
    private localNoti: LocalNotifications, private platform: Platform,
    private postPvdr: PostProvider) {
    this.server = postPvdr.server; /*********************b */
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TabsholderPage');
  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter MenuholderPage');
  }

  ionViewDidEnter() {
    this.startAutoRefresh();  //auto refresh 2 
  }


  private startAutoRefresh() {  //auto refresh 3
    this.refreshcode();
    this.refreshnewmessagesbadge();
    this.timeoutId = setInterval(() => this.refreshcode(), 5 * 1000); //auto refresh after 5 seconds
    this.timeoutId = setInterval(() => this.refreshnewmessagesbadge(), 1 * 1000); //auto refresh after 5 seconds
  }

  private refreshnewmessagesbadge(){
    this.newmessagescount = this.mymodulevariables.globalsendnewmessagealert;
  }


  private refreshcode() { //auto refresh 4
    //we always want to load newly updated notifications messages after a period of time
    this.loadunreadnotificationmessages();
  }


  //load unreadnotification messages
  loadunreadnotificationmessages() {

    //first empty the notifications messages
    this.unreadnotificationsjsonconvertedrows = [];
    this.unreadnotificationsmessagetablerows = [];

    let body = {
      mydbfunc: 'displayunreadusernotificationmessages',
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
      this.unreadnotificationsjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.unreadnotificationsjsonconvertedrows) {
        this.unreadnotificationsmessagetablerows.push(count);
      }


      /**now we have have the unreadnotificationmessages in the unreadnotificationmessagetablerows array so we are 
         we are going to check if a user has commented his own message..we dont want that to show that in the notifications alert **/
      for (var key in this.unreadnotificationsmessagetablerows) {
        if ((this.unreadnotificationsmessagetablerows[key].senderID_fetched) == this.mymodulevariables.globaluserid) {
          this.unreadnotificationsmessagetablerows[key].notmsg_type_fetched = "own comment";
        }
      }


      /**unread notifications table contains all the notifications message from the database which the user hasnt read
       * trackalertedids is going to contain the info of notification msg ids whihc havent been read and since we'd alert the ids in this table to the user 
       * we'd add a property called alertstatus to it. by default the alert status of each id will be "unalerted"
       * we dont want to insert the same ids into trackedalertedids when the code refereshes again else it will alert the same ids over and over again
       * so before we transfer an unread notification to the trackedalertedids we try to find in the trackedaletedids if the unreadnotifcaitonmessage id exisits in it already
       * if the id exists in trackedalertedids we do nothhing
       * if it doesnt, we push all the data of that id into the trackedalertedids with the alert property status of "unalerted"
       * then we loop through the trackedids and for each loop we check if the alert status is "unalerted" then we alert it before finallly changing the status to "alerted"
       * so that upon refresh the code doesnt alert that id inside the alertedterackedids again since the code will search for ids whose status are "unalerted" and the previous not id was changed to "alerted"
       */
      this.unreadnotificationsmessagetablerows.forEach(function (element) { element.alertstatus = "unalerted"; }); //take note we rather add it to unreadnotifications table so that it pushes watever is in it including alert status into trackedids by default


      for (var count of this.unreadnotificationsmessagetablerows) {  //looping through the unreadnotificationmessages table
        var index = this.trackalertednotificationids.findIndex(x => x.notmsg_id_fetched == count.notmsg_id_fetched) //search inside trackedalertedids if we'd find the notmsgid of unreadnotmessages table of that loop

        if (index === -1) //if the id of unreadntoificaationsmessagetable at that particular loop wasnt found in trackedalertedidstable
        {
          this.trackalertednotificationids.push(count); //push the details of that id into trackedalertedids table
        }

        else { //if the id is present
          //do nothing
        }
      }

      //if there are no notifications we dont want to  display any value in the tab badge
      if (this.unreadnotifications == 0) {
        this.unreadnotifications = null;
      }

      /**now looping through trackedalertedids to search if any notid has alert stautus of "unalerted" then we alert it and change the alert status to "alerted" */
      for (var count2 = 0; count2 < this.trackalertednotificationids.length; count2++) {

        if (this.trackalertednotificationids[count2].alertstatus == "unalerted") {     //now check if alert status is "unalerted" then we alert it  

          //before we alert it we have to know the type of notmsg and assign the right alert message
          switch (this.trackalertednotificationids[count2].notmsg_type_fetched) { //we switch alert message types based on the notmsg_type of the notificaion message
            case "follow":    //if the notmsg_type is a follow
              {
                this.notificationheading = 'CamFila';
                this.notificationmessage = this.trackalertednotificationids[count2].senderUsername_fetched + ' followed you';
                this.notificationid = this.trackalertednotificationids[count2].notmsg_id_fetched;
                this.sendnotificationalert1(this.notificationheading, this.notificationmessage, this.notificationid);
                this.notificationheading = null;
                this.notificationmessage = null;
                this.notificationid = null;
                this.unreadnotifications = this.unreadnotifications + 1;  //send the number of ids to be alerted to the tab badge
                break;
              }

            case "like":  //if the notmsg_type is a like
              {
                this.notificationheading = 'CamFila';
                this.notificationmessage = this.trackalertednotificationids[count2].senderUsername_fetched + ' liked your message';
                this.notificationid = this.trackalertednotificationids[count2].notmsg_id_fetched;
                this.sendnotificationalert2(this.notificationheading, this.notificationmessage, this.notificationid);
                this.notificationheading = null;
                this.notificationmessage = null;
                this.notificationid = null;
                this.unreadnotifications = this.unreadnotifications + 1;  //send the number of ids to be alerted to the tab badge
                break;
              }

            case "comment": //if the notmsg_type is a comment
              {
                this.notificationheading = 'CamFila';
                this.notificationmessage = this.trackalertednotificationids[count2].senderUsername_fetched + ' commented your message';
                this.notificationid = this.trackalertednotificationids[count2].notmsg_id_fetched;
                this.sendnotificationalert3(this.notificationheading, this.notificationmessage, this.notificationid);
                this.notificationheading = null;
                this.notificationmessage = null;
                this.notificationid = null;
                this.unreadnotifications = this.unreadnotifications + 1;  //send the number of ids to be alerted to the tab badge
                break;
              }
          }

          /**after alerting it we can now change the alert status to "alerted" so that it dostn alert again */
          this.trackalertednotificationids[count2].alertstatus = "alerted";

        }

        //if alert status is already set to "alerted" we dont alert it again
        else {
          //do nothing
        }

      }

      console.log('unreadnotifications', this.unreadnotificationsmessagetablerows);
      console.log('trackedalertnotification ids', this.trackalertednotificationids);

      // console.log(this.unreadnotificationsmessagetablerows.length)
      // console.log(this.trackalertednotificationids.length)
      // console.log(this.unreadnotifications);
    });
  }


  //notification alert
  //for follow
  sendnotificationalert1(heading, message, notid) {
    this.platform.ready().then(() => {
      this.localNoti.schedule({
        id: notid,
        title: heading,
        text: message,
        icon: '/assets/imgs/5.jpg',
        //trigger: { at: new Date(new Date().getTime() + 2000) },
        led: 'FF0000'
      });
    });
  }

  //for like
  sendnotificationalert2(heading, message, notid) {
    this.platform.ready().then(() => {
      this.localNoti.schedule({
        id: notid,
        title: heading,
        text: message,
        icon: '/assets/imgs/5.jpg',
        //trigger: { at: new Date(new Date().getTime() + 2000) },
        led: 'FF0000'
      });
    });
  }

  //for comment
  sendnotificationalert3(heading, message, notid) {
    this.platform.ready().then(() => {
      this.localNoti.schedule({
        id: notid,
        title: heading,
        text: message,
        icon: '/assets/imgs/5.jpg',
        //trigger: { at: new Date(new Date().getTime() + 2000) },
        led: 'FF0000'
      });
    });
  }

  //clear notifiaction badge value when user selects the notification tab
  clearnotificationbadge() {
    this.unreadnotifications = null;
  }



}
