import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //splashscreen settings
  splash = this.mymodulevariables.activatesplash;

  //our variables binded to the input fields
  usernameinput: any = '';
  passwordinput: any = '';
  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  searchresults: any = []; //this array will receive the rows from the from the converted jsonformat


  //fetches the date that the student should complete or leave the school
  dateleavingfetched: any;

  /**when a user enters the wrong credentials we want to be able to specify if the username
   * was wrong or it was the password whichc was wrong so we'd collect his usernameinput and passweordinput
   * and compare with the variables below whcihc were fetchd from the database to see which one
   * was wrong
   */
  usernamefetched: any;
  passwordfetched: any;

  /**loader used when email is being sent */
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private postPvdr: PostProvider,
    private emailComposer: EmailComposer,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public mymodulevariables: ModulevariablesProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    /*settings for our splash screen 
    we set our splashscreen to last for 6seconds*/
    setTimeout(() => {
      this.splash = false;
    }, 6000);
  }

  //this function displays the loading event
  Loading1() {
    const loader = this.loadingCtrl.create({
      content: "Logging in...",
      duration: 2000
    });
    loader.present();
  }

  //login button
  login() {

    //first clear all data in searchresults to perform a fresh search
    this.jsonconvertedrows = [];
    this.searchresults = []; //or
    //this.searchresults.length =0;
    this.mymodulevariables.globaluserid = null //ensuring there's no data in globaluserid 

    //clear details fetched from the database as well
    //this.usernamefetched = null;
    //this.passwordfetched = null;

    //removing white spaces in text entered

    // console.log(this.usernameinput);
    // console.log(this.passwordinput);

    try {
      this.usernameinput = this.usernameinput.toString().trim();
      this.passwordinput = this.passwordinput.toString().trim();
    } catch (e) {
      console.log(e)
    }

    //if fields are empty
    if (!(this.usernameinput) || !(this.passwordinput)) {
      this.Toastvalidation("Please provide all details!")
      // this.loader.dismiss(); //cancel the please wait loader after the error toast has been shown
    }

    //if fields are provided we now have to verify from db if account exists
    else {

      //we start to display the loading circle "please wait" as we perform the func to login
      this.loading();

      //api connections
      let body = {
        usernameDB: this.usernameinput,
        passwordDB: this.passwordinput,
        mydbfunc: 'displayallaccounts'
      };

      //posting our data to the api 
      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

        //converting data results from db into a usable format
        this.jsonconvertedrows = JSON.parse(data);
        console.log('logged in user details: ', data);

        //transferring the data from converted array into our searchresults array
        for (let count of this.jsonconvertedrows) {
          this.searchresults.push(count);
        }

        console.log("login details: ", this.searchresults);

        //if user is deleted


        //now retrieving the user_id from the searchresults array to be used globally or transfered to next page
        //NB: use this method to retrieve any item from the searchresults array
        for (var key in this.searchresults) {
          if (this.searchresults.hasOwnProperty(key)) {
            this.mymodulevariables.globaluserid = this.searchresults[key].user_id_fetched;
            this.usernamefetched = this.searchresults[key].username_fetched;
            this.passwordfetched = this.searchresults[key].userpassword_fetched;
            this.dateleavingfetched = this.searchresults[key].date_leaving_fetched;
          }
        }

        console.log("student's leaving date: ", this.dateleavingfetched);

        /**verifying the user's input with the username and password ftched 
         * if anyone one of those details is wrong we prompt the user the exact one whihc is incorrect
         * if both are wrong we prompt the user that the account doesnt exist
         * if both are correct we allow the user to log in 
         */


        /**we start with when both credentials cannot be found */
        if (this.usernameinput != this.usernamefetched && this.passwordinput != this.passwordfetched) {
          this.Toastvalidation("Account doesn't exist")
          this.loader.dismiss(); //cancel the please wait loader after the error toast has been shown
        }

        /**now for the case when either is correct */
        else {

          /** verifiying if the username existss ...if it does then we proceed to the
          * next step if the password too exists.
          * we use the necessary messages where each of the steps turns out to be false
          */
          if (this.usernameinput == this.usernamefetched) {

            /**user has passed first check so we move to next check whihc is password */
            if (this.passwordinput == this.passwordfetched) {

              /**user has password second test too so we can proceed to login */
              //this.Toastvalidation("success!")
              if (this.mymodulevariables.globaluserid) {  //ie. if globaluserid was fetched it means an account exists hence we can proceed to login
                this.Loading1();
                this.loader.dismiss(); //cancel the please wait loader after the logging it loader displays
                setTimeout(() => {
                  this.mymodulevariables.activatesplash = false; //deactivate splash for the home page since we want to enter directly without loadin splash agaain
                  this.navCtrl.setRoot('TabsholderPage');
                  this.storecredentials();
                }, 2500);

                //now load our welcome toast message who successfully logged in user
                //this.welcometoast("welcome " + this.usernameinput);
                this.mymodulevariables.globalusername = this.usernameinput //we need the username to be used across all the pages for db queries 
              }

            }

            else { //if user fails second check we prompt him of incorrect password
              this.Toastvalidation("password is incorrect")
              this.passwordfetched = null;
              this.loader.dismiss(); //cancel the please wait loader after the error toast has been shown
            }

          }

          else { //right away prompt user that the username is incorrect
            this.Toastvalidation("username is incorrect")
            this.usernamefetched = null;
            this.loader.dismiss(); //cancel the please wait loader after the error toast has been shown
          }


        }
      }, err => {  //log php connection error
        console.log(err);
        //this.Toastvalidation("no internet connection");
        //this.Toastvalidation(err);
        //this.connectionerrorAlert(err);
        this.connectionerrorAlert("Please check your internet connection");
        this.loader.dismiss() //cancel the please wait loader after the error has been dispalyed
      }
      );
    }

  }

  //sign up text
  openSignupPage() {
    this.navCtrl.push('SignupPage');
  }

  //toast for validation
  Toastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  //toast for welcoming user after successful login
  welcometoast(msg) {
    setTimeout(() => {
      const toast = this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }, 3000);
  }

  //storing credentials so that user doesnt have to login again when app opens ie. if user didnt logout upon exiting app
  storecredentials() {
    this.mymodulevariables.mvusername = this.usernameinput;
    this.mymodulevariables.mvpassword = this.passwordinput;
    window.localStorage.setItem("usernamecredential", this.mymodulevariables.mvusername);
    window.localStorage.setItem("passwordcredential", this.mymodulevariables.mvpassword);
  }

  //this function displays the loading event
  loading() {
    this.loader = this.loadingCtrl.create({
      content: "please wait...",
      //duration: 2000 ...when no duration is set it loads forever until loader.dismiss() is called
    });
    this.loader.present();
  }

  //reset password page navigation
  resetpassword() {
    this.navCtrl.push('ResetpasswordPage');
  }


  //internet connection error
  connectionerrorAlert(msg) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  //contact us email
  help() {
    let email = {
      to: 'doncashes43@gmail.com',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: 'CamFila Help',
      body: '',
      isHtml: true
    }
    this.emailComposer.open(email);
  }

  trending() {
    this.navCtrl.push('TrendingPage');
    // this.navCtrl.push('AddgroupmembersPage');
  }


}
