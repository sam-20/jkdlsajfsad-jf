import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables';

@IonicPage()
@Component({
  selector: 'page-dmsendpicturepopup',
  templateUrl: 'dmsendpicturepopup.html',
})
export class DmsendpicturepopupPage {

  picture_retrieved: any; //this is the image that will be displayed on this page
  cameraData_retrieved: any; //this is the image that will be saved to the database
  receipient_id_retrieved: any; //we'd save the message here with our id and the person we're chatting with

  //this binds the send message textarea property
  senddmmessagetextareainput: any;

  /**loader used when image is being sent */
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
  ) {
    this.picture_retrieved = localStorage.getItem('storedimagefordisplay');
    this.cameraData_retrieved = localStorage.getItem('storedcameradata');
    this.receipient_id_retrieved = localStorage.getItem('storedreceipientid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DmsendpicturepopupPage');
  }


  senddmmessage() {
    const confirm = this.alertCtrl.create({
      title: '',
      message: 'Send message?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.sendingloader(); //show sending... loader as backend functions are being run


            //send image w/o comment to database
            this.senddmmessage2();
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


  //send dm message
  senddmmessage2() {
    console.log(this.senddmmessagetextareainput);

    //now we insert our dm message into the database
    /**note that after inserting we'd need to update the lastdmmessage db table with the sent message id  however we can only retrieve that id after we've sent the message
     * so in this 'senddmmessage' function..after inserting the dm mesage we also retrieve the id and use it to update the lastdmmessage id value in the lastdmmessage db table
     */
    let body = {
      mydbfunc: 'senddmmessage_withpicture',
      loggedinuseridDB: this.mymodulevariables.globaluserid,
      receipientuseridDB: this.receipient_id_retrieved,
      dmmessageDB: this.senddmmessagetextareainput,
      dmmessage_mediaDB: this.cameraData_retrieved
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.loader.dismiss();

      //finally we move away from the page after sending the message with the picture
      this.viewCtrl.dismiss();
    });
  }


  //this function displays the loading event
  sendingloader() {
    this.loader = this.loadingCtrl.create({
      content: "sending...",
      //duration: 2000 ...when no duration is set it loads forever until loader.dismiss() is called
    });
    this.loader.present();
  }

}
