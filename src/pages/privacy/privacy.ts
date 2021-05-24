import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, AlertController, App, LoadingController, } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  //this wil receive the profile pic from the previous page to be displayed here
  profilepic_retrieved: any;

  //password input binded to our form
  passwordinput: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mymodulevariables: ModulevariablesProvider,
    public alertCtrl: AlertController, public app: App,
    private photoViewer: PhotoViewer,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider,
    public toastCtrl: ToastController) {
    //retriving the user id 
    this.profilepic_retrieved = (localStorage.getItem('storedprofilepic'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPage');
  }


  //update password
  updatepassword() {
    console.log("password entered: ", this.passwordinput);

    //remove white spaces from password entered
    try {
      this.passwordinput = this.passwordinput.toString().trim()
    } catch (e) {
      console.log(e);
    }

    //prompt user if no password is entered else proceeed to update
    if (!(this.passwordinput)) {
      this.toastvalidation("enter a password");
    }
    else {
      //update password
      let body = {
        globaluseridDB: this.mymodulevariables.globaluserid,
        newpasswordDB: this.passwordinput,
        mydbfunc: 'updateaccountpassword'
      }

      this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
        this.passwordupdatedtoast("password updated!")

        //finally we move away from the page after making updates to the details
        this.viewCtrl.dismiss();

      });

    }
  }

  //toast for validation
  toastvalidation(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  //password updated toast
  passwordupdatedtoast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'middle',
      cssClass: "passwordtoast"
    });
    toast.present();
  }


  //view profile picture in full
  viewprofileimage() {
    this.photoViewer.show(this.profilepic_retrieved);
  }


  /*******************delete account****************** */

  //show alert before delete
  showalert() {
    this.showConfirm();
  }

  //confirmation alert function
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Delete account?',
      message: 'Are you sure you want to continue? All your data will be lost',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.Loading1();
            this.deleteaccount(); //db query to delete account
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
      content: "Deleting account...",
      duration: 2000
    });
    loader.present();
  }


  deleteaccount() {

    //delete account
    let body = {
      mydbfunc: 'deleteuseraccount',
      globaluserid: this.mymodulevariables.globaluserid
    }

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      //finally clear all cache and return to login page
      setTimeout(() => {

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



    });

  }

}
