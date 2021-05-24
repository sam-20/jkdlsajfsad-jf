import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs, ViewController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'



@IonicPage()
@Component({
  selector: 'page-addgroupmembers',
  templateUrl: 'addgroupmembers.html',
})
export class AddgroupmembersPage {

  /**array to store new created group's group details */
  groupdetailsjson: any = [];
  groupdetailstablerows: any = [];

  /**we store the admin of the group in this */
  createdgroup_admin_id: any;

  /**we store the members count of the group in this */
  selectedgroup_membersjoined;

  /**array to recieve all users account details in the app */
  jsonconvertedrows: any = [];
  useraccountstablerows: any = [];

  /**store any selected user's id in this variable */
  selecteduser_id: any;

  /**these tables will retrieve the members of the newly created group
   * so that we can know who is a member already and who we can add to the group or remove from the group
   */
  createdgroupmemberstable: any = [];
  createdgroupmembersjson: any = [];

  server: string; /******************************a */

  newlycreatedgroup_id_retrieved: any; //will retrieve the group id of the newly created group from the previous page


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
    // public tabs: Tabs
  ) {
    this.server = postPvdr.server; /*********************b */

    //retrieving the user id from create group page
    this.newlycreatedgroup_id_retrieved = (localStorage.getItem('storednewlycreatedgroupid'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ionViewWillEnter() {
    this.loadpagedata();  //used for loading asynchronous data

    console.log("newly created group's id :", this.newlycreatedgroup_id_retrieved);
  }

  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place


    setTimeout(() => {
      this.groupdetailsjson = [];
      this.groupdetailstablerows = [];
      this.loadcreatedgroupdetails();

      this.createdgroupmembersjson = [];
      this.createdgroupmemberstable = [];
      this.loadnewcreatedgroupmembers();

      //finally output all our users
      this.jsonconvertedrows = [];
      this.useraccountstablerows = [];  //we load whatever is in our useraccounts array whose data has already been converted into usable format
      this.loadallusers(); //then we call the function to load all the users


    }, 0); //duration of refresh
  }


  //load created group details
  loadcreatedgroupdetails() {
    this.groupdetailsjson = [];
    this.groupdetailstablerows = [];

    let body = {
      mydbfunc: 'displaygroupdetails',
      group_idDB: this.newlycreatedgroup_id_retrieved
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.groupdetailsjson = JSON.parse(data);

      for (let count of this.groupdetailsjson) {
        this.groupdetailstablerows.push(count);
      }
      console.log("created group's details :", this.groupdetailstablerows);


      //storing our group admin's id
      for (var key in this.groupdetailstablerows) {
        if (this.groupdetailstablerows.hasOwnProperty(key)) {
          this.createdgroup_admin_id = this.groupdetailstablerows[key].group_admin_id_fetched; //store the admin of the group
          this.selectedgroup_membersjoined = this.groupdetailstablerows[key].members_joined_fetched;  //store the total members count of the group
        }
      }
      console.log("created group's admin id :", this.createdgroup_admin_id);
    })

  }


  //load all users in the app
  loadallusers() {
    this.jsonconvertedrows = [];
    this.useraccountstablerows = [];

    let body = {
      mydbfunc: 'displayallusers'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.jsonconvertedrows = JSON.parse(data);

      for (let count of this.jsonconvertedrows) {
        this.useraccountstablerows.push(count);
      }

      console.log("all users", this.useraccountstablerows);

      this.useraccountstablerows.forEach(function (element) { element.buttoncolor = "dark"; });
      this.useraccountstablerows.forEach(function (element) { element.membershipstatus = "add"; });

      /**now we have have the messages in the messagetablerows array so we are 
      we are going to check if a profile pic is null then we assign our pic to the user **/
      for (var key in this.useraccountstablerows) {
        if ((this.useraccountstablerows[key].user_profile_pic_fetched) == null) {
          this.useraccountstablerows[key].user_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }

      /**compare all the users in the account table with the users who are a member of the selected group
       * if an id is found in both table it indicates the user is already in the group hence we
       * assign a "remove" text since he's already being added
      */
      for (var countA = 0; countA < this.useraccountstablerows.length; countA++) {
        for (var countB = 0; countB < this.createdgroupmemberstable.length; countB++) {
          if (this.useraccountstablerows[countA].user_id_fetched == this.createdgroupmemberstable[countB].user_id_fetched) {//if a user is a member of the group selected

            /**before we finally assing our status and button color we check if the id 
             * is an admin then we assign nothing so that he has no option to remove or add himself
             */
            if (this.useraccountstablerows[countA].user_id_fetched == this.createdgroup_admin_id) {  //if the id match is also a group admin
              this.useraccountstablerows[countA].buttoncolor = "primary";
              this.useraccountstablerows[countA].membershipstatus = "Admin";
            }

            /**else if the id is a memeber of the group already but not an admin */
            else {
              this.useraccountstablerows[countA].buttoncolor = "danger";
              this.useraccountstablerows[countA].membershipstatus = "remove";
            }
          }
        }
      }

    });
  }


  //load members of the newly created group
  loadnewcreatedgroupmembers() {
    this.createdgroupmembersjson = [];
    this.createdgroupmemberstable = [];

    let body = {
      mydbfunc: 'displayspecificgroup_groupmembersdetails',
      group_idDB: this.newlycreatedgroup_id_retrieved
    }

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.createdgroupmembersjson = JSON.parse(data);

      for (let count of this.createdgroupmembersjson) {
        this.createdgroupmemberstable.push(count);
      }

      console.log("newly created group's members :", this.createdgroupmemberstable);
    });
  }



  //open a selected user's profile
  openuserprofile(count) {
    // console.log("selected user's id", count.user_id_fetched)

    // //if selected user is ourself then we open our own profile tab
    // if (count.user_id_fetched == this.mymodulevariables.globaluserid){
    //   console.log("open profile tab page")
    //   this.tabs.select(0);
    // }

    // //if user is someone else
    // else{
    //   localStorage.setItem('storeduserid',count.user_id_fetched);
    //   this.navCtrl.push('Profile2Page');
    // }
  }


  //add or remove a member from the group
  addORremoveuser(count) {
    if (count.membershipstatus == "add") {
      //add user to the group
      count.membershipstatus = "remove";
      count.buttoncolor = "danger";
      this.selecteduser_id = count.user_id_fetched;

      //now db commands to add user to group
      this.joingroup(); //add user to the group

      this.selectedgroup_membersjoined++;
      console.log("selected group's members count: ", this.selectedgroup_membersjoined);

      this.updategroup_members_joined();  //update the total nubmer of members in the group
    }

    else { //remove user from the group
      count.membershipstatus = "add";
      count.buttoncolor = "dark";
      this.selecteduser_id = count.user_id_fetched;

      //now db commands to remove user from group
      this.exitgroup(); //remove user from group membership

      this.selectedgroup_membersjoined--;
      console.log("selected group's members count: ", this.selectedgroup_membersjoined);

      this.updategroup_members_joined();  //update the total number of members in the group
    }
  }



  //join group: insert logged in user_id and id of the group u want to join into group_membership db table
  joingroup() {
    let body = {
      logged_in_useridDB: this.selecteduser_id,
      group_joining_idDB: this.newlycreatedgroup_id_retrieved,
      mydbfunc: 'joingroup'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }


  //exit group: delete from group_membership db table where value = logged in user's id and group joined's id
  exitgroup() {
    let body = {
      logged_in_useridDB: this.selecteduser_id,
      group_joining_idDB: this.newlycreatedgroup_id_retrieved,
      mydbfunc: 'exitgroup'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }



  //update the number of members who have joined the selected group
  updategroup_members_joined() {
    let body = {
      group_idDB: this.newlycreatedgroup_id_retrieved,
      members_joinedDB: this.selectedgroup_membersjoined,
      mydbfunc: 'updategroup_memberscount'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });

  }


  //when user clicks done after adding or removing members
  leavepage() {
    // this.tabs.select(4);
    this.viewCtrl.dismiss();
  }


  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place

    setTimeout(() => {
      //operation to perform when refresh has completed

      // this.useraccountstablerows = [];  //we load whatever is in our useraccounts array whose data has already been converted into usable format
      // this.loadallusers(); //then we call the function to load all the users

      this.loadpagedata();

      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh
  }
}
