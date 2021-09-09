import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { ModulevariablesProvider } from '../../providers/modulevariables/modulevariables'
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-dm',
  templateUrl: 'dm.html',
})
export class DmPage {
  userdmmessagestablerows: any = [];
  udmjsonconvertedrows: any = [];

  virtualuserdmmessagestablerows: any = [];
  virtualudmjsonconvertedrows: any = [];

  permissionstatus: any;

  userdmmessagestablerows2: any = [];

  dmcount: number = 0;

  private timeoutId: number;

  server: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private postPvdr: PostProvider,
    private photoViewer: PhotoViewer,
    public mymodulevariables: ModulevariablesProvider) {
    this.server = postPvdr.server;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DmPage');
  }

  ionViewWillEnter() {
    console.log("damn")
    this.loaduserdmmessages();
  }

  ionViewDidEnter() {
    this.startAutoRefresh();
  }

  private startAutoRefresh() {
    this.refreshcode();
    this.timeoutId = setInterval(() => this.refreshcode(), 1 * 1000);
  }

  private refreshcode() {
    setTimeout(() => {
      this.loadvirtualuserdmmessages();
    }, 20000);


  }

  private stopRefresh() {
    clearInterval(this.timeoutId);
  }

  ionViewDidLeave() {
    this.stopRefresh();
  }


  loaduserdmmessages() {
    this.udmjsonconvertedrows = [];
    this.userdmmessagestablerows = [];
    this.userdmmessagestablerows2 = [];
    this.dmcount = 0;

    let body = {
      mydbfunc: 'displayuserdmchats',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.udmjsonconvertedrows = JSON.parse(data);

      for (let count of this.udmjsonconvertedrows) {
        this.userdmmessagestablerows.push(count);
        this.dmcount = this.dmcount + 1
      }

      console.log("user's dm chats:", this.userdmmessagestablerows)

      var temp = []
      for (var count = 0; count < this.userdmmessagestablerows.length; count++) {
        if (this.userdmmessagestablerows[count].user1_id_fetched != this.mymodulevariables.globaluserid) {
          temp.push({
            dmreceipient_id: this.userdmmessagestablerows[count].user1_id_fetched,
            dmreceipient_username: this.userdmmessagestablerows[count].user1_username_fetched,
            dmreceipient_profilepic: this.userdmmessagestablerows[count].user1_profilepic_fetched,
            row_id_fetched: this.userdmmessagestablerows[count].row_id_fetched,
            lastmsg_id_fetched: this.userdmmessagestablerows[count].lastmsg_id_fetched,
            lastmsg_fetched: this.userdmmessagestablerows[count].lastmsg_fetched,
            lastmsg_time_fetched: this.userdmmessagestablerows[count].lastmsg_time_fetched,
            permission_status_fetched: this.userdmmessagestablerows[count].permission_status_fetched
          })
        }

        else if (this.userdmmessagestablerows[count].user2_id_fetched != this.mymodulevariables.globaluserid) {
          temp.push({
            dmreceipient_id: this.userdmmessagestablerows[count].user2_id_fetched,
            dmreceipient_username: this.userdmmessagestablerows[count].user2_username_fetched,
            dmreceipient_profilepic: this.userdmmessagestablerows[count].user2_profilepic_fetched,
            row_id_fetched: this.userdmmessagestablerows[count].row_id_fetched,
            lastmsg_id_fetched: this.userdmmessagestablerows[count].lastmsg_id_fetched,
            lastmsg_fetched: this.userdmmessagestablerows[count].lastmsg_fetched,
            lastmsg_time_fetched: this.userdmmessagestablerows[count].lastmsg_time_fetched,
            permission_status_fetched: this.userdmmessagestablerows[count].permission_status_fetched
          })
        }
      }

      for (var key in temp) {
        if ((temp[key].dmreceipient_profilepic) == null) {
          temp[key].dmreceipient_profilepic = "defaultprofilepic/defaultprofilepic.jpg";
        }
      }

      for (var key in temp) {
        if ((temp[key].lastmsg_fetched) == "") {
          temp[key].lastmsg_fetched = "image";
        }
      }

      for (var key in temp) {
        temp[key].permission_status_fetched = "accept";
      }


      /**this will filter the temp object array
       *  and remove duplicates using a unique object key witht the help of the array reduce method 
       * before finally assigning it to the this.userdmmessagestablerows2 table
       * */
      this.userdmmessagestablerows2 = temp.reduce((unique, o) => {
        if (!unique.some(obj => obj.lastmsg_id_fetched === o.lastmsg_id_fetched)) {
          unique.push(o);
        }
        return unique;
      }, []);

      console.log("final dm chat table after removing duplicates:", this.userdmmessagestablerows2)


      this.userdmmessagestablerows2.sort((b, a) => a.lastmsg_id_fetched - b.lastmsg_id_fetched)
    });

  }


  loadvirtualuserdmmessages() {
    this.virtualudmjsonconvertedrows = [];
    this.virtualuserdmmessagestablerows = [];

    let body = {
      mydbfunc: 'displayuserdmchats',
      globaluseridDB: this.mymodulevariables.globaluserid
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.virtualudmjsonconvertedrows = JSON.parse(data);

      for (let count of this.virtualudmjsonconvertedrows) {
        this.virtualuserdmmessagestablerows.push(count);
      }

      // console.log("user's virtual dm chats:", this.virtualuserdmmessagestablerows)

      for (var count of this.virtualuserdmmessagestablerows) {

        var index = this.userdmmessagestablerows.findIndex(x => x.row_id_fetched == count.row_id_fetched)

        var index2 = this.userdmmessagestablerows.findIndex(x => x.lastmsg_id_fetched == count.lastmsg_id_fetched)

        if ((index === -1)) {
          this.userdmmessagestablerows2 = [];
          this.refreshpage();
        }

        if ((index2 === -1)) {
          this.userdmmessagestablerows2 = [];
          this.refreshpage();
        }

        else {
        }
      }

    });
  };


  opendmchat(count) {
    console.log(count.dmreceipient_id)
    localStorage.setItem('storeddmreceipientid', count.dmreceipient_id);
    this.navCtrl.push('DmcontactmessagesPage');
  }

  refreshpage() {
    this.userdmmessagestablerows = [];
    this.userdmmessagestablerows2 = [];

    setTimeout(() => {
      this.userdmmessagestablerows2 = [];
      this.loaduserdmmessages();
    }, 100);
  }

  acceptchat(count) {
    this.permissionstatus = "accept"

    let body = {
      mydbfunc: 'updateuserdmchatpermissionstatus',
      loggedinuseridDB: this.mymodulevariables.globaluserid,
      receipientuseridDB: count.dmreceipient_id,
      permissionstatusDB: this.permissionstatus
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.opendmchat(count);
    });
  }


  rejectchat(count) {
    this.permissionstatus = "rejected"

    let body = {
      mydbfunc: 'updateuserdmchatpermissionstatus',
      loggedinuseridDB: this.mymodulevariables.globaluserid,
      receipientuseridDB: count.dmreceipient_id,
      permissionstatusDB: this.permissionstatus
    };

    this.postPvdr.postData(body, 'mydbapicommands.php').subscribe(data => {
      this.loaduserdmmessages();
    });
  }


  viewprofileimage(count) {
    this.photoViewer.show(this.server + count.dmreceipient_profilepic);
    console.log("image", this.server + count.dmreceipient_profilepic);
  }

  doRefresh(event) {
    this.udmjsonconvertedrows = [];
    this.userdmmessagestablerows = [];
    this.userdmmessagestablerows2 = [];
    this.virtualudmjsonconvertedrows = [];
    this.virtualuserdmmessagestablerows = [];
    this.dmcount = 0;

    setTimeout(() => {
      this.loaduserdmmessages();
      event.complete();
    }, 1000);
  }

}
