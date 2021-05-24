import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs  } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'



@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format  
  useraccountstablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  /**this page retrieves all users in the databaase
   * from all the people who are displayed there are some we follow and some who follow us
   * A. if we follow a user we want to indicate on the page that we're following them by using a primary button with text.."following"
   * B. if a user follows us we want to indicatte on the page that they're following us by the text "follows you"
   */

  /**A. comparing users which we follow with overall users to change their buttons to "following" */
  followingtablejsonconvertedrows: any[];
  followingtable: any = [];

  /**B comparing users who follow us with overall users to display follows you */
  followerstablejsonconvertedrows: any[];
  followerstable: any = [];


  server: string; /******************************a */

  selected_useridDB: any; //will take the id from the selected user who we want to follow or unfollow for use in our database

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
    private tabs:Tabs) {
    this.server = postPvdr.server; /*********************b */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  //codes here are executed when the user selects the tab 
  ionViewWillEnter() {
    this.loadpagedata();  //used for loading asynchronous data
  }

  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    this.followingtable = []; //clear all users in the following table
    this.loadfollowing();  //load new set of users following 
    this.followerstable = [];  //clear all users in the followers table
    this.loadfollowers(); // load new set of followers     

    setTimeout(() => {
      //finally output all our users
      this.useraccountstablerows = [];  //we load whatever is in our useraccounts array whose data has already been converted into usable format
      this.loadallusers(); //then we call the function to load all the users
      //console.log('Refresh complete');

    }, 0); //duration of refresh
  }

  //loading those who u follow so that we can match with all users and assign a 'following' text button
  loadfollowing() {
    let body = {
      mydbfunc: 'loaduserfollowing',
      globaluseridDB: this.mymodulevariables.globaluserid //select from friendship where follower_id = logged in user's id
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      /***data inside the .subscribe contains our records 
        * but we cant use it in its original format 
        * so we convert into a usable format 
        * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.followingtablejsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.followingtablejsonconvertedrows) {
        this.followingtable.push(count);
      }
      //console.log(this.followingtable);

      //now we have the people who we follow in the followingtable
    });


  }


  //loading those who follow us so that we can match with all users and assign a 'follows you' text
  loadfollowers() {
    let body = {
      mydbfunc: 'loaduserfollowers',
      globaluseridDB: this.mymodulevariables.globaluserid //select from friendship where followed_id = logged in user's id
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      /***data inside the .subscribe contains our records 
        * but we cant use it in its original format 
        * so we convert into a usable format 
        * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.followerstablejsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.followerstablejsonconvertedrows) {
        this.followerstable.push(count);
      }
      //console.log(this.followerstable);

      //now we have the people who follow us in the followerstable
    });


  }


  //load all users
  loadallusers() {

    //stuff we want to post to our database
    let body = {
      mydbfunc: 'displayallusers' //function  to be used in php file
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
        this.useraccountstablerows.push(count);
      }

      //lets look at the data in messagetablerows
      //console.log(this.useraccountstablerows);
      //console.log(this.useraccountstablerows.length);

      /**we add another property called buttoncolor and followstatus to useraccountablerows and assign default colors to it for it to look like
       * {username: "mike", userpassword: "phelan321", buttoncolor:"dark", followstatus:"follow"}
       * so that we can call it in the html like {{count.buttoncolor}}**/
      this.useraccountstablerows.forEach(function (element) { element.buttoncolor = "dark"; });
      this.useraccountstablerows.forEach(function (element) { element.followstatus = "follow"; });
      this.useraccountstablerows.forEach(function (element) { element.followertext = ""; });

      //lets look at how the data in messagetable rows looks like now ie. it has added another property or column to the array
      //console.log(this.useraccountstablerows);
      //console.log(this.useraccountstablerows.length);

      /**now we have have the messages in the messagetablerows array so we are 
      we are going to check if a profile pic is null then we assign our pic to the user **/
      for (var key in this.useraccountstablerows) {
        if ((this.useraccountstablerows[key].user_profile_pic_fetched) == null) {
          this.useraccountstablerows[key].user_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      //checking for people who we follow in the overall users database
      for (var useraccountstableloop = 0; useraccountstableloop < this.useraccountstablerows.length; useraccountstableloop++) { //looping through the followers list
        for (var followingtableloop = 0; followingtableloop < this.followingtable.length; followingtableloop++) { // looping through the following list
          if (this.useraccountstablerows[useraccountstableloop].user_id_fetched == this.followingtable[followingtableloop].following_userid_fetched) {  //if a match is found
            //console.log(this.useraccountstablerows[useraccountstableloop].user_id_fetched);  //log matched up user_id (person who follows us and we follow them)
            this.useraccountstablerows[useraccountstableloop].followstatus = "following" //assign "following" to the button to indicate that you follow the person
            this.useraccountstablerows[useraccountstableloop].buttoncolor = "primary" //assign "primary" to indicate that u follow the person
          }
        }
      }

      //checking for people who follow us in the overall users database
      for (var useraccountstableloop = 0; useraccountstableloop < this.useraccountstablerows.length; useraccountstableloop++) { //looping through the followers list
        for (var followerstableloop = 0; followerstableloop < this.followerstable.length; followerstableloop++) { // looping through the followers list
          if (this.useraccountstablerows[useraccountstableloop].user_id_fetched == this.followerstable[followerstableloop].follower_userid_fetched) {  //if a match is found
            //console.log(this.useraccountstablerows[useraccountstableloop].user_id_fetched);  //log matched up user_id (person who u follow and follows u)
            this.useraccountstablerows[useraccountstableloop].followertext = "follows you" //assign "follows you" to indicate that the person follows you
          }
        }
      }

    });
  }

  //follow or unfollow button 
  followORunfollow(count) {
    console.log(this.mymodulevariables.globaluserid); //user id of logged in user
    console.log(count.user_id_fetched); //user id of selected user to follow or unfollow
    this.selected_useridDB = count.user_id_fetched

    //if user selects his own account to follow or unfollow
    if (count.user_id_fetched == this.mymodulevariables.globaluserid) {
      //do nothing
    }

    //else if its another user
    else {
      if (count.buttoncolor == 'dark') {
        count.buttoncolor = 'primary' //meaning logged in user is following selected user
        count.followstatus = "following";
        this.mymodulevariables.totaluserfollowing++;
        this.followuser();
        this.sendfollownotification();  //inset into notifications table to allow selected id who is being followed to be notified in his notifications page
      }

      else {
        count.buttoncolor = 'dark'; //meaning logged in user has unfollowed selected user
        count.followstatus = "follow";
        this.mymodulevariables.totaluserfollowing--;
        this.unfollowuser();
        this.deletefollownotification(); //delete from notification table so that user does not receive notification that he's been followed
      }
    }
  }

  //follow user: insert logged in user_id and id of the person u want to follow into friendship table
  followuser() {
    let body = {
      logged_in_useridDB: this.mymodulevariables.globaluserid, //logged in user's id
      followed_useridDB: this.selected_useridDB, //followed person's id 
      mydbfunc: 'followuser'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //insert into notifications table the logged in user id and seleceted user's id
  sendfollownotification() {
    let body = {
      senderidDB: this.mymodulevariables.globaluserid, //logged in user's id
      receiveridDB: this.selected_useridDB, //followed person's id 
      mydbfunc: 'sendfollownotification'
    }

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //unfollow user: delete from friendship table where value = logged in user's id and person followed's id
  unfollowuser() {
    let body = {
      logged_in_useridDB: this.mymodulevariables.globaluserid, //logged in user's id
      followed_useridDB: this.selected_useridDB, //followed person's id 
      mydbfunc: 'unfollowuser'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }


  //delete from notifications table the logged in user id and seleceted user's id
  deletefollownotification() {
    let body = {
      senderidDB: this.mymodulevariables.globaluserid, //logged in user's id
      receiveridDB: this.selected_useridDB, //followed person's id 
      mydbfunc: 'deletefollownotification'
    }

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //open a selected user's profile
  openuserprofile(count) {
    console.log("selected user's id", count.user_id_fetched)

    //if selected user is ourself then we open our own profile tab
    if (count.user_id_fetched == this.mymodulevariables.globaluserid){
      console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else{
      localStorage.setItem('storeduserid',count.user_id_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }


  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.followingtable = []; //clear all users in the following table
    this.loadfollowing();  //load new set of users following 
    this.followerstable = [];  //clear all users in the followers table
    this.loadfollowers(); // load new set of followers     

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.useraccountstablerows = [];  //we load whatever is in our useraccounts array whose data has already been converted into usable format
      this.loadallusers(); //then we call the function to load all the users
      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh
  }
}

