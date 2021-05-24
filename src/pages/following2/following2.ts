import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'


@IonicPage()
@Component({
  selector: 'page-following2',
  templateUrl: 'following2.html',
})
export class Following2Page {
  user_id_retrieved: any; //this is needed to load the user's info for this page

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format    
  followingtablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  /**another table to store following of the logged in user
   * it will be compared with the following of the person whose 'following page' we have opened
   * if someone we are following already is in the 'following' list of the person whose 'following page' we have opened
   * we indicate to show that we're following that person too in the list
   */
  myjsonconvertedfollowingtablerows: any = [];
  myfollowingtablerows: any = [];

  /**this page is supposed to retrieve the details of people who u follow. so automatically every person in
   * followingtablerows means u follow that person. out of those who u follow, some of the people follow you and we want to indicate
   * that on the html by the text 'follows you' 
   * To do that, we'd call another table which contains people who follow you. Then we match the people who follow you
   * against those u follow..if a user id is found in both tables it means the person follow u and u also follow the person
   * hence we can put the 'follows you' text beside the person. if the user id from the followers table does not match any id in the
   * followingtable it means the user doesnt follow u hence we'd not show the 'follows you' text
   */
  followerstablejsonconvertedrows: any = [];
  followerstable: any = [];

  /**another table to store followers of the logged in user
   * it will be compared with the following of the person whose 'following page' we have opened
   * if someone who follows us already is in the 'following' list of the person whose 'following page' we have opened
   * we indicate to show that that person  in the list follows us
   */
  myjsonconvertedfollowerstablerows: any = [];
  myfollowerstablerows: any = [];

  //we need to find the number of following and assign to our tab badge
  countfollowingtable: any = [];
  countfollowingjsonconvertedrows: any = [];


  server: string; /******************************a */

  selected_useridDB: any;  //will take the id from the selected user who we want to unfollow for use in our database

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
    private tabs: Tabs) {
    this.server = postPvdr.server; /*********************b */
    //retriving the user id 
    this.user_id_retrieved = (localStorage.getItem('storeduserid'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowingPage');
  }

  ionViewWillEnter() {
    this.loadpagedata(); //used for loading asynchronous data
  }

  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    this.followerstable = [];  //clear all users in the followers table
    this.loadfollowers(); // load new set of followers 
    this.countfollowing();

    //load following and followers of logged in user
    this.loadmyfollowing();
    this.loadmyfollowers();

    setTimeout(() => {

      //finally output our info fromm the followingusers table
      this.followingtablerows = [];  //clear all users in the following table
      this.loaduserfollowing();   //load new set of users following

      console.log('Refresh complete');
    }, 0); //duration of refresh 
  }



  //load logged in user's followers
  loadmyfollowing() {
    this.myjsonconvertedfollowingtablerows = [];
    this.myfollowingtablerows = [];

    let body = {
      mydbfunc: 'loaduserfollowing',
      globaluseridDB: this.mymodulevariables.globaluserid //select from friendship where followed_id = logged in user's id
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      /***data inside the .subscribe contains our records 
        * but we cant use it in its original format 
        * so we convert into a usable format 
        * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.myjsonconvertedfollowingtablerows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.myjsonconvertedfollowingtablerows) {
        this.myfollowingtablerows.push(count);
      }
      console.log("logged in user's following list", this.myfollowingtablerows);
    });
  }

  //load logged in user's following
  loadmyfollowers() {
    this.myjsonconvertedfollowerstablerows = [];
    this.myfollowerstablerows = [];

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
      this.myjsonconvertedfollowerstablerows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.myjsonconvertedfollowerstablerows) {
        this.myfollowerstablerows.push(count);
      }
      console.log("logged in user's followers list", this.myfollowerstablerows);

    });
  }



  //count number of following
  countfollowing() {
    let body = {
      mydbfunc: 'countfollowing',
      globaluseridDB: this.user_id_retrieved
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.countfollowingjsonconvertedrows = JSON.parse(data);

      for (let count of this.countfollowingjsonconvertedrows) {
        this.countfollowingtable.push(count);
        console.log(this.countfollowingtable);
      }

      for (var key in this.countfollowingtable) {
        console.log(this.countfollowingtable[key].following_rows_fetched);
        this.mymodulevariables.totaluserfollowing = this.countfollowingtable[key].following_rows_fetched;
      }

    });
  }

  //load followers of selected person
  loadfollowers() {
    this.followerstablejsonconvertedrows = [];
    this.followerstable = [];

    let body = {
      mydbfunc: 'loaduserfollowers',
      globaluseridDB: this.user_id_retrieved //select from friendship where followed_id = logged in user's id
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
      console.log(this.followerstable);

      //now we have the people who follow us in the followerstable
    });
  }


  //to those who the person follows which will be displayed on this page
  //loaduserfollowing of selected user
  loaduserfollowing() {
    this.followingtablerows = [];
    this.jsonconvertedrows = [];

    let body = {
      mydbfunc: 'loaduserfollowing',
      globaluseridDB: this.user_id_retrieved //select from friendship where follower_id = logged in user's id
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      /***data inside the .subscribe contains our records 
      * but we cant use it in its original format 
      * so we convert into a usable format 
      * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.jsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.jsonconvertedrows) {
        this.followingtablerows.push(count);
      }

      /**we add another property called followstatus and buttoncolor to followingtablerows and assign default values to it for it to look like
        * {following_username: "lars", following_about: "dortmnund", followstatus:"following", buttoncolor:"primary"}
        * so that we can call it in the html like {{count.followstatus}} and {{count.buttoncolor}}**/
      this.followingtablerows.forEach(function (element) { element.followstatus = "follow"; });
      this.followingtablerows.forEach(function (element) { element.followertext = ""; });
      this.followingtablerows.forEach(function (element) { element.buttoncolor = "dark"; });


      /**now we have the following info in the followingtablerows array so we are 
       we are going to check if a following's profile pic is null then we assign our pic to the user **/
      for (var key in this.followingtablerows) {
        if ((this.followingtablerows[key].following_profile_pic_fetched) == null) {
          this.followingtablerows[key].following_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**now we have the two tables
       * table containing those who the selected user follows..ie.followingtable
       * table containing those who the loggedin user follows..ie. myfollowingtable;
       * we are going to compare the selected user's following list with the loggedinuser's following list
       * if a match is found in both tables it means the selected user and the loggedinuser follow the same id
       * hence we'd indicate the button in the selected user's following page that we also follow that same id by changing the name to following and button to primary
       */
      for (var followingtableloop = 0; followingtableloop < this.followingtablerows.length; followingtableloop++) { //looping through the following list of the selected user
        for (var myfollowingtableloop = 0; myfollowingtableloop < this.myfollowingtablerows.length; myfollowingtableloop++) { // looping through the following list of the loggedinuser
          if (this.followingtablerows[followingtableloop].following_userid_fetched == this.myfollowingtablerows[myfollowingtableloop].following_userid_fetched) {  //if a match is found
            console.log(this.followingtablerows[followingtableloop].following_userid_fetched);  //log matched up user_id (person who u follow and follows u)
            this.followingtablerows[followingtableloop].followstatus = "following" //indicating that we also follow the person
            this.followingtablerows[followingtableloop].buttoncolor = "primary"
          }
        }
      }



      /**now we have the two tables
       * table containing those who the selected user follows..ie.followingtable
       * table containing followers of the loggedinuser ..ie. myfollowerstable;
       * we are going to compare the selected user's following list with the loggedinuser's followers list
       * if a match is found in both tables it means the selected user follows the person and that person at the same time follows the loggedinuser 
       * hence we'd indicate that with the 'follows you' text
       */
      for (var followingtableloop = 0; followingtableloop < this.followingtablerows.length; followingtableloop++) { //looping through the following list of the selected user
        for (var myfollowerstableloop = 0; myfollowerstableloop < this.myfollowerstablerows.length; myfollowerstableloop++) { // looping through the followers list of the loggedinuser
          if (this.followingtablerows[followingtableloop].following_userid_fetched == this.myfollowerstablerows[myfollowerstableloop].follower_userid_fetched) {  //if a match is found
            console.log(this.followingtablerows[followingtableloop].following_userid_fetched);  //log matched up user_id (person who u follow and follows u)
            this.followingtablerows[followingtableloop].followertext = "follows you" //indicating that the person follows us
          }
        }
      }


    });
  }

  //follow a user who follows you 
  followOrunfollow(count) {

    //we cant follow ourself
    if (count.following_userid_fetched == this.mymodulevariables.globaluserid) {
      //do nothing
    }

    else {
      console.log(this.mymodulevariables.globaluserid) //user id of logged in user
      console.log(count.following_userid_fetched);  //user id of selected user u want to follow
      this.selected_useridDB = count.following_userid_fetched;

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

  //insert into notifications table the logged in user id and seleceted user's id
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
    console.log("selected user's id", count.following_userid_fetched)

    //if selected user is ourself then we open our own profile tab
    if (count.following_userid_fetched == this.mymodulevariables.globaluserid) {
      console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else {
      localStorage.setItem('storeduserid', count.following_userid_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }


  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.followerstable = [];  //clear all users in the followers table
    this.loadfollowers(); // load new set of followers 
    this.countfollowing();

    //load following and followers of logged in user
    this.loadmyfollowing();
    this.loadmyfollowers();

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.followingtablerows = [];  //clear all users in the following table
      this.loaduserfollowing();   //load new set of users following

      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh 
  }

}
