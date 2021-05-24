import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'

@IonicPage()
@Component({
  selector: 'page-viewallgroups',
  templateUrl: 'viewallgroups.html',
})
export class ViewallgroupsPage {

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format  
  groupaccountstablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  //this table will fetch the groups that the logged in user is joinnig so that we can tell whihc
  //groups to assign the text "joining" to their join button
  usergroupfollowingtable: any = [];
  usergroupfollowingtablejsonconvertedrows: any = [];

  /**we'd also load the user's details 
   * from the user's default group id we can tell which groups he can join and the ones he cant join
   */
  userdetailstablerows: any = [];
  userdetailsjsonconvertedrows: any = [];

  user_default_group_id: any; //variable to store the user's default group id

  selectedgroup_membersjoined: number; //store the count of the members who have joined a selected group..its needed for the update in the members_joined db column when a user joins or exits a grouo


  selected_groupidDB: any; //will take the id from the selected group who we want to join or exit for use in our database

  server: string; /******************************a */

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider) {
    this.server = postPvdr.server; /*********************b */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewallgroupsPage');
  }


  //codes here are executed when the user selects the tab 
  ionViewWillEnter() {
    this.loaduserdetails(); //load our user's details which would help us to know the groups he's eligible to join
    this.loadpagedata();  //used for loading asynchronous data
  }


  //load all logged in or signued up user's details
  loaduserdetails() {
    this.jsonconvertedrows = [];
    this.userdetailstablerows = [];

    //variables and function to be used in php
    let body = {
      mydbfunc: 'displayloggedinorsignedupuserdetails',
      globaluseridDB: this.mymodulevariables.globaluserid
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
        this.userdetailstablerows.push(count);
      }

      console.log("userdetails: ", this.userdetailstablerows)

      //retrieving the user details from userdetailstablesrows array we also assign a default profile pic from our api folder into the picture box in case a user's profile pic is null
      for (var key in this.userdetailstablerows) {
        if (this.userdetailstablerows.hasOwnProperty(key)) {
          this.user_default_group_id = this.userdetailstablerows[key].default_group_id_fetched;
        }
      }

      console.log("user's default group id: ", this.user_default_group_id);
    });
  }


  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    this.loadusergroupfollowing();

    setTimeout(() => {
      this.loadallgroups();
      //console.log('Refresh complete');

    }, 0); //duration of refresh
  }


  //load all groups that the logged in user joins..so that we can assign "joining" to those groups' join button
  loadusergroupfollowing() {
    this.usergroupfollowingtable = [];
    this.usergroupfollowingtablejsonconvertedrows = [];

    let body = {
      mydbfunc: 'loadusergroupsfollowing',
      globaluseridDB: this.mymodulevariables.globaluserid //select from group membership where id = loggedin user's id
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.usergroupfollowingtablejsonconvertedrows = JSON.parse(data);

      for (let count of this.usergroupfollowingtablejsonconvertedrows) {
        this.usergroupfollowingtable.push(count);
      }
      console.log("user's groups following: ", this.usergroupfollowingtable);
    });
  }



  //load all groups
  loadallgroups() {
    this.jsonconvertedrows = [];
    this.groupaccountstablerows = [];

    let body = {
      mydbfunc: 'displayallgroups'
    }

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.jsonconvertedrows = JSON.parse(data);

      for (let count of this.jsonconvertedrows) {
        this.groupaccountstablerows.push(count);
      }

      console.log("all groups: ", this.groupaccountstablerows);

      /**add properties to our table fetched for the join button and status */
      this.groupaccountstablerows.forEach(function (element) { element.buttoncolor = "dark"; });
      this.groupaccountstablerows.forEach(function (element) { element.joinstatus = "join"; });


      /**now we have have the group details in the groupaccounttablerows array so we are 
      we are going to check if a group's profile pic is null then we assign our default pic to the group **/
      for (var key in this.groupaccountstablerows) {
        if ((this.groupaccountstablerows[key].group_profile_pic_fetched) == null) {
          this.groupaccountstablerows[key].group_profile_pic_fetched = "defaultprofilepic/defaultgroupprofilepic.jpg";
        }
      }

      //checking for groups which we follow and assigning a "joining" text to their join buttons
      for (var groupsaccountstableloop = 0; groupsaccountstableloop < this.groupaccountstablerows.length; groupsaccountstableloop++) { //looping through the groups list
        for (var usergroupsfollowingtableloop = 0; usergroupsfollowingtableloop < this.usergroupfollowingtable.length; usergroupsfollowingtableloop++) { // looping through the user's group following list
          if (this.groupaccountstablerows[groupsaccountstableloop].group_id_fetched == this.usergroupfollowingtable[usergroupsfollowingtableloop].group_id_fetched) {  //if a match is found
            console.log("user's group id following :", this.groupaccountstablerows[groupsaccountstableloop].group_id_fetched);  //log matched up user_id (person who follows us and we follow them)
            this.groupaccountstablerows[groupsaccountstableloop].joinstatus = "exit group" //assign "following" to the button to indicate that you follow the person
            this.groupaccountstablerows[groupsaccountstableloop].buttoncolor = "danger" //assign "primary" to indicate that u follow the person
          }
        }
      }

    });
  }



  //join or exit group
  joinORexitgroup(count) {
    console.log("loggedin user's id: ", this.mymodulevariables.globaluserid); //user id of logged in user
    console.log("selected group's id: ", count.group_id_fetched); //group id of selected group to join or exit
    this.selected_groupidDB = count.group_id_fetched

    /**if the selected group's year eligibilty is for all students eg.pensa, ghamsu then we can join
     * however if the eligibility is not for all students then it means it's a programme's group
     * eg. computer science 4, computer science 2, medicine 3
     * we compare the user's eligibility group id with the id of the selected group which is not for all students
     * if they are the same it means the user is eligible to join else he cant join
     */

    if (count.student_year_eligibility_fetched == "all") {
      //every user can join
      console.log("you can join!");

      //changing button color and texxt based on what was there and what the user selected
      if (count.buttoncolor == 'dark') {
        count.buttoncolor = 'danger' //meaning logged in user has joined the selected group
        count.joinstatus = "exit group";
        this.joingroup();

        //assign the members_joined of the selected group to our variable
        //add 1 to the members_joined and update in the database
        this.selectedgroup_membersjoined = count.members_joined_fetched;
        this.selectedgroup_membersjoined++ ;
        this.selectedgroup_membersjoined--;
        console.log("selected group's members count: ",this.selectedgroup_membersjoined);
        this.updategroup_members_joined();

        //now we open the group page and its messages for the group the user has joined
        localStorage.setItem('storedgroupid', count.group_id_fetched);
        this.navCtrl.push('ViewspecificgroupchatPage');
      }

      else {
        count.buttoncolor = 'dark'; //meaning logged in user has exited the selected group
        count.joinstatus = "join";
        this.exitgroup();

        //assign the members_joined of the selected group to our variable
        //sub 1 from the members_joined and update in the database
        this.selectedgroup_membersjoined = count.members_joined_fetched;
        this.selectedgroup_membersjoined--;
        console.log("selected group's members count: ",this.selectedgroup_membersjoined);
        this.updategroup_members_joined();
      }
    }

    //if the selected group's eligibility is restricted
    else {
      //if the group's id is the same as the user's default group id then he can join else he cant
      if (count.group_id_fetched == this.user_default_group_id) {
        console.log("you can join!")

        //changing button color and texxt based on what was there and what the user selected
        if (count.buttoncolor == 'dark') {
          count.buttoncolor = 'danger' //meaning logged in user has joined the selected group
          count.joinstatus = "exit group";
          this.joingroup();

          //assign the members_joined of the selected group to our variable
          //add 1 to the members_joined and update in the database
          this.selectedgroup_membersjoined = count.members_joined_fetched;
          this.selectedgroup_membersjoined++
          this.selectedgroup_membersjoined--;
          console.log("selected group's members count: ",this.selectedgroup_membersjoined);
          this.updategroup_members_joined();

          //now we open the group page and its messages for the group the user has joined
          localStorage.setItem('storedgroupid', count.group_id_fetched);
          this.navCtrl.push('ViewspecificgroupchatPage');
        }

        else {
          count.buttoncolor = 'dark'; //meaning logged in user has exited the selected group
          count.joinstatus = "join";
          this.exitgroup();

          //assign the members_joined of the selected group to our variable
          //sub 1 from the members_joined and update in the database
          this.selectedgroup_membersjoined = count.members_joined_fetched;
          this.selectedgroup_membersjoined--
          console.log("selected group's members count: ",this.selectedgroup_membersjoined);
          this.updategroup_members_joined();
        }
      }

      //if user's default group is not the same as the selected group's id
      else {
        console.log("you are not eligible to join!");
        this.ineligiblegroupToast(); //toast to prompt user he's ineligbile to join group
      }
    }
  }


  //join group: insert logged in user_id and id of the group u want to join into group_membership db table
  joingroup() {
    let body = {
      logged_in_useridDB: this.mymodulevariables.globaluserid, //logged in user's id
      group_joining_idDB: this.selected_groupidDB, //followed person's id 
      mydbfunc: 'joingroup'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }



  //exit group: delete from group_membership db table where value = logged in user's id and group joined's id
  exitgroup() {
    let body = {
      logged_in_useridDB: this.mymodulevariables.globaluserid, //logged in user's id
      group_joining_idDB: this.selected_groupidDB, //followed person's id 
      mydbfunc: 'exitgroup'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //update the number of members who have joined the selected group
  updategroup_members_joined() {
    let body = {
      group_idDB: this.selected_groupidDB, //followed person's id 
      members_joinedDB: this.selectedgroup_membersjoined,
      mydbfunc: 'updategroup_memberscount'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });

  }


  //toast to prompt user he's ineligible to join group
  ineligiblegroupToast() {
    const toast = this.toastCtrl.create({
      message: 'Ineligible to join group',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.loadusergroupfollowing();

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.loadallgroups();
      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh 
  }

}
