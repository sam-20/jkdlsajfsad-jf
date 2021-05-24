import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'


@IonicPage()
@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage { 

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format    
  followingtablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  /**this page is supposed to retrieve the details of people who u follow. so automatically every person in
   * followingtablerows means u follow that person. out of those who u follow, some of the people follow you and we want to indicate
   * that on the html by the text 'follows you' 
   * To do that, we'd call another table which contains people who follow you. Then we match the people who follow you
   * against those u follow..if a user id is found in both tables it means the person follow u and u also follow the person
   * hence we can put the 'follows you' text beside the person. if the user id from the followers table does not match any id in the
   * followingtable it means the user doesnt follow u hence we'd not show the 'follows you' text
   */
  followerstablejsonconvertedrows: any[];
  followerstable: any=[];

  //we need to find the number of following and assign to our tab badge
  countfollowingtable : any =[];
  countfollowingjsonconvertedrows: any = [];
  

  server: string; /******************************a */

  selected_useridDB: any;  //will take the id from the selected user who we want to unfollow for use in our database

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
    private tabs:Tabs) {
    this.server = postPvdr.server; /*********************b */
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
    this.followerstable =[];  //clear all users in the followers table
    this.loadfollowers(); // load new set of followers 
    this.countfollowing();

    setTimeout(() => {
      //finally output our info fromm the followingusers table
      this.followingtablerows =[];  //clear all users in the following table
      this.loaduserfollowing();   //load new set of users following
      console.log('Refresh complete');
    }, 0); //duration of refresh 
  }

  //count number of following
  countfollowing(){
    let body = {
      mydbfunc: 'countfollowing',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.countfollowingjsonconvertedrows = JSON.parse(data);

      for (let count of this.countfollowingjsonconvertedrows){
        this.countfollowingtable.push(count);
        console.log(this.countfollowingtable);
      }

      for (var key in this.countfollowingtable) {
        console.log(this.countfollowingtable[key].following_rows_fetched);
        this.mymodulevariables.totaluserfollowing = this.countfollowingtable[key].following_rows_fetched;
      }

    });
  }

  //loading those who follow us so that we can match with those we follow and assign a 'follows you' text
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
      console.log(this.followerstable);

      //now we have the people who follow us in the followerstable
    });


  }

  //to those who we follow which will be displayed on this page
  //loaduserfollowing
  loaduserfollowing() {
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
      this.jsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our messagetablerows for use in the html**/
      for (let count of this.jsonconvertedrows) {
        this.followingtablerows.push(count);
      }

      /**we add another property called followstatus and buttoncolor to followingtablerows and assign default values to it for it to look like
        * {following_username: "lars", following_about: "dortmnund", followstatus:"following", buttoncolor:"primary"}
        * so that we can call it in the html like {{count.followstatus}} and {{count.buttoncolor}}**/
      this.followingtablerows.forEach(function (element) { element.followstatus = "following"; });
      this.followingtablerows.forEach(function (element) { element.followertext = ""; });
      this.followingtablerows.forEach(function (element) { element.buttoncolor = "primary"; });


      /**now we have the following info in the followingtablerows array so we are 
       we are going to check if a following's profile pic is null then we assign our pic to the user **/
      for (var key in this.followingtablerows) {
        if ((this.followingtablerows[key].following_profile_pic_fetched) == null) {
          this.followingtablerows[key].following_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**now we have the two tables
       * followingtablerows: which contains info of the people we follow
       * followerstable: which contains info of the who follow us
       * we are now going to run a loop matching the two tables to find out the user ids
       * which follow us out of the the people we follow and assign "follows you" to their info
       */
      for (var followingtableloop = 0; followingtableloop < this.followingtablerows.length; followingtableloop++) { //looping through the following list
        for (var followerstableloop = 0; followerstableloop < this.followerstable.length; followerstableloop++) { // looping through the followers list
          if (this.followingtablerows[followingtableloop].following_userid_fetched == this.followerstable[followerstableloop].follower_userid_fetched) {  //if a match is found
            console.log(this.followingtablerows[followingtableloop].following_userid_fetched);  //log matched up user_id (person who u follow and follows u)
            this.followingtablerows[followingtableloop].followertext = "follows you" //assign "follows you" to indicate that the person follows you
          }
        }
      }
    });
  }

  //unfollow a user u're following
  unfollowuser(count) {
    console.log(this.mymodulevariables.globaluserid) //user id of logged in user
    console.log(count.following_userid_fetched);  //user id of selected user u want to unfollow
    this.selected_useridDB = count.following_userid_fetched;

    count.buttoncolor = 'dark';
    count.followstatus = "follow";
    this.mymodulevariables.totaluserfollowing--;
    this.unfollowselecteduser();
    this.deletefollownotification(); //delete from notification table so that user does not receive notification that he's been followed
  }

  //unfollow user: delete from friendship table where value = logged in user's id and person followed's id
  unfollowselecteduser() {
    let body = {
      logged_in_useridDB: this.mymodulevariables.globaluserid, //logged in user's id
      followed_useridDB: this.selected_useridDB, //followed person's id 
      mydbfunc: 'unfollowuser'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });

    //after unfollowing user we perform a manual refresh so that the person's info disappers from the page
    this.followingtablerows =[];
    this.loaduserfollowing();
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
    if (count.following_userid_fetched == this.mymodulevariables.globaluserid){
      // console.log("open profile tab page")
      // this.tabs.select(0);
    }

    //if user is someone else
    else{
      localStorage.setItem('storeduserid',count.following_userid_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }

  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.followerstable =[];  //clear all users in the followers table
    this.loadfollowers(); // load new set of followers 
    this.countfollowing();

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.followingtablerows =[];  //clear all users in the following table
      this.loaduserfollowing();   //load new set of users following
      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh 
  }

}
