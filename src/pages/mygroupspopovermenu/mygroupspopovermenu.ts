import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mygroupspopovermenu',
  templateUrl: 'mygroupspopovermenu.html',
})
export class MygroupspopovermenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MygroupspopovermenuPage');
  }


  //view all groups
  viewallgroups() {
    this.navCtrl.push('ViewallgroupsPage')
  }

  //create new group
  createnewgroup(){
    this.navCtrl.push('CreategroupPage');
  }

}
