import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController, ModalController, Slides } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-profile2',
  templateUrl: 'profile2.html',
})
export class Profile2Page {

  @ViewChild(Slides) slides: Slides //slides

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;  //swipeable tabs

  SwipedTabsIndicator: any = null;
  tabs: any = [];
  //the above is for slides and swipeable tabs

  //for our slides
  public slidesHeight: string | number;
  public slidesMoving: boolean = true;
  longestslideheight: number = 0;  //we initially set our longest slide height to 0..it will be updated when the slides change since the height is calculated when we move to a new slide


  user_id_retrieved: any; //this is needed to load the user's info for this page

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  userdetailstablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  server: string; /******************************a */

  //variables to receive the fetched data
  username: any;
  userpassword: any;
  profilepic: any;
  about: any;
  datejoined: any;
  website: any;
  email: any;
  phonenumber: any;

  //stores the user stats
  followingcount: any;
  followerscount: any;
  likescount: any;
  commentscount: any;
  usermessagescount: any;

  //tables to retrieve user stats from db
  countfollowingtable: any = [];
  countfollowingjsonconvertedrows: any = [];

  countfollowerstable: any = [];
  countfollowersjsonconvertedrows: any = [];

  countlikestable: any = [];
  countlikesjsonconvertedrows: any = [];

  countcommentstable: any = [];
  countcommentsjsonconvertedrows: any = [];


  countusermessagestable: any = [];
  countusermessagesjsonconvertedrows: any = [];
  //

  //default info on whether u follow the person or he follows u or both
  followertext: any = "";
  followstatus: any = "follow";
  followbuttoncolor: any = "dark";

  /**.this will contain the list of users who we follow and we'd check if this user is also part
   * so that we can change the followstatus in the button to "following" as well as the button color
   */
  followingtablejsonconvertedrows: any[];
  followingtable: any = [];

  /**this will contain the list of users who follow us and we'd check if this user is also part 
   * so that we can change the followertext to "follows you"
  */
  followerstablejsonconvertedrows: any[];
  followerstable: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public app: App,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, private postPvdr: PostProvider,
    private photoViewer: PhotoViewer,
    public mymodulevariables: ModulevariablesProvider) {
    this.server = postPvdr.server; /*********************b */
    //retriving the user id 
    this.user_id_retrieved = (localStorage.getItem('storeduserid'));
    this.tabs = ["Likes", "Media"];  //this is the name or heading on top of the segment bar indicator
  }



  /**********************************swipeable tabs********************************* */
  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("tabsindicators");
  }

  selectTab(index) {
    // i changed the value to 10 as the number of tabs increased to allow all tab headings to show
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (5 * index) + '%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // this condition is to avoid passing to incorrect index
    if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
    }
  }

  animateIndicator($event) {
    if (this.SwipedTabsIndicator) {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1))) + '%,0,0)'
    }
  }
  /**********************************swipeable tabs********************************* */

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter ProfilePage');
    this.loadfollowing();
    this.loadfollowers();
    this.loaduserdetails();
    this.loaduserstats();
  }



  //loading those who u follow so that we can check if this user is part and change the text in the follow button to following
  loadfollowing() {
    this.followingtablejsonconvertedrows = [];
    this.followingtable = [];

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



  //loading those who follow us so that we can check if this user is part and change the followtext to "follows you"
  loadfollowers() {
    this.followerstablejsonconvertedrows = [];
    this.followerstable = [];

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



  //load all logged in or signued up user's details
  loaduserdetails() {
    this.jsonconvertedrows = [];
    this.userdetailstablerows = [];

    //variables and function to be used in php
    let body = {
      mydbfunc: 'displayloggedinorsignedupuserdetails',
      globaluseridDB: this.user_id_retrieved
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
          this.username = this.userdetailstablerows[key].username_fetched;
          this.userpassword = this.userdetailstablerows[key].userpassword_fetched;
          this.about = this.userdetailstablerows[key].about_fetched;
          this.datejoined = this.userdetailstablerows[key].date_joined_fetched;
          this.website = this.userdetailstablerows[key].user_website_fetched;
          this.email = this.userdetailstablerows[key].user_email_fetched;
          this.phonenumber = this.userdetailstablerows[key].user_phonenumber_fetched;

          //if profile pic is null 
          if (this.userdetailstablerows[key].profile_pic_fetched == null) {
            this.userdetailstablerows[key].profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";  //this directory is in htdocs/campfila/defaultprofilepic folder
          }

          this.profilepic = this.server + this.userdetailstablerows[key].profile_pic_fetched;
        }
        //console.log('logged in user profilepic: ',this.profilepic);
      }


      /**if about, or website or email or phonenumber fields are empty we dont want to display the title and an empty value in the html page
      * eg. website : 
      * we want to hide those fields which have empty values and use ngIf to display the ones which don't have empty values
      */
      if ((this.about == "" ) || (this.about == null)) {
        this.about = "empty"
      }

      if ((this.website == "" ) || (this.website == null)) {
        this.website = "empty"
      }

      if ((this.email == "" ) || (this.email == null)) {
        this.email = "empty"
      }

      if ((this.phonenumber == "" ) || (this.phonenumber == null)) {
        this.phonenumber = "empty"
      }


      //checking for people who we follow to see if the user is part
      for (var followingtableloop = 0; followingtableloop < this.followingtable.length; followingtableloop++) { // looping through the following list
        if (this.user_id_retrieved == this.followingtable[followingtableloop].following_userid_fetched) {  //if an id in the following list matches with our user's id
          this.followstatus = "following" //assign "following" to the button to indicate that you follow the person
          this.followbuttoncolor = "primary" //assign "primary" to indicate that u follow the person
        }
      }

      //checking for people who follow us to see if the user is part
      for (var followerstableloop = 0; followerstableloop < this.followerstable.length; followerstableloop++) { // looping through the followers list
        if (this.user_id_retrieved == this.followerstable[followerstableloop].follower_userid_fetched) {  //if an id in the following list matches with our user's id
          this.followertext = "follows you" //assign "follows you" to indicate that the person follows you
        }
      }



    });
  }



  //loaduser stats
  loaduserstats() {
    this.countuserfollowing();
    this.countuserfollowers();
    this.countuserlikes();
    this.countusercomments();
    this.countusermessages();
  }

  //retrieve number of user's following
  countuserfollowing() {
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
        this.followingcount = this.countfollowingtable[key].following_rows_fetched;
      }

    });
  }

  //retrieve number of user's followers
  countuserfollowers() {
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
        this.followerscount = this.countfollowerstable[key].followers_rows_fetched;
      }

    });
  }

  //retrieve number of user's likes
  countuserlikes() {
    let body = {
      mydbfunc: 'countlikes',
      globaluseridDB: this.user_id_retrieved
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.countlikesjsonconvertedrows = JSON.parse(data);

      for (let count of this.countlikesjsonconvertedrows) {
        this.countlikestable.push(count);
        console.log(this.countlikestable);
      }

      for (var key in this.countlikestable) {
        console.log(this.countlikestable[key].likes_rows_fetched);
        this.likescount = this.countlikestable[key].likes_rows_fetched;
      }

    });
  }

  //retrieve number of user's comments
  countusercomments() {
    let body = {
      mydbfunc: 'countcomments',
      globaluseridDB: this.user_id_retrieved
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.countcommentsjsonconvertedrows = JSON.parse(data);

      for (let count of this.countcommentsjsonconvertedrows) {
        this.countcommentstable.push(count);
        console.log(this.countcommentstable);
      }

      for (var key in this.countcommentstable) {
        console.log(this.countcommentstable[key].comments_rows_fetched);
        this.commentscount = this.countcommentstable[key].comments_rows_fetched;
      }

    });
  }


  //retrieve number of user's posted messages
  countusermessages() {
    let body = {
      mydbfunc: 'countusermessages',
      globaluseridDB: this.user_id_retrieved
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.countusermessagesjsonconvertedrows = JSON.parse(data);

      for (let count of this.countusermessagesjsonconvertedrows) {
        this.countusermessagestable.push(count);
        console.log(this.countusermessagestable);
      }

      for (var key in this.countusermessagestable) {
        console.log(this.countusermessagestable[key].usermessages_rows_fetched);
        this.usermessagescount = this.countusermessagestable[key].usermessages_rows_fetched;
      }

    });
  }


  /**user stats navigations */
  //my messages stats navigation
  mymessages() {
    localStorage.setItem('storeduserid', this.user_id_retrieved);
    this.navCtrl.push('Mymessages2Page');
  }

  //following stats navigation
  following() {
    localStorage.setItem('storeduserid', this.user_id_retrieved);
    this.navCtrl.push('Following2Page');
  }

  //followers stats navigation
  followers() {
    localStorage.setItem('storeduserid', this.user_id_retrieved);
    this.navCtrl.push('Followers2Page');
  }

  //open dm chat for a particular user
  opendmchat() {

    /**we send the id of the user whose chat we've selected to the dm chat page
     * to load messages between that user and the logged in user
     */

    localStorage.setItem('storeddmreceipientid', this.user_id_retrieved);
    this.navCtrl.push('DmcontactmessagesPage');
  }


  //follow or unfollow button 
  followORunfollow() {

    if (this.followbuttoncolor == 'dark') {
      this.followbuttoncolor = 'primary' //meaning logged in user is following selected user
      this.followstatus = "following";
      this.followuser();
      this.sendfollownotification();  //inset into notifications table to allow selected id who is being followed to be notified in his notifications page
      this.followingcount ++;
    }

    else {
      this.followbuttoncolor = 'dark'; //meaning logged in user has unfollowed selected user
      this.followstatus = "follow";
      this.unfollowuser();
      this.deletefollownotification(); //delete from notification table so that user does not receive notification that he's been followed
      this.followingcount --;
    }

  }


  //follow user: insert logged in user_id and id of the person u want to follow into friendship table
  followuser() {
    let body = {
      logged_in_useridDB: this.mymodulevariables.globaluserid, //logged in user's id
      followed_useridDB: this.user_id_retrieved, //followed person's id 
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
      receiveridDB: this.user_id_retrieved, //followed person's id 
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
      followed_useridDB: this.user_id_retrieved, //followed person's id 
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
      receiveridDB: this.user_id_retrieved, //followed person's id 
      mydbfunc: 'deletefollownotification'
    }

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //view profile picture in full
  viewprofileimage() {
    this.photoViewer.show(this.profilepic);
  }

  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    console.log("Refresh started");

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.loadfollowing();
      this.loadfollowers();
      this.loaduserdetails();
      this.loaduserstats();
      event.complete();
    }, 500); //duration of refresh
  }







   /*****************************************slides ********************************** */
  /**we want to use the same height for both slides..ie .
   * the longest slide of the two
   * else an empty space is left for the slide whihc is short and u cant 
   * swipe on that space to move to the other slide
   */
  slideDidChange(): void {
    this.updateIndicatorPosition();

    try {
      this.slidesMoving = false;
      let slideIndex: number = this.slides.getActiveIndex();
      let currentSlide: Element = this.slides._slides[slideIndex];
      this.slidesHeight = currentSlide.clientHeight;

      // //if the height of the slide is greater the longest height
      // if (this.slidesHeight > this.longestslideheight) {
      //   //we maintain the slide height and update the longest height
      //   this.longestslideheight = this.slidesHeight;
      // }
      // else {
      //   //we set the new longest height to the slideheight to be used in the htmml
      //   this.slidesHeight = this.longestslideheight;
      // }


      console.log('index slide', slideIndex)
      console.log('current slide', currentSlide)
      console.log('height of slide', this.slidesHeight);
      console.log('longest height', this.longestslideheight)

    } catch (e) {
      console.log("end of slide")
    }
  }

  slideWillChange(): void {
    this.slidesMoving = true;
    this.updateIndicatorPosition();
  }

  // slidesDidLoad() {
  //   this.slidesMoving = false;
  //   let slideIndex: number = this.slides.getActiveIndex();
  //   let currentSlide: Element = this.slides._slides[slideIndex];
  //   this.slidesHeight = currentSlide.clientHeight;
  //   this.longestslideheight = this.slidesHeight;
  //   console.log('index slide', slideIndex)
  //   console.log('current slide', currentSlide)
  //   console.log('height of slide', this.slidesHeight);
  //   console.log("slideheight when page is loaded", this.longestslideheight)
  // }
  /*****************************************slides ********************************** */


}
