import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-mymessages',
  templateUrl: 'mymessages.html',
})
export class MymessagesPage {
  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format 
  messagetablerows: any = []; //this array will receive the rows from the from the converted jsonformat

  server: string; /******************************a */

  profilepic: any; //will store profile pic of user that we'd use in the html

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    private photoViewer: PhotoViewer,
    public alertCtrl: AlertController,
    public mymodulevariables: ModulevariablesProvider) {
    this.server = postPvdr.server; /*********************b */
  }

  // ionViewDidLoad() {
  //   this.messagetablerows =[];  //we load whatever is in our message array whose data has already been converted into usable format
  //   this.loadallusermessages(); //then we call the function to load all the messages
  // }


  ionViewWillEnter() {
    this.messagetablerows = [];  //we load whatever is in our message array whose data has already been converted into usable format
    this.loadallusermessages(); //then we call the function to load all the messages
  }

  // //codes here are executed automatically as the user is in the current page
  // //useful auto update of data in the page 
  // ionViewDidEnter(){
  //   this.messagetablerows =[];  //we load whatever is in our message array whose data has already been converted into usable format
  //   this.loadallusermessages(); //then we call the function to load all the messages
  // }

  //load all messages
  loadallusermessages() {

    //stuff we want to post to our database
    let body = {
      globaluseridDB: this.mymodulevariables.globaluserid,  //used for reading from db for a particular user
      mydbfunc: 'displayspecificusermessages' //function  to be used in php file
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      /***data inside the .subscribe contains our records 
       * but we cant use it in its original format 
       * so we convert into a usable format 
       * and move it into our array which is going to store converted data ie.**/
      this.jsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array 
       * into our messagetablerows for use in the html**/
      for (let count of this.jsonconvertedrows) {
        this.messagetablerows.push(count);
      }

      /**we add another property called pincolor to messagetablerows and assign default colors to it for it to look like
       * {message_id_fetched: "64", message_fetched: "look at me", pincolor:"dark"}
       * so that we can call it in the html like {{count.pincolor}}**/
      this.messagetablerows.forEach(function (element) { element.likecolor = "dark"; });
      this.messagetablerows.forEach(function (element) { element.commentcolor = "dark"; });

      //retrieving just the profile pic which will remain constant throughtout the messages
      for (var key in this.messagetablerows) {
        if (this.messagetablerows.hasOwnProperty(key)) {
          this.profilepic = this.server + this.messagetablerows[key].user_profile_pic_fetched;
        }

        //but if our profile pic from the database is null we assign a default profile pic to the row
        if (this.messagetablerows[key].user_profile_pic_fetched == null) {
          this.messagetablerows[key].user_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";  //this directory is in htdocs/campfila/defaultprofilepic folder
          this.profilepic = this.server + this.messagetablerows[key].user_profile_pic_fetched;
        }
      }
      console.log(this.profilepic);


      /**now by default our likes icon is dark..however we want to differentiate liked msgs from others by changing the color of the icon
       * hence when the likes for the particular msg is more than 0 we change the color of the comment icon to indicate someone has commented on the message
       */
      for (var key in this.messagetablerows) {
        if ((this.messagetablerows[key].likes_fetched) > 0) {
          this.messagetablerows[key].likecolor = "danger";
        }
      }


      /**now by default our comments icon is dark..however we want to differentiate commented msgs from others by changing the color of the icon
       * hence when the comments for the particular msg is more than 0 we change the color of the comment icon to indicate someone has commented on the message
       */
      for (var key in this.messagetablerows) {
        if ((this.messagetablerows[key].comments_fetched) > 0) {
          this.messagetablerows[key].commentcolor = "secondary";
        }
      }
    });
  }


  //deletemessage functions
  //show alert before user deletes message
  showalert(id) {
    this.showConfirm(id);
  }

  //confirmation for deleting message
  showConfirm(id) {
    const confirm = this.alertCtrl.create({
      title: 'Delete message?',
      message: 'Are you sure you want to delete message?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deletemessage(id); //if yes proceed to deletemessage function
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

  //actual deletion of message
  deletemessage(id) {  //id is the message id we fetched from the html page
    let body = {
      messageidDB: id,
      mydbfunc: 'deletemessage'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //after deletion we perform a manual refresh
      this.messagetablerows = [];
      this.loadallusermessages();
    });

  }

  //pin message
  pinmessage(count, color) {
    console.log(color);
    console.log(color.pincolor)
    console.log(count);
    console.log(count.message_fetched);

    if (color.pincolor == 'primary') {
      color.pincolor = 'dark'
    }

    else {
      color.pincolor = 'primary'
    }

  }

  //view selected message image in full
  viewimage(count) {
    this.photoViewer.show(this.server + count.message_media_fetched, count.message_fetched);
    console.log("with server", this.server + count.message_media_fetched);
  }

  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.messagetablerows = [];  //we load whatever is in our message array whose data has already been converted into usable format
    this.loadallusermessages(); //then we call the function to load all the messages

    setTimeout(() => {
      //operation to perform when refresh has completed
      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh
  }

}
