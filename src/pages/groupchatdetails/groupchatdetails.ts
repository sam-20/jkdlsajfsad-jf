import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Tabs } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'

@IonicPage()
@Component({
  selector: 'page-groupchatdetails',
  templateUrl: 'groupchatdetails.html',
})
export class GroupchatdetailsPage {

  //retrieves the id of the selected group from the previous page
  group_id_retrieved: any;

  //stores some of the info for the selected group
  group_profilepic: any;
  groupname: any;
  groupabout: any;
  members_joined_count: number = 0; //we count the members as we load them into the table
  createdgroup_admin_id: any;

  //we will retrieve the details of the group who's info we want so that we can put their details into the page
  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  groupdetailstablerows: any = []; //this array will receive the rows from the from the converted jsonformat 


  //table to collect details of the selected group's group members
  groupmembersdetailstable: any = [];
  groupmembersdetailsjsonconvertedrows: any = [];

  //table to collect number of messages posted by each member in this selected group
  groupmembersmessagescounttable: any = [];
  groupmembersmessagescountjsonconverted: any = [];

  server: string; /******************************a */

  constructor(public navCtrl: NavController,
    public tabs: Tabs,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public mymodulevariables: ModulevariablesProvider,
    private modalCtrl: ModalController,
    private postPvdr: PostProvider) {

    this.server = postPvdr.server; /*********************b */

    //retrieving the group's id from the previous page
    this.group_id_retrieved = localStorage.getItem('storedgroupid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatdetailsPage');
    console.log("selected group's id: ", this.group_id_retrieved);
  }


  ionViewWillEnter() {
    this.loadgroupdetails(); //we need the group's pic for the html
    this.loadgroupmembersdetails();//this loads the participants of the group
    this.loadgroupmembersmessagecount(); //this loads the number of messages posted by each member..if a member is not found here it means he hasnt posted a message hence we'd assign 0 to their messages_posted property in the groupmemberstable
  }


  /**we are going to use this function to load details of the group's participants and assign a new property called messages_posted to each user's details
   * then we run another function which will retrieve the number of messages posted by each user from the specific_group_mesages table in the database who's group is the selected group(this group)
   * if a user is found in the db's specific_group_messgae table, we assign the count(*) of messages posted from the db query results to the messages_posted property in the groupmembers table
   * if a user cant be found in the db's specific_group_messages table it means he hasnt posted a message hence we'd assign 0 to their messages_posted property in the groupmembers table
   */
  loadgroupmembersdetails() {
    this.members_joined_count = 0; //clear the members count of the group
    this.groupmembersdetailstable = [];
    this.groupmembersdetailsjsonconvertedrows = [];

    let body = {
      mydbfunc: 'displayspecificgroup_groupmembersdetails',
      group_idDB: this.group_id_retrieved
    }

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.groupmembersdetailsjsonconvertedrows = JSON.parse(data);

      for (let count of this.groupmembersdetailsjsonconvertedrows) {
        this.groupmembersdetailstable.push(count);
        this.members_joined_count = this.members_joined_count + 1;
      }

      /**for our new table we assign default user profile pics to those who dont have profile pics */
      for (var key in this.groupmembersdetailstable) {
        if ((this.groupmembersdetailstable[key].profile_pic_fetched) == null) {
          this.groupmembersdetailstable[key].profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }

      //this property will recieve the number of messages posted by the user after running the loadgroupmembersmessagecount function
      this.groupmembersdetailstable.forEach(function (element) { element.messages_posted = "0"; });

      console.log("selected group's members :", this.groupmembersdetailstable);
    });


  }


  /**this function we search the specific_group_messages db table and count the number of messages posted by each user where the group id = this selected group */
  loadgroupmembersmessagecount() {
    this.groupmembersmessagescountjsonconverted = [];
    this.groupmembersmessagescounttable = [];

    let body = {
      mydbfunc: 'displayspecificgroup_eachmember_messagescount',
      group_idDB: this.group_id_retrieved
    }

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.groupmembersmessagescountjsonconverted = JSON.parse(data);

      for (let count of this.groupmembersmessagescountjsonconverted) {
        this.groupmembersmessagescounttable.push(count);
      }

      console.log("selected group each member's message count :", this.groupmembersmessagescounttable);


      /**now we compare the ids of the group members in the group members table with the ids in the group members messages count table
       * if an id is found we assign the messages_posted_fetched from the groupmembers messagescount table to the messages_posted property in the groupmembers details table of the matched group member
       * if the id is not found in the groupmembers messagecount table it means that id hasnt posted a message hence we'd leave the default value for the messages_posted property in the groupmembers details table which is 0
       */
      for (var count1 = 0; count1 < this.groupmembersdetailstable.length; count1++) { //looping through the group member's table
        for (var count2 = 0; count2 < this.groupmembersmessagescounttable.length; count2++) { //looping through the table containing number of messages by each user
          if (this.groupmembersdetailstable[count1].user_id_fetched == this.groupmembersmessagescounttable[count2].sender_id_fetched) { //if a member's id can be found in the messages count table
            this.groupmembersdetailstable[count1].messages_posted = this.groupmembersmessagescounttable[count2].messages_posted_fetched //assign his messages count to his messages_posted property in the members details table
          }
        }
      }

      console.log("group member's details and their messages posted: ", this.groupmembersdetailstable);

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
          this.groupabout = this.groupdetailstablerows[key].about_fetched;
          this.createdgroup_admin_id = this.groupdetailstablerows[key].group_admin_id_fetched; //store the admin of the group

          //if profile pic is null 
          if (this.groupdetailstablerows[key].group_profile_pic_fetched == null) {
            this.groupdetailstablerows[key].group_profile_pic_fetched = "defaultprofilepic/defaultgroupprofilepic.jpg";  //this directory is in htdocs/campfila/defaultprofilepic folder
          }
          this.group_profilepic = this.server + this.groupdetailstablerows[key].group_profile_pic_fetched;;
        }

      }
    });
  }

  //manage group members 
  managegroupmembers() {
    localStorage.setItem('storednewlycreatedgroupid', this.group_id_retrieved); //the group who's members we are going to manage
    // const modal = this.modalCtrl.create('AddgroupmembersPage');
    // modal.present();

    this.navCtrl.push('AddgroupmembersPage')
  }

  //dissolve group 
  dissolvegroup() {
    const confirm = this.alertCtrl.create({
      title: '',
      message: 'Are you sure you want to delete this group?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deletegroup(); //delete group
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

  //delete group 
  deletegroup() {
    let body = {
      mydbfunc: 'delete_createdgroup',
      group_idDB: this.group_id_retrieved
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      //finally navigate to the main groups chat page
      this.tabs.select(4);
    });
  }

}
