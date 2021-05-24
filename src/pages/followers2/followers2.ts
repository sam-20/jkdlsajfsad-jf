import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'


@IonicPage()
@Component({
  selector: 'page-followers2',
  templateUrl: 'followers2.html',
})
export class Followers2Page {
  user_id_retrieved: any; //this is needed to load the user's info for this page

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format  
  followerstablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  /**this page is supposed to retrieve the details of people who follow u. so automatically every person in
     * followerstablerows means that person follows you. out of those who follow u, you follow some of those people and we want to indicate
     * that on the html followstatus button by the text 'following' and change the color of the button to primary to indicate you are also following them 
     * To do that, we'd call another table which contains people who you follow. Then we match the people who you follow
     * against those who follow u ..if a user id is found in both tables it means the person follows u and u also follow the person
     * hence we can put the 'following' inside the followstatus button of the person. if the user id from the following table does not match any id in the
     * followerstable it means u dont follow the user but the user follows u hence we'd show the 'follow' text in the button instead of 'following'
     */
  followingtablejsonconvertedrows: any[];
  followingtable: any = [];

  /**another table to store following of the logged in user
   * it will be compared with the followers of the person whose 'followers page' we have opened
   * if someone we are following already is in the 'followers' list of the person whose 'followers page' we have opened
   * we indicate to show that we're following that person in the list
   */
  myjsonconvertedfollowingtablerows: any = [];
  myfollowingtablerows: any = [];


  /**another table to store followers of the logged in user
  * it will be compared with the followers of the person whose 'followers page' we have opened
  * if someone who follows us already is in the 'followers' list of the person whose 'followers page' we have opened
  * we indicate to show that that person  in the list follows us
  */
  myjsonconvertedfollowerstablerows: any = [];
  myfollowerstablerows: any = [];


  //we need to find the number of followers and assign to our tab badge
  countfollowerstable: any = [];
  countfollowersjsonconvertedrows: any = [];


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

  ionViewWillEnter() {
    this.loadpagedata();   //used for loading asynchronous data
  }

  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    this.followingtable = []; //clear all users in the following table
    this.loadfollowing();  //load new set of users following 
    this.countfollowers();

    //load following and followers of logged in user
    this.loadmyfollowing();
    this.loadmyfollowers();

    setTimeout(() => {
      //finally out all our follwoers from the followerstable
      this.followerstablerows = []; //clear all users in the followers table
      this.loaduserfollowers();  //load new set of user followers
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



  //count number of followers
  countfollowers() {
    let body = {
      mydbfunc: 'countfollowers',
      globaluseridDB: this.user_id_retrieved
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.countfollowersjsonconvertedrows = JSON.parse(data);

      for (let count of this.countfollowersjsonconvertedrows) {
        this.countfollowerstable.push(count);
        console.log(this.countfollowerstable);
      }

      for (var key in this.countfollowerstable) {
        console.log(this.countfollowerstable[key].followers_rows_fetched);
        this.mymodulevariables.totaluserfollowers = this.countfollowerstable[key].followers_rows_fetched;
      }

    });
  }

  //loading those who u follow so that we can match with those who follow us and assign a 'following' text button
  loadfollowing() {
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
      this.followingtablejsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.followingtablejsonconvertedrows) {
        this.followingtable.push(count);
      }
      console.log(this.followingtable);

      //now we have the people who we follow in the followingtable
    });


  }

  //to those who follow us which will be displayed on this page
  //loaduserfollowers
  loaduserfollowers() {
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
      this.jsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.jsonconvertedrows) {
        this.followerstablerows.push(count);
      }

      console.log(this.followerstablerows);

      /**we add another property called followstatus and followertext to followertablerows and assign default values to it for it to look like
      * {follower_username: "lars", follower_about: "dortmnund", followstatus:"follow", followertext:"follows you"}
      * so that we can call it in the html like {{count.followstatus}} and {{count.followertext}}**/
      this.followerstablerows.forEach(function (element) { element.followstatus = "follow"; });
      this.followerstablerows.forEach(function (element) { element.followertext = ""; });
      this.followerstablerows.forEach(function (element) { element.buttoncolor = "dark"; });


      /**now we have the followers info in the followerstablerows array so we are 
      we are going to check if a follower's profile pic is null then we assign our pic to the user **/
      for (var key in this.followerstablerows) {
        if ((this.followerstablerows[key].follower_profile_pic_fetched) == null) {
          this.followerstablerows[key].follower_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**now we have the two tables
       * table containing followers of the selected user..ie.followerstablerows
       * table containing those who the loggedin user follows..ie. myfollowingtable;
       * we are going to compare the selected user's followers list with the loggedinuser's following list
       * if a match is found in both tables it means the loggedinuser follows that id in the selected user's followers list
       * hence we'd indicate the button in the selected user's followers page that we follow that same id by changing the name to following and button to primary
       */
      for (var followerstableloop = 0; followerstableloop < this.followerstablerows.length; followerstableloop++) { //looping through the followers list of the selecetd user
        for (var myfollowingtableloop = 0; myfollowingtableloop < this.myfollowingtablerows.length; myfollowingtableloop++) { // looping through the following list of te loggedin user
          if (this.followerstablerows[followerstableloop].follower_userid_fetched == this.myfollowingtablerows[myfollowingtableloop].following_userid_fetched) {  //if a match is found
            console.log(this.followerstablerows[followerstableloop].follower_userid_fetched);  //log matched up user_id (person who follows us and we follow them)
            this.followerstablerows[followerstableloop].followstatus = "following" //assign "following" to the button to indicate that you follow the person
            this.followerstablerows[followerstableloop].buttoncolor = "primary" //assign "primary" to indicate that u follow the person
          }
        }
      }


        /**now we have the two tables
       * table containing followers of the selected user..ie.followerstablerows
       * table containing followers of the loggedinuser ..ie. myfollowerstable;
       * we are going to compare the selected user's followers list with the loggedinuser's followers list
       * if a match is found in both tables it means the loggedinuser and the selected user have that same follower
       * hence we'd indicate that with the 'follows you' text
       */
      for (var followerstableloop = 0; followerstableloop < this.followerstablerows.length; followerstableloop++) { //looping through the followers list of the selecetted user
        for (var myfollowerstableloop = 0; myfollowerstableloop < this.myfollowerstablerows.length; myfollowerstableloop++) { // looping through the followers list of loggedinuser
          if (this.followerstablerows[followerstableloop].follower_userid_fetched == this.myfollowerstablerows[myfollowerstableloop].follower_userid_fetched) {  //if a match is found
            console.log(this.followerstablerows[followerstableloop].follower_userid_fetched);  //log matched up user_id (person who follows us and we follow them)
            this.followerstablerows[followerstableloop].followertext = "follows you" //assign "following" to the button to indicate that you follow the person
          }
        }
      }


    });
  }

  //follow a user who follows you 
  followOrunfollow(count) {
    console.log(this.mymodulevariables.globaluserid) //user id of logged in user
    console.log(count.follower_userid_fetched);  //user id of selected user u want to follow
    this.selected_useridDB = count.follower_userid_fetched;

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
    console.log("selected user's id", count.follower_userid_fetched)

    //if selected user is ourself then we open our own profile tab
    if (count.follower_userid_fetched == this.mymodulevariables.globaluserid) {
      console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else {
      localStorage.setItem('storeduserid', count.follower_userid_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }


  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.followingtable = []; //clear all users in the following table
    this.loadfollowing();  //load new set of users following 
    this.countfollowers();

    //load following and followers of logged in user
    this.loadmyfollowing();
    this.loadmyfollowers();

    setTimeout(() => {
      //operation to perform when refresh has completed 
      this.followerstablerows = []; //clear all users in the followers table
      this.loaduserfollowers();  //load new set of user followers
      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh
  }

}
