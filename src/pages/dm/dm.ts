import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController, ModalController, Tabs } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-dm',
  templateUrl: 'dm.html',
})
export class DmPage {
  userdmmessagestablerows: any = []; //this will store the logged in user's dm chats 
  udmjsonconvertedrows: any = [];

  /**this table also stores the dm chats of the loggedinuser but rather keeps refreshing
   * so that when there are new dm chats it alerts the original userdmmessagetable rows to reload again
   * to reflect changes in the html page
   */
  virtualuserdmmessagestablerows: any = [];
  virtualudmjsonconvertedrows: any = [];

  permissionstatus: any; //this will be sent to the db when a user accepts or declines a new chat

  userdmmessagestablerows2: any = []; //this will store logged in user's dm chats with only the profile pic and name of the second user the logged in user is chatting with

  //this will keep track of the number of dm messages and assign it to the header
  dmcount: number = 0;

  private timeoutId: number; //auto refresh 1

  server: string; /******************************a */


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    private photoViewer: PhotoViewer,
    public mymodulevariables: ModulevariablesProvider) {
    this.server = postPvdr.server; /*********************b */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DmPage');
  }

  ionViewWillEnter() {
    console.log("damn")
    this.loaduserdmmessages();
  }

  ionViewDidEnter() {
    this.startAutoRefresh();  //auto refresh 2 
  }

  private startAutoRefresh() {  //auto refresh 3
    this.refreshcode();
    this.timeoutId = setInterval(() => this.refreshcode(), 1 * 1000); //auto refresh after 5 seconds
  }

  private refreshcode() { //auto refresh 4
    /**this loads thethe dm chats of the loggedinuser but rather keeps refreshing
    * so that when there are new dm chats it alerts the original userdmmessagetable rows to reload again
    * to reflect changes in the html page
    * if after loading from the db, the user has a new dm chat then it calls the 'loaduserdmmessages' function in the ts file to reload the new
    * dm chat list of the loggedinuser into the html
    * if after autoloading from the db , the user has no new chat list then we do othing
    */


    //asynchronous data load function
    //we delayeed the loading else it will repeat the data in the dm table
    setTimeout(() => {
      this.loadvirtualuserdmmessages();
    }, 20000);


  }

  private stopRefresh() { //auto refresh 5
    clearInterval(this.timeoutId);
  }

  ionViewDidLeave() { //auto refresh 6
    this.stopRefresh();
  }


  //load user's dm chats
  loaduserdmmessages() {
    this.udmjsonconvertedrows = [];
    this.userdmmessagestablerows = [];
    this.userdmmessagestablerows2 = [];
    this.dmcount = 0;

    let body = {
      mydbfunc: 'displayuserdmchats',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.udmjsonconvertedrows = JSON.parse(data);

      for (let count of this.udmjsonconvertedrows) {
        this.userdmmessagestablerows.push(count);
        this.dmcount = this.dmcount + 1 // keep track of the number of number of dm chats
      }

      console.log("user's dm chats:", this.userdmmessagestablerows)

      /** the above table userdmmessagetablerows contains the info we need 
       * however it contains the username and profile pic of the logged in user and the second user
       * we need to filter out and get only the second user's details to use in the html
       * so that it displays the users we are chatting with's info along with the last message and message time
      */
      for (var count = 0; count < this.userdmmessagestablerows.length; count++) {
        if (this.userdmmessagestablerows[count].user1_id_fetched != this.mymodulevariables.globaluserid) {
          //if the id of user1 is not logged in user then it means its the id of the second user so we save his details along with message info into new table
          this.userdmmessagestablerows2.push({
            dmreceipient_id: this.userdmmessagestablerows[count].user1_id_fetched,
            dmreceipient_username: this.userdmmessagestablerows[count].user1_username_fetched,
            dmreceipient_profilepic: this.userdmmessagestablerows[count].user1_profilepic_fetched,
            row_id_fetched: this.userdmmessagestablerows[count].row_id_fetched,
            lastmsg_id_fetched: this.userdmmessagestablerows[count].lastmsg_id_fetched,
            lastmsg_fetched: this.userdmmessagestablerows[count].lastmsg_fetched,
            lastmsg_time_fetched: this.userdmmessagestablerows[count].lastmsg_time_fetched,
            permission_status_fetched: this.userdmmessagestablerows[count].permission_status_fetched
          })
        }

        else if (this.userdmmessagestablerows[count].user2_id_fetched != this.mymodulevariables.globaluserid) {
          //if the id of user2 is not logged in user then it means its the id of the second user so we save his details along with message info into new table
          this.userdmmessagestablerows2.push({
            dmreceipient_id: this.userdmmessagestablerows[count].user2_id_fetched,
            dmreceipient_username: this.userdmmessagestablerows[count].user2_username_fetched,
            dmreceipient_profilepic: this.userdmmessagestablerows[count].user2_profilepic_fetched,
            row_id_fetched: this.userdmmessagestablerows[count].row_id_fetched,
            lastmsg_id_fetched: this.userdmmessagestablerows[count].lastmsg_id_fetched,
            lastmsg_fetched: this.userdmmessagestablerows[count].lastmsg_fetched,
            lastmsg_time_fetched: this.userdmmessagestablerows[count].lastmsg_time_fetched,
            permission_status_fetched: this.userdmmessagestablerows[count].permission_status_fetched
          })
        }
      }

      /**for our new table we assign default profile pics to those who dont have profile pics */
      for (var key in this.userdmmessagestablerows2) {
        if ((this.userdmmessagestablerows2[key].dmreceipient_profilepic) == null) {
          this.userdmmessagestablerows2[key].dmreceipient_profilepic = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }

      /**for our new table we assign "image" as the last message sent if it was really an image sent */
      for (var key in this.userdmmessagestablerows2) {
        if ((this.userdmmessagestablerows2[key].lastmsg_fetched) == "") {
          this.userdmmessagestablerows2[key].lastmsg_fetched = "image";
        }
      }

      /**man! we're not putting any permissions on any chats */
      for (var key in this.userdmmessagestablerows2) {
        this.userdmmessagestablerows2[key].permission_status_fetched = "accept";
      }



      console.log("final dm chat table:", this.userdmmessagestablerows2)

      //sort the dm chat list based on the lastmsg_id
      this.userdmmessagestablerows2.sort((b, a) => a.lastmsg_id_fetched - b.lastmsg_id_fetched)
    });

  }


  /**this loads thethe dm chats of the loggedinuser but rather keeps refreshing
    * so that when there are new dm chats it alerts the original userdmmessagetable rows to reload again
    * to reflect changes in the html page
    * if after loading from the db, the user has a new dm chat then it calls the 'loaduserdmmessages' function in the ts file to reload the new
    * dm chat list of the loggedinuser into the html
    * if after autoloading from the db , the user has no new chat list then we do othing
    */
  loadvirtualuserdmmessages() {
    this.virtualudmjsonconvertedrows = [];
    this.virtualuserdmmessagestablerows = [];

    let body = {
      mydbfunc: 'displayuserdmchats',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.virtualudmjsonconvertedrows = JSON.parse(data);

      for (let count of this.virtualudmjsonconvertedrows) {
        this.virtualuserdmmessagestablerows.push(count);
      }

      console.log("user's virtual dm chats:", this.virtualuserdmmessagestablerows)

      /**now we compare the virtual table witht the original one if there's a new dm chat for the logged in user
       * and the original table doesnt have it then we reload the userdmmessages function to reload the chat list
       * into the html
       * if thers' no changes betwen the 2 tables then we do nothing
       */
      for (var count of this.virtualuserdmmessagestablerows) { //loop through the virtual table whihc has the fresh data

        //if theres a new chat from a new user
        var index = this.userdmmessagestablerows.findIndex(x => x.row_id_fetched == count.row_id_fetched) //go to the original userdmmessgetable and compare the msg ids with the virtual table's msg ids

        //if theres a new message from a user in the chats we want to see that too
        var index2 = this.userdmmessagestablerows.findIndex(x => x.lastmsg_id_fetched == count.lastmsg_id_fetched) //go to the original userdmmessgetable and compare the msg ids with the virtual table's msg ids

        if ((index === -1)) { //if the id in virtual table wasnt found in the original dmmessagetable
          this.userdmmessagestablerows2 = [];
          this.refreshpage();
        }

        if ((index2 === -1)) {
          this.userdmmessagestablerows2 = [];
          this.refreshpage();
        }

        else {//if the message id is present already
          //do nothing
        }
      }

    });
  };


  //open dm chat for a particular user
  opendmchat(count) {
    console.log(count.dmreceipient_id)

    /**we send the id of the user whose chat we've selected to the dm chat page
     * to load messages between that user and the logged in user
     */

    localStorage.setItem('storeddmreceipientid', count.dmreceipient_id);
    this.navCtrl.push('DmcontactmessagesPage');
  }

  //refresh page
  refreshpage() {
    this.userdmmessagestablerows = [];
    this.userdmmessagestablerows2 = [];

    setTimeout(() => {
      this.userdmmessagestablerows2 = [];
      this.loaduserdmmessages();
    }, 100);
  }

  //accept chat
  acceptchat(count) {
    this.permissionstatus = "accept"

    //update chat permission status
    let body = {
      mydbfunc: 'updateuserdmchatpermissionstatus',
      loggedinuseridDB: this.mymodulevariables.globaluserid,
      receipientuseridDB: count.dmreceipient_id,
      permissionstatusDB: this.permissionstatus
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //open chat after updating
      this.opendmchat(count);
    });
  }


  //decline chat
  rejectchat(count) {
    this.permissionstatus = "rejected"

    //update chat permission status
    let body = {
      mydbfunc: 'updateuserdmchatpermissionstatus',
      loggedinuseridDB: this.mymodulevariables.globaluserid,
      receipientuseridDB: count.dmreceipient_id,
      permissionstatusDB: this.permissionstatus
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //reload dm chat list page to remove it from the page
      this.loaduserdmmessages();
    });
  }


  //view selected profile pic in full
  viewprofileimage(count) {
    this.photoViewer.show(this.server + count.dmreceipient_profilepic);
    console.log("image", this.server + count.dmreceipient_profilepic);
  }

  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.udmjsonconvertedrows = [];
    this.userdmmessagestablerows = [];
    this.userdmmessagestablerows2 = [];
    this.virtualudmjsonconvertedrows = [];
    this.virtualuserdmmessagestablerows = [];
    this.dmcount = 0;

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.loaduserdmmessages();
      event.complete();
    }, 500); //duration of refresh 
  }

}
