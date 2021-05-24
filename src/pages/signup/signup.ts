import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  //our variables binded to the input fields
  usernameinput: any;
  passwordinput: any;
  confirmpasswordinput: any;
  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format
  searchresults: any = []; //this array will receive the rows from the from the converted jsonformat

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public mymodulevariables: ModulevariablesProvider, public toastCtrl: ToastController, private postPvdr: PostProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  //move to the next signup page
  signup2() {
    //removing white spaces in text entered
    try {
      this.usernameinput = this.usernameinput.toString().trim();
      this.passwordinput = this.passwordinput.toString().trim()
    } catch (e) {
      console.log(e)
    }

    //if passwords dont match
    if ((this.passwordinput) != (this.confirmpasswordinput)) {
      this.Toastvalidation("Passwords do not match!")
    }

    //or else if fields are empty
    else if (!(this.usernameinput) || !(this.passwordinput) || !(this.confirmpasswordinput)) {
      this.Toastvalidation("Please provide all details!")
    }

    //or else if username = password
    else if ((this.usernameinput) == (this.passwordinput)) {
      this.Toastvalidation("Username and password should be different!")
    }

    //if user fufils first we finally have to check database to ensure data doesnt exist before signing up
    else {
      //first clear all data in searchresults to perform a fresh search
      this.searchresults = []; //or
      //this.searchresults.length =0;
      this.mymodulevariables.globaluserid = null //ensuring there's no data in globaluserid 


      //api connections for verifying before moving to next page  
      let body = {
        usernameDB: this.usernameinput,
        passwordDB: this.passwordinput,
        mydbfunc: 'displayallaccounts1'
      };

      //posting our data to the api to perform db search
      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

        //converting data results from db into a usable format
        this.jsonconvertedrows = JSON.parse(data);

        //transferring the data from converted array into our searchresults array
        for (let count of this.jsonconvertedrows) {
          this.searchresults.push(count);
        }


        /**we obtained our search results into the searchresults table
         * to know if there are any results or matching details we put the userid of the searchresults
         * into the globaluserid variable..if the globaluserid variable is filled with a user id value
         * it means an account exists..if the globaluserid variable is still null it means no user id value
         * was assigned to it since the results didnt produce any matching results **/
        for (var key in this.searchresults) {
          if (this.searchresults.hasOwnProperty(key)) {
            this.mymodulevariables.globaluserid = this.searchresults[key].user_id_fetched
          }
        }

        /** we can therefore use the value inside globaluserid to tell if an account exists or not hence..*/
        if (this.mymodulevariables.globaluserid) { //that is if a value was assigned then it means an account exists already
          this.Toastvalidation("Username or password exists");
          //now we reset the globaluserid back to null to ensure previous data doesnt exist in it
          this.mymodulevariables.globaluserid = null;
        }

        else { //if globaluserid still remained null or undefined it means no userid was fetched into it since the search didnt produce any results..hence user can proceed to the next page
          //variables to be sent to next signup page for db insertions
          this.mymodulevariables.mvusername = this.usernameinput;
          this.mymodulevariables.mvpassword = this.passwordinput;
          this.navCtrl.push('Signup2Page');
        }
      }, err =>{  //log php connection error
        console.log(err);
        this.Toastvalidation("no internet connection");
      });


    }
  }

  Toastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
