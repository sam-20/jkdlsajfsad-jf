import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'app-mymessagemedia',
  templateUrl: 'mymessagemedia.html'
})
export class MymessagemediaComponent {

  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format 
  messagetablerows: any = []; //this array will receive the rows from the from the converted jsonformat

  messagetablerows2: any = [];  //this array will reveive info of only messages which have message media to avoid producing unwanted spaces between ion-item loops for messages without media 


  /**virtual table to store messages that will keep refreshing automoatically
   * if theres new messages after each refresh then we'd add that message to the original messageteable rows to be displaayed
   * in the html
   */
  virtualjsonconvertedrows: any = [];
  virtualmessagetablerows: any = [];
  virtualmessagetablerows2: any = [];


  countmessagemedia: number = 0; //this allows us to know if there a message media or not so that we can assign a default pic for logged in users whod dont have message media

  server: string; /******************************a */

  profilepic: any; //will store profile pic of user that we'd use in the html

  private timeoutId: number; //auto refresh 1

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    private photoViewer: PhotoViewer,
    public alertCtrl: AlertController,
    public mymodulevariables: ModulevariablesProvider) {
    this.server = postPvdr.server; /*********************b */
    this.ionViewWillEnter();
    this.ionViewDidEnter();
    this.startAutoRefresh();
    this.refreshcode();
    this.stopRefresh();
    this.ionViewDidLeave();
  }

  ionViewDidEnter() {
    this.startAutoRefresh();  //auto refresh 2 
  }

  private startAutoRefresh() {  //auto refresh 3
    this.refreshcode();
    this.timeoutId = setInterval(() => this.refreshcode(), 1 * 1000); //auto refresh after 5 seconds
  }

  private refreshcode() { //auto refresh 4
    /**this function will store messages that will keep refreshing automoatically in the
     * virtualmessage table rows
   * if theres new messages after each refresh then we'd add that message to the original message table rows
   * to be displayed in the html
   */
    this.loadvirtualallusermessages();
  }


  private stopRefresh() { //auto refresh 5
    clearInterval(this.timeoutId);
  }

  ionViewDidLeave() { //auto refresh 6
    this.stopRefresh();
  }


  ionViewWillEnter() {
    this.messagetablerows = [];  //we load whatever is in our message array whose data has already been converted into usable format
    this.messagetablerows2 = [];
    this.loadallusermessages(); //then we call the function to load all the messages
  }


  //load all user messages
  //we'd later filter out only the media
  loadallusermessages() {
    this.jsonconvertedrows=[];
    this.messagetablerows=[];
    this.messagetablerows2=[];

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

      console.log("messags w/o media", this.messagetablerows)

      /**now by default our comments icon is dark..however we want to differentiate commented msgs from others by changing the color of the icon
       * hence when the comments for the particular msg is more than 0 we change the color of the comment icon to indicate someone has commented on the message
       */
      for (var key in this.messagetablerows) {
        if ((this.messagetablerows[key].comments_fetched) > 0) {
          this.messagetablerows[key].commentcolor = "secondary";
        }
      }

      /**transfering only messages with media into our final array */
      for (var count = 0; count < this.messagetablerows.length; count++) {
        if (this.messagetablerows[count].message_media_fetched == null) {
          //do nothing
        }

        else {
          //push details of messages whihc contain media
          this.messagetablerows2.push({
            message_id_fetched: this.messagetablerows[count].message_id_fetched,
            message_media_fetched: this.messagetablerows[count].message_media_fetched,
            likes_fetched: this.messagetablerows[count].likes_fetched,
            comments_fetched: this.messagetablerows[count].comments_fetched,
            date_created_fetched: this.messagetablerows[count].date_created_fetched,
            likecolor: this.messagetablerows[count].likecolor,
            commentcolor: this.messagetablerows[count].commentcolor
          })
        }
      }


      /**we count to seee number of message media 
       * if its 0 then we can assgn a default transparent object to the page to allow sliding
       */
      for (var key in this.messagetablerows2) {
        this.countmessagemedia = this.countmessagemedia + 1
      }
      console.log("no of message media:", this.countmessagemedia);

      console.log("only media :", this.messagetablerows2)

    });

  }


 /**this function will store messages that will keep refreshing automoatically in the
     * virtualmessage table rows
   * if theres new messages after each refresh then we'd add that message to the original message table rows
   * to be displayed in the html
   */
  loadvirtualallusermessages(){
    this.virtualjsonconvertedrows=[];
    this.virtualmessagetablerows=[];
    this.virtualmessagetablerows2=[];

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
      this.virtualjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array 
       * into our messagetablerows for use in the html**/
      for (let count of this.virtualjsonconvertedrows) {
        this.virtualmessagetablerows.push(count);
      }

      /**we add another property called pincolor to messagetablerows and assign default colors to it for it to look like
       * {message_id_fetched: "64", message_fetched: "look at me", pincolor:"dark"}
       * so that we can call it in the html like {{count.pincolor}}**/
      this.virtualmessagetablerows.forEach(function (element) { element.likecolor = "dark"; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentcolor = "dark"; });

      //retrieving just the profile pic which will remain constant throughtout the messages
      for (var key in this.virtualmessagetablerows) {
        if (this.virtualmessagetablerows.hasOwnProperty(key)) {
          this.profilepic = this.server + this.virtualmessagetablerows[key].user_profile_pic_fetched;
        }

        //but if our profile pic from the database is null we assign a default profile pic to the row
        if (this.virtualmessagetablerows[key].user_profile_pic_fetched == null) {
          this.virtualmessagetablerows[key].user_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";  //this directory is in htdocs/campfila/defaultprofilepic folder
          this.profilepic = this.server + this.virtualmessagetablerows[key].user_profile_pic_fetched;
        }
      }
      console.log(this.profilepic);


      /**now by default our likes icon is dark..however we want to differentiate liked msgs from others by changing the color of the icon
       * hence when the likes for the particular msg is more than 0 we change the color of the comment icon to indicate someone has commented on the message
       */
      for (var key in this.virtualmessagetablerows) {
        if ((this.virtualmessagetablerows[key].likes_fetched) > 0) {
          this.virtualmessagetablerows[key].likecolor = "danger";
        }
      }

      console.log("messags w/o media", this.virtualmessagetablerows)

      /**now by default our comments icon is dark..however we want to differentiate commented msgs from others by changing the color of the icon
       * hence when the comments for the particular msg is more than 0 we change the color of the comment icon to indicate someone has commented on the message
       */
      for (var key in this.virtualmessagetablerows) {
        if ((this.virtualmessagetablerows[key].comments_fetched) > 0) {
          this.virtualmessagetablerows[key].commentcolor = "secondary";
        }
      }

      /**transfering only messages with media into our final array */
      for (var count = 0; count < this.virtualmessagetablerows.length; count++) {
        if (this.virtualmessagetablerows[count].message_media_fetched == null) {
          //do nothing
        }

        else {
          //push details of messages whihc contain media
          this.virtualmessagetablerows2.push({
            message_id_fetched: this.virtualmessagetablerows[count].message_id_fetched,
            message_media_fetched: this.virtualmessagetablerows[count].message_media_fetched,
            likes_fetched: this.virtualmessagetablerows[count].likes_fetched,
            comments_fetched: this.virtualmessagetablerows[count].comments_fetched,
            date_created_fetched: this.virtualmessagetablerows[count].date_created_fetched,
            likecolor: this.virtualmessagetablerows[count].likecolor,
            commentcolor: this.virtualmessagetablerows[count].commentcolor
          })
        }
      }


      /**we count to seee number of message media 
       * if its 0 then we can assgn a default transparent object to the page to allow sliding
       */
      for (var key in this.virtualmessagetablerows2) {
        this.countmessagemedia = this.countmessagemedia + 1
      }
      console.log("no of message media:", this.countmessagemedia);

      console.log("only media :", this.virtualmessagetablerows2);

      /**now we have the pinned messages that are reloaded after every 1 second
       * if thers' new pinned messages we want to add that message to the original pinned messages
       * ie. messagetablerows, sort the entire messages and then display it in the html
       */
      for (var count1 of this.virtualmessagetablerows2) { //loop through the virtual table whihc has the fresh data
        var index = this.messagetablerows2.findIndex(x => x.message_id_fetched == count1.message_id_fetched) //go to the original dmmessgetable and compare the msg ids with the virtual table's msg ids

        if (index === -1) { //if the id in virtual table wasnt found in the original dmmessagetable

          //push only that message details so that it adds to the current messages in the page
          //if we reload the entire loaddmmessages function its going to load the whole messags and they'd have to disappear and appear again
          this.messagetablerows2.push(count1);

          this.messagetablerows2.sort((a, b) => b.message_id_fetched - a.message_id_fetched)
          //b comes before a in the second part of the line because i want the latest ids to be at the top          
        }

        else {//if the message id is present already
          //do nothing
        }
      }

    });
  }


  //view selected message image in full
  viewimage(count) {
    this.photoViewer.show(this.server + count.message_media_fetched);
    console.log("with server", this.server + count.message_media_fetched);
  }

}

