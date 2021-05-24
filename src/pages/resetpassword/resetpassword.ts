import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  /**ref number input binded to variable */
  refnumberinput: any;

  /**this wil let us know if there are any results in the db when the user enteres the refnumber */
  searchresults: number = 0;

  /**details of user containing ref number entered fetched from the db */
  jsonconvertedrows: any = [];
  userdetailstable: any = [];

  /**this weill recevie the indivdual user details after the search from the db*/
  refnumber_fetched: any = null;
  username_fetched: any = null;
  password_fetched: any = null;
  email_fetched: any = null;

  /**loader used when email is being sent */
  loader: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public mymodulevariables: ModulevariablesProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }


  //reset password
  resetpassword() {
    if (!(this.refnumberinput)) {
      this.Toastvalidation("Please provide a reference number");
    }

    else {
      this.loading(); //show please wait loader as backend functions are being run

      //verify if reference number entered exists in the database
      this.jsonconvertedrows = [];
      this.userdetailstable = [];
      this.searchresults = 0;

      let body = {
        refnumberDB: this.refnumberinput,
        mydbfunc: 'searchrefnumber'
      }

      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

        this.jsonconvertedrows = JSON.parse(data);

        for (let count of this.jsonconvertedrows) {
          this.userdetailstable.push(count);
        }

        console.log("user details: ", this.userdetailstable);

        //assigning user details from the given ref number
        for (var key in this.userdetailstable) {
          this.searchresults = this.searchresults + 1;
          this.refnumber_fetched = this.userdetailstable[key].refnumber_fetched
          this.username_fetched = this.userdetailstable[key].username_fetched
          this.password_fetched = this.userdetailstable[key].userpassword_fetched
          this.email_fetched = this.userdetailstable[key].user_email_fetched
        }

        //if there's nothing in the table fetched
        if (this.searchresults == 0) {
          this.Toastvalidation("Reference number is incorrect or does not exist")
          this.loader.dismiss(); //cancel please wait loader
        }

        //if there's a record found we proceed to send the message to the email of that ref number
        else {

          //we start to display the loading circle "please wait" as we perform the func to send the mail
          // this.loading();

          //preparing our message structure for email sending
          let receiver_email = this.email_fetched;
          let subject = "Account information";
          let message = "Please log in with the credentials given" + "\n" +
            "Username: " + this.username_fetched + "\n" +
            "Pasword: " + this.password_fetched + "\n"
          //console.log(message);

          //now the actual email sending
          let body = {
            receiver_emailDB: receiver_email,
            subjectDB: subject,
            messageDB: message,
            mydbfunc: 'sendemail'
          }

          this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
            //send details to be used for posting email.
            console.log(data);

            this.msgsentstatusAlert(data);

            //now we cancel the loader
            this.loader.dismiss();

            //finally we clear our text input
            this.refnumberinput = "";

            // if (data == "failed!") {
            //   this.connectionerrorAlert("Failed to send email. Check your internet connection")

            //   //now we cancel the loader
            //   this.loader.dismiss();

            //   //finally we clear our text input
            //   this.refnumberinput = "";
            // }

            // else {
            //   this.sentmailsuccessalert("Please check your email, " + receiver_email + " to reset your credentials")

            //   //now we cancel the loader
            //   this.loader.dismiss();

            //   //finally we clear our text input
            //   this.refnumberinput = "";
            // }
            
          }, err => {
            this.msgsentstatusAlert(err);
            this.loader.dismiss(); //cancel please wait loader
          });

        }

        this.username_fetched = null
        this.password_fetched = null
        this.refnumber_fetched = null
        this.email_fetched = null
      }, err => {
        console.log(err);
        this.msgsentstatusAlert("Please check internet connection");
        this.loader.dismiss(); //cancel please wait loader
      });

    }
  }


  //toast validation
  Toastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  // //internet connection error
  // connectionerrorAlert(msg) {
  //   const alert = this.alertCtrl.create({
  //     title: 'Error!',
  //     subTitle: msg,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  // //success sent mmail
  // sentmailsuccessalert(msg) {
  //   const alert = this.alertCtrl.create({
  //     title: 'Success',
  //     subTitle: msg,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  //prompt alert to display message sent status...ie whether mail has been sent or not
  msgsentstatusAlert(msg) {
    const alert = this.alertCtrl.create({
      //title: 'Prompt',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  //this function displays the loading event
  loading() {
    this.loader = this.loadingCtrl.create({
      content: "please wait...",
      //duration: 2000 ...when no duration is set it loads forever until loader.dismiss() is called
    });
    this.loader.present();
  }

}



