import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController, ModalController, Slides } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  @ViewChild(Slides) slides: Slides //slides

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;  //swipeable tabs

  SwipedTabsIndicator: any = null;
  tabs: any = [];
  //the above is for slides and swipeable tabs

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

  //for our slides
  public slidesHeight: string | number;
  public slidesMoving: boolean = true;
  longestslideheight: number = 0;  //we initially set our longest slide height to 0..it will be updated when the slides change since the height is calculated when we move to a new slide

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public app: App,
    public modalCtrl: ModalController,
    private photoViewer: PhotoViewer,
    public loadingCtrl: LoadingController, private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider) {
    this.server = postPvdr.server; /*********************b */
    this.tabs = ["Favorites", "Media"];  //this is the name or heading on top of the segment bar indicator
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter ProfilePage');
    this.loaduserdetails();
    this.loaduserstats();

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

          if (this.mymodulevariables.profilepic != null){
            this.profilepic = this.mymodulevariables.profilepic
          }
          else{
            this.profilepic = this.server + this.userdetailstablerows[key].profile_pic_fetched;
          }

          
        }
        //console.log('logged in user profilepic: ',this.profilepic);
      }

      /**if about, or website or email or phonenumber fields are empty we dont want to display the title and an empty value in the html page
       * eg. website : 
       * we want to hide those fields which have empty values and use ngIf to display the ones which don't have empty values
       */
      if (this.about == "") {
        this.about = "empty"
      }

      if (this.website == "") {
        this.website = "empty"
      }

      if (this.email == "") {
        this.email = "empty"
      }

      if (this.phonenumber == "") {
        this.phonenumber = "empty"
      }

      // console.log(this.username);
      // console.log(this.profilepic);
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
      globaluseridDB: this.mymodulevariables.globaluserid
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
      globaluseridDB: this.mymodulevariables.globaluserid
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
      globaluseridDB: this.mymodulevariables.globaluserid
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
      globaluseridDB: this.mymodulevariables.globaluserid
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
      globaluseridDB: this.mymodulevariables.globaluserid
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
    this.navCtrl.push('MymessagesPage');
  }

  //following stats navigation
  following() {
    this.navCtrl.push('FollowingPage');
  }

  //followers stats navigation
  followers() {
    this.navCtrl.push('FollowersPage');
  }


  //edit profile
  editprofile() {
    this.navCtrl.push('EditprofilePage');
  }


  /************************logout functions ***********************/
  //show alert before logout
  showalert() {
    this.showConfirm();
  }


  //confirmation alert function
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Logout?',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.Loading1();
            this.logout();
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


  //this function displays the loading event
  Loading1() {
    const loader = this.loadingCtrl.create({
      content: "Logging out...",
      duration: 2000
    });
    loader.present();
  }



  //logout function
  logout() {
    setTimeout(() => {
      this.mymodulevariables.activatesplash = false; //deactive splash to prevent it from loading when we're moving to the login page after logging out 

      //before we finally log out we need to clear the globaluserid variables else they'd be used for another login of a different user
      this.mymodulevariables.globaluserid = null;
      this.mymodulevariables.globalusername = null;

      //clear stored credentials in login page
      window.localStorage.removeItem("usernamecredential");
      window.localStorage.removeItem("passwordcredential");
      window.localStorage.removeItem("userIDcredential");

      //this code pops to the root page without showing the tab bars
      let newRootNav = <NavController>this.app.getRootNavById('n4');
      newRootNav.setRoot('LoginPage');

      // //u can also use this code to pop to the root page without showing the tab bars
      // this.app.getRootNav().setRoot('LoginPage'); 
    }, 2500);
  }
  /************************logout functions ***********************/


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
      this.loaduserdetails();
      this.loaduserstats();
      event.complete();
    }, 500); //duration of refresh
  }









  //slides 
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

}
