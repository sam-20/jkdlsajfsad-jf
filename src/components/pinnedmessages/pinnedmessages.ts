import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'app-pinnedmessages',
  templateUrl: 'pinnedmessages.html'
})
export class PinnedmessagesComponent {
  jsonconvertedrows: any = [];  //this array will receive the rows from the db and convert into usable format 
  messagetablerows: any = []; //this array will receive the rows from the from the converted jsonformat 

  /**virtual table to store pinned messages that will keep refreshing automoatically
   * if theres new messages after each refresh then we'd add that message to the original messageteable rows to be displaayed
   * in the html
   */
  virtualjsonconvertedrows: any = [];
  virtualmessagetablerows: any = [];

  /**this table will store the msg_id of messages that the logged in user has liked in the likedmessages table..
   * it will be run accross all the messages in the messages table
   * if a msg_id in messages table matches with a msg_id in likedmessages table it means the message has been liked 
   * hence we will set the default color for the like icon to show that the message has been liked already */
  likedmsgids: any = [];
  likedmsgsidsjsonconvertedrows: any[];

  messageidforDB: any //this will collect any selected message's id and store it to be used in the database
  totallikes: any // this will collect the total likes for a selected message and use for update in the messages table

  countpinnedmessages: number = 0; //this allows us to know if there are pinned messages or not so that we can assign a default pic for logged in users whod dont have pinned messages

  server: string; /******************************a */

  private timeoutId: number; //auto refresh 1

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
    private photoViewer: PhotoViewer,
    private tabs: Tabs) {
    this.server = postPvdr.server; /*********************b */
    this.ionViewWillEnter();
    this.ionViewDidEnter();
    this.startAutoRefresh();
    this.refreshcode();
    this.stopRefresh();
    this.ionViewDidLeave();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PinnedmessagesPage');
    console.log(this.mymodulevariables.globaluserid);
    this.ionViewWillEnter();
  }

  ionViewDidEnter() {
    this.startAutoRefresh();  //auto refresh 2 
  }

  private startAutoRefresh() {  //auto refresh 3
    this.refreshcode();
    this.timeoutId = setInterval(() => this.refreshcode(), 1 * 1000); //auto refresh after 5 seconds
  }

  private refreshcode() { //auto refresh 4
    /**this function will stored pinned messages that will keep refreshing automoatically in the
     * virtualmessage table rows
   * if theres new messages after each refresh then we'd add that message to the original message table rows
   * to be displayed in the html
   */
    this.loadvirtualuserpinnedmessages();
  }

  private stopRefresh() { //auto refresh 5
    clearInterval(this.timeoutId);
  }

  ionViewDidLeave() { //auto refresh 6
    this.stopRefresh();
  }

  //codes here are executed when the user selects the tab 
  ionViewWillEnter() {
    this.loadpagedata() //used for loading asynchronous data
  }


  //we load the data into the page like this for asynchronous data
  loadpagedata() {
    //operation to perform when refresh is taking place
    this.likedmsgids = [];
    this.loadlikedmessages();

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.messagetablerows = [];  //we load whatever is in our message array whose data has already been converted into usable format
      this.loaduserpinnedmessages(); //then we call the function to load all the user's pinned messages
      console.log('Refresh complete');
    }, 0); //duration of refresh
  }


  //load only user's liked messages
  loadlikedmessages() {
    this.likedmsgids = [];
    this.likedmsgsidsjsonconvertedrows = [];

    let body = {
      mydbfunc: 'displayuserlikedmessages',  //we can get the pinned messages ids from the db query function which we use to load the pinned messages in our pinnedmessages page
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    //posting our data to the api 
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      //console.log(data);

      /***data inside the .subscribe contains our records 
            * but we cant use it in its original format 
            * so we convert into a usable format 
            * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.likedmsgsidsjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
      * into our pinnedmsgids table for matching up with the tablerows data**/
      for (let count of this.likedmsgsidsjsonconvertedrows) {
        this.likedmsgids.push(count);
      }
      console.log(this.likedmsgids);
      console.log(this.likedmsgids.length)
    });
  }


  //load user's pinned messages
  loaduserpinnedmessages() {
    this.messagetablerows = [];
    this.jsonconvertedrows = [];

    let body = {
      mydbfunc: 'displayuserpinnedmessages',
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

      /**now we use a loop to transfer data from the converted array  
       * into our messagetablerows for use in the html**/
      for (let count of this.jsonconvertedrows) {
        this.messagetablerows.push(count);
      }

      /**we count to seee number of pinned messages
       * if its 0 then we can assgn a default transparent object to the page to allow sliding
       */
      for (var key in this.messagetablerows) {
        this.countpinnedmessages = this.countpinnedmessages + 1
      }
      console.log("no of pinned messages:", this.countpinnedmessages);


      /**we add another property called pincolor to messagetablerows and assign default colors to it for it to look like
       * {message_id_fetched: "64", message_fetched: "look at me", pincolor:"dark"}
       * so that we can call it in the html like {{count.pincolor}}**/
      this.messagetablerows.forEach(function (element) { element.pincolor = "primary"; });
      this.messagetablerows.forEach(function (element) { element.likecolor = "dark"; });
      this.messagetablerows.forEach(function (element) { element.commentcolor = "dark"; });

      /**now we have have the messages in the messagetablerows array so we are 
      we are going to check if a profile pic is null then we assign our pic to the user **/
      for (var key in this.messagetablerows) {
        if ((this.messagetablerows[key].msgsender_profile_pic_fetched) == null) {
          this.messagetablerows[key].msgsender_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**we have our messages data and liked messages data
     we run a loop comparing those two tables and when we realize that a msg id in the messages table
     has been liked by the user in the likedmessages table
     we change the default likecolor value which was dark to danger indicating that the message has been liked by the user already **/
      for (var msgtableloop2 = 0; msgtableloop2 < this.messagetablerows.length; msgtableloop2++) { //looping through the entire messages rows
        for (var likedmsgloop = 0; likedmsgloop < this.likedmsgids.length; likedmsgloop++) { // looping through the liked messages rows
          if (this.messagetablerows[msgtableloop2].message_id_fetched == this.likedmsgids[likedmsgloop].message_id_fetched) {  //if a match is found
            console.log(this.messagetablerows[msgtableloop2].message_id_fetched);  //log matched up msg id
            this.messagetablerows[msgtableloop2].likecolor = "danger" //assign a danger color to the likecolor property of that message's row
          }
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

      console.log("pinned messages", this.messagetablerows)
    });

  }


  loadvirtualuserpinnedmessages() {
    /**first load our liked messages so that in case the pinned message has been liked
     * we can automatically see it liked in the html
    */
    this.loadlikedmessages();


    this.virtualmessagetablerows = [];
    this.virtualjsonconvertedrows = [];

    let body = {
      mydbfunc: 'displayuserpinnedmessages',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    //posting our data to the api
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      /***data inside the .subscribe contains our records 
       * but we cant use it in its original format 
       * so we convert into a usable format 
       * and move it into our array which is going to store converted data ie.**/
      //console.log(data);
      this.virtualjsonconvertedrows = JSON.parse(data);

      /**now we use a loop to transfer data from the converted array  
       * into our messagetablerows for use in the html**/
      for (let count of this.virtualjsonconvertedrows) {
        this.virtualmessagetablerows.push(count);
      }

      /**we count to seee number of pinned messages
       * if its 0 then we can assgn a default transparent object to the page to allow sliding
       */
      for (var key in this.virtualmessagetablerows) {
        this.countpinnedmessages = this.countpinnedmessages + 1
      }



      /**we add another property called pincolor to messagetablerows and assign default colors to it for it to look like
       * {message_id_fetched: "64", message_fetched: "look at me", pincolor:"dark"}
       * so that we can call it in the html like {{count.pincolor}}**/
      this.virtualmessagetablerows.forEach(function (element) { element.pincolor = "primary"; });
      this.virtualmessagetablerows.forEach(function (element) { element.likecolor = "dark"; });
      this.virtualmessagetablerows.forEach(function (element) { element.commentcolor = "dark"; });

      /**now we have have the messages in the messagetablerows array so we are 
      we are going to check if a profile pic is null then we assign our pic to the user **/
      for (var key in this.virtualmessagetablerows) {
        if ((this.virtualmessagetablerows[key].msgsender_profile_pic_fetched) == null) {
          this.virtualmessagetablerows[key].msgsender_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }


      /**we have our messages data and liked messages data
     we run a loop comparing those two tables and when we realize that a msg id in the messages table
     has been liked by the user in the likedmessages table
     we change the default likecolor value which was dark to danger indicating that the message has been liked by the user already **/
      for (var msgtableloop2 = 0; msgtableloop2 < this.virtualmessagetablerows.length; msgtableloop2++) { //looping through the entire messages rows
        for (var likedmsgloop = 0; likedmsgloop < this.likedmsgids.length; likedmsgloop++) { // looping through the liked messages rows
          if (this.virtualmessagetablerows[msgtableloop2].message_id_fetched == this.likedmsgids[likedmsgloop].message_id_fetched) {  //if a match is found
            console.log(this.virtualmessagetablerows[msgtableloop2].message_id_fetched);  //log matched up msg id
            this.virtualmessagetablerows[msgtableloop2].likecolor = "danger" //assign a danger color to the likecolor property of that message's row
          }
        }
      }

      /**now by default our comments icon is dark..however we want to differentiate commented msgs from others by changing the color of the icon
       * hence when the comments for the particular msg is more than 0 we change the color of the comment icon to indicate someone has commented on the message
       */
      for (var key in this.virtualmessagetablerows) {
        if ((this.virtualmessagetablerows[key].comments_fetched) > 0) {
          this.virtualmessagetablerows[key].commentcolor = "secondary";
        }
      }

      console.log("pinned virtual messages", this.virtualmessagetablerows)


      /**now we have the pinned messages that are reloaded after every 1 second
       * if thers' new pinned messages we want to add that message to the original pinned messages
       * ie. messagetablerows, sort the entire messages and then display it in the html
       */
      for (var count of this.virtualmessagetablerows) { //loop through the virtual table whihc has the fresh data
        var index = this.messagetablerows.findIndex(x => x.message_id_fetched == count.message_id_fetched) //go to the original dmmessgetable and compare the msg ids with the virtual table's msg ids

        if (index === -1) { //if the id in virtual table wasnt found in the original dmmessagetable

          //push only that message details so that it adds to the current messages in the page
          //if we reload the entire loaddmmessages function its going to load the whole messags and they'd have to disappear and appear again
          this.messagetablerows.push(count);

          this.messagetablerows.sort((a, b) => b.message_id_fetched - a.message_id_fetched)
          //b comes before a in the second part of the line because i want the latest ids to be at the top          
        }

        else {//if the message id is present already
          //do nothing
        }
      }

    });


  }


  //unpin message icon
  unpinmessage(count) {
    console.log(this.mymodulevariables.globaluserid);
    console.log(count.message_id_fetched);
    this.messageidforDB = count.message_id_fetched;
    this.removepinnedmessage();
    this.loadpagedata();  //we refresh manaually
  }

  //removing pinned message from pinnedmessages table
  removepinnedmessage() {
    let body = { //we are unpinning from pinnedmessages table where the pinner's user_id =.. and the pinnedmessage's id =..
      pinneruseridDB: this.mymodulevariables.globaluserid,
      pinnedmessageidDB: this.messageidforDB,
      mydbfunc: 'unpinmessage'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }


  //liking or unliking a message
  likeORunlikemessage(count) {
    console.log(this.mymodulevariables.globaluserid);
    console.log(count.message_id_fetched);  //display the id of the message liked
    this.messageidforDB = count.message_id_fetched; //we'd need the liked msg's id for inserting into the likedmessages table

    if (count.likecolor == 'dark') {
      count.likecolor = 'danger' //meaning user has liked message
      ++count.likes_fetched //add 1 to the total value of likes
      this.totallikes = count.likes_fetched;  //after adding one we send it to the total likes variable for message table likes update
      this.likemessage();
      this.updatetotallikes(); //update the total likes of the message in the messages table
    }

    else {
      count.likecolor = 'dark'  //meaning user has unliked message
      --count.likes_fetched;  //sub 1 from the total value of likes
      this.totallikes = count.likes_fetched; //after subtracting one we send it to the total likes variable for message table likes update

      //to ensure totallikes doesnt move to -ve
      if (this.totallikes < 0) {
        this.totallikes = 0
      }
      this.unlikemessage();
      this.updatetotallikes(); //update the total likes of the message in the messages table
    }
  }


  //inserting liked message id into likedmessages table
  likemessage() {
    let body = {
      likeruseridDB: this.mymodulevariables.globaluserid,
      likedmessageidDB: this.messageidforDB,
      mydbfunc: 'likemessage'
    };

    //now we are inserting the data into the api db server
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //removing liked message from likedmessages table
  unlikemessage() {
    let body = { //we are unliking from likedmessages table where the liker's user_id =.. and the likedmessage's id =..
      likeruseridDB: this.mymodulevariables.globaluserid,
      likedmessageidDB: this.messageidforDB,
      mydbfunc: 'unlikemessage'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  //updating the total likes the message has gotten in the messages table
  updatetotallikes() { //update messages, set likes = 'messagelikesDB' where message_id='messageidDB'
    let body = {
      messageidDB: this.messageidforDB,
      messagelikesDB: this.totallikes,
      mydbfunc: 'updatetotallikes'
    }
    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }


  //open a selected user's profile
  openuserprofile(count) {
    console.log("selected user's id", count.msgsender_id_fetched)

    //if selected user is ourself then we open our own profile tab
    if (count.msgsender_id_fetched == this.mymodulevariables.globaluserid) {
      console.log("open profile tab page")
      this.tabs.select(0);
    }

    //if user is someone else
    else {
      localStorage.setItem('storeduserid', count.msgsender_id_fetched);
      this.navCtrl.push('Profile2Page');
    }
  }


  //view selected message image in full
  viewimage(count) {
    this.photoViewer.show(this.server + count.message_media_fetched, count.message_fetched);
    console.log("with server", this.server + count.message_media_fetched);
  }

  //load all comments of selected message
  loadmessagedetails(count) {
    localStorage.setItem('storedmessageid', count.message_id_fetched) //storing the message id in a local storage for the next page
    localStorage.setItem('storedpincolor', count.pincolor); //storing the pincolor of the message to be commented so that we use it in the next page
    localStorage.setItem('storedlikecolor', count.likecolor); //storing the likecolor of the message to be commented so that we use it in the next page
    localStorage.setItem('storedcommentcolor', count.commentcolor); //storing the commentcolor of the message to commented so that we use it in the next  page
    this.navCtrl.push('LoadspecificmessagedetailsPage');
  }


  //pull to refresh 
  doRefresh(event) {
    //operation to perform when refresh is taking place
    this.likedmsgids = [];
    this.loadlikedmessages();

    setTimeout(() => {
      //operation to perform when refresh has completed
      this.messagetablerows = [];  //we load whatever is in our message array whose data has already been converted into usable format
      this.loaduserpinnedmessages(); //then we call the function to load all the user's pinned messages
      console.log('Refresh complete');
      event.complete();
    }, 500); //duration of refresh
  }

}
