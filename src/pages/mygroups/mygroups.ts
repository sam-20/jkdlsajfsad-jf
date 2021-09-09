import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PopoverController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-mygroups',
  templateUrl: 'mygroups.html',
})
export class MygroupsPage {
  usergroupchatlisttablerows: any = []; //this will store the logged in user's group chats
  usergroupchatlistjsonconvertedrows: any = [];

  virtualusergroupchatlisttablerows: any = [];
  virtualusergroupchatlistjsonconvertedrows: any = [];

  //this will keep track of the number of group chats and assign it to the header
  groupchatscount: any;

  /**this will store some details of the selected group when 
   * we want to exit that selected group's chat 
   * group_id for deleting the user from the group
   * membersjoined for updatng the members count of that group
   */
  selectedgroupchat_groupid: any;
  selectedgroupchat_membersjoined: any;

  server: string; /******************************a */

  private timeoutId: number; //auto refresh 1

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    private photoViewer: PhotoViewer,
    public mymodulevariables: ModulevariablesProvider) {
    this.server = postPvdr.server; /*********************b */
  }

  ionViewDidEnter() {
    this.startAutoRefresh();  //auto refresh 2 
  }

  private startAutoRefresh() {  //auto refresh 3
    this.refreshcode();
    this.timeoutId = setInterval(() => this.refreshcode(), 1 * 1000); //auto refresh after 5 seconds
  }

  private refreshcode() { //auto refresh 4

    //asynchronous data load function
    //we delayeed the loading else it will repeat the data in the group chat list table
    setTimeout(() => {
      this.loadvirtualusergroupchatlist();
    }, 10000);

  }

  private stopRefresh() { //auto refresh 5
    clearInterval(this.timeoutId);
  }

  ionViewDidLeave() { //auto refresh 6
    this.stopRefresh();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MygroupsPage');
  }

  ionViewWillEnter() {
    console.log("damn")
    this.loadusergroupchatlist();
  }

  //load user's group chats
  loadusergroupchatlist() {
    this.usergroupchatlistjsonconvertedrows = [];
    this.usergroupchatlisttablerows = [];
    this.groupchatscount = 0;

    let body = {
      mydbfunc: 'displayusergroupchats',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.usergroupchatlistjsonconvertedrows = JSON.parse(data);

      for (let count of this.usergroupchatlistjsonconvertedrows) {
        this.usergroupchatlisttablerows.push(count);
        this.groupchatscount = this.groupchatscount + 1 //keep track of the number of group chats
      }


      /**for our new table we assign default group profile pics to those who dont have profile pics */
      for (var key in this.usergroupchatlisttablerows) {
        if ((this.usergroupchatlisttablerows[key].group_profile_pic_fetched) == null) {
          this.usergroupchatlisttablerows[key].group_profile_pic_fetched = "defaultprofilepic/defaultgroupprofilepic.jpg";
        }
      }


      /**for our new table we assign "image" as the last message sent if it was really an image sent */
      for (var key in this.usergroupchatlisttablerows) {
        if ((this.usergroupchatlisttablerows[key].group_last_message_fetched) == "") {
          this.usergroupchatlisttablerows[key].group_last_message_fetched = "image";
        }
      }

      console.log("user's groupchats: ", this.usergroupchatlisttablerows);

      /**this will filter the temp object array
      *  and remove duplicates using object keys using the reduce method 
      * before finally assigning it to the  this.usergroupchatlisttablerows table
      * */
      this.usergroupchatlisttablerows = this.usergroupchatlisttablerows.reduce((unique, o) => {
        if (!unique.some(obj => obj.group_id_fetched === o.group_id_fetched)) {
          unique.push(o);
        }
        return unique;
      }, []);

      console.log("user's groupchats after removing duplicates: ", this.usergroupchatlisttablerows);

    });

  }


  loadvirtualusergroupchatlist() {
    this.virtualusergroupchatlistjsonconvertedrows = [];
    this.virtualusergroupchatlisttablerows = [];

    let body = {
      mydbfunc: 'displayusergroupchats',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.virtualusergroupchatlistjsonconvertedrows = JSON.parse(data);

      for (let count of this.virtualusergroupchatlistjsonconvertedrows) {
        this.virtualusergroupchatlisttablerows.push(count);
      }

      // console.log("user's virtual groupchats: ", this.virtualusergroupchatlisttablerows);



      /**for our new table we assign default group profile pics to those who dont have profile pics */
      for (var key in this.virtualusergroupchatlisttablerows) {
        if ((this.virtualusergroupchatlisttablerows[key].group_profile_pic_fetched) == null) {
          this.virtualusergroupchatlisttablerows[key].group_profile_pic_fetched = "defaultprofilepic/defaultgroupprofilepic.jpg";
        }
      }


      for (var count of this.virtualusergroupchatlisttablerows) { //loop through the virtual table whihc has the fresh data

        //if theres a new chat from a new user
        var index = this.usergroupchatlisttablerows.findIndex(x => x.group_lastmsg_id_fetched == count.group_lastmsg_id_fetched) //go to the original userdmmessgetable and compare the msg ids with the virtual table's msg ids

        if ((index === -1)) { //if the id in virtual table wasnt found in the original dmmessagetable
          this.usergroupchatlisttablerows = [];
          this.refreshpage();
        }

        else {//if the message id is present already
          //do nothing
        }
      }

    });
  }


  //refresh page
  refreshpage() {
    this.usergroupchatlisttablerows = [];

    setTimeout(() => {
      this.usergroupchatlisttablerows = [];
      this.loadusergroupchatlist();
    }, 5);
  }


  //view all groups
  viewallgroups() {
    this.navCtrl.push('ViewallgroupsPage')
  }


  //open group chat messages for a selected group
  opengroupchat(count) {
    console.log("selected group's id: ", count.group_id_fetched);

    /**we send the id of the group whose chat we've selected to the view group messages chat page
     * to load messages for that group
     */
    localStorage.setItem('storedgroupid', count.group_id_fetched);
    this.navCtrl.push('ViewspecificgroupchatPage');
  }


  //view selected profile pic in full
  viewprofileimage(count) {
    this.photoViewer.show(this.server + count.group_profile_pic_fetched);
    console.log("image", this.server + count.group_profile_pic_fetched);
  }



  /************************exit group functions ***********************/

  //show alert before exit
  showalert(count) {
    const confirm = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Are you sure you want to leave this group?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            //exit group function
            this.selectedgroupchat_groupid = count.group_id_fetched
            this.selectedgroupchat_membersjoined = count.members_joined_fetched
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
      group_joining_idDB: this.selectedgroupchat_groupid, //followed person's id 
      mydbfunc: 'exitgroup'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      //we then reload the page again
      this.loadusergroupchatlist();
    });
  }

  //update the number of members who are in the selected group
  updategroup_members_joined() {

    //sub one from the members joined since we are exiting the group
    this.selectedgroupchat_membersjoined--;

    let body = {
      group_idDB: this.selectedgroupchat_groupid, //followed person's id 
      members_joinedDB: this.selectedgroupchat_membersjoined,
      mydbfunc: 'updategroup_memberscount'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }


  /************************exit group functions ***********************/


  //show popover to either create new group or view all groups
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('MygroupspopovermenuPage');
    popover.present({
      ev: myEvent,
    });
  }


  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place


    setTimeout(() => {
      //operation to perform when refresh has completed
      this.usergroupchatlistjsonconvertedrows = [];
      this.usergroupchatlisttablerows = [];
      this.groupchatscount = 0;
      this.loadusergroupchatlist();

      event.complete();
    }, 500); //duration of refresh 
  }
}
