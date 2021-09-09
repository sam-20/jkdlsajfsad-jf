import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs, ViewController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'



@IonicPage()
@Component({
  selector: 'page-addgroupmembers',
  templateUrl: 'addgroupmembers.html',
})
export class AddgroupmembersPage {

  groupdetailsjson: any = [];
  groupdetailstablerows: any = [];

  createdgroup_admin_id: any;

  selectedgroup_membersjoined;

  jsonconvertedrows: any = [];
  useraccountstablerows: any = [];

  selecteduser_id: any;

  createdgroupmemberstable: any = [];
  createdgroupmembersjson: any = [];

  server: string;

  newlycreatedgroup_id_retrieved: any; 


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider,
    public mymodulevariables: ModulevariablesProvider,
  ) {
    this.server = postPvdr.server;

    this.newlycreatedgroup_id_retrieved = (localStorage.getItem('storednewlycreatedgroupid'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ionViewWillEnter() {
    this.loadpagedata(); 

    console.log("newly created group's id :", this.newlycreatedgroup_id_retrieved);
  }

  loadpagedata() {


    setTimeout(() => {
      this.groupdetailsjson = [];
      this.groupdetailstablerows = [];
      this.loadcreatedgroupdetails();

      this.createdgroupmembersjson = [];
      this.createdgroupmemberstable = [];
      this.loadnewcreatedgroupmembers();

      this.jsonconvertedrows = [];
      this.useraccountstablerows = [];  
      this.loadallusers();


    }, 0);
  }

  loadcreatedgroupdetails() {
    this.groupdetailsjson = [];
    this.groupdetailstablerows = [];

    let body = {
      mydbfunc: 'displaygroupdetails',
      group_idDB: this.newlycreatedgroup_id_retrieved
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.groupdetailsjson = JSON.parse(data);

      for (let count of this.groupdetailsjson) {
        this.groupdetailstablerows.push(count);
      }
      console.log("created group's details :", this.groupdetailstablerows);

      for (var key in this.groupdetailstablerows) {
        if (this.groupdetailstablerows.hasOwnProperty(key)) {
          this.createdgroup_admin_id = this.groupdetailstablerows[key].group_admin_id_fetched; 
          this.selectedgroup_membersjoined = this.groupdetailstablerows[key].members_joined_fetched;  
        }
      }
      console.log("created group's admin id :", this.createdgroup_admin_id);
    })

  }

  loadallusers() {
    this.jsonconvertedrows = [];
    this.useraccountstablerows = [];

    let body = {
      mydbfunc: 'displayallusers'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.jsonconvertedrows = JSON.parse(data);

      for (let count of this.jsonconvertedrows) {
        this.useraccountstablerows.push(count);
      }

      console.log("all users", this.useraccountstablerows);

      this.useraccountstablerows.forEach(function (element) { element.buttoncolor = "dark"; });
      this.useraccountstablerows.forEach(function (element) { element.membershipstatus = "add"; });

      for (var key in this.useraccountstablerows) {
        if ((this.useraccountstablerows[key].user_profile_pic_fetched) == null) {
          this.useraccountstablerows[key].user_profile_pic_fetched = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }

  
      for (var countA = 0; countA < this.useraccountstablerows.length; countA++) {
        for (var countB = 0; countB < this.createdgroupmemberstable.length; countB++) {
          if (this.useraccountstablerows[countA].user_id_fetched == this.createdgroupmemberstable[countB].user_id_fetched) {

      
            if (this.useraccountstablerows[countA].user_id_fetched == this.createdgroup_admin_id) { 
              this.useraccountstablerows[countA].buttoncolor = "primary";
              this.useraccountstablerows[countA].membershipstatus = "Admin";
            }

            else {
              this.useraccountstablerows[countA].buttoncolor = "danger";
              this.useraccountstablerows[countA].membershipstatus = "remove";
            }
          }
        }
      }

    });
  }

  loadnewcreatedgroupmembers() {
    this.createdgroupmembersjson = [];
    this.createdgroupmemberstable = [];

    let body = {
      mydbfunc: 'displayspecificgroup_groupmembersdetails',
      group_idDB: this.newlycreatedgroup_id_retrieved
    }

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {

      this.createdgroupmembersjson = JSON.parse(data);

      for (let count of this.createdgroupmembersjson) {
        this.createdgroupmemberstable.push(count);
      }

      console.log("newly created group's members :", this.createdgroupmemberstable);
    });
  }


  openuserprofile(count) {
    
  }
  
  addORremoveuser(count) {
    if (count.membershipstatus == "add") {
      count.membershipstatus = "remove";
      count.buttoncolor = "danger";
      this.selecteduser_id = count.user_id_fetched;

      this.joingroup(); 

      this.selectedgroup_membersjoined++;
      console.log("selected group's members count: ", this.selectedgroup_membersjoined);

      this.updategroup_members_joined();  
    }

    else {
      count.membershipstatus = "add";
      count.buttoncolor = "dark";
      this.selecteduser_id = count.user_id_fetched;

      this.exitgroup(); 

      this.selectedgroup_membersjoined--;
      console.log("selected group's members count: ", this.selectedgroup_membersjoined);

      this.updategroup_members_joined();  
    }
  }


  joingroup() {
    let body = {
      logged_in_useridDB: this.selecteduser_id,
      group_joining_idDB: this.newlycreatedgroup_id_retrieved,
      mydbfunc: 'joingroup'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  exitgroup() {
    let body = {
      logged_in_useridDB: this.selecteduser_id,
      group_joining_idDB: this.newlycreatedgroup_id_retrieved,
      mydbfunc: 'exitgroup'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });
  }

  updategroup_members_joined() {
    let body = {
      group_idDB: this.newlycreatedgroup_id_retrieved,
      members_joinedDB: this.selectedgroup_membersjoined,
      mydbfunc: 'updategroup_memberscount'
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
    });

  }

  leavepage() {
    this.viewCtrl.dismiss();
  }

  doRefresh(event) {

    setTimeout(() => {
      this.loadpagedata();

      console.log('Refresh complete');
      event.complete();
    }, 500);
  }
}
