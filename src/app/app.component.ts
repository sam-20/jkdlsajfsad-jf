import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModulevariablesProvider } from '../providers/modulevariables/modulevariables'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;

  storedusernamecredential: any;
  storedpasswordcredential: any;
  storeduseridcredential: any;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    public mymodulevariables: ModulevariablesProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //if user didnt logout we expect that he's logged in already when the app opens
    this.storedusernamecredential = window.localStorage.getItem('usernamecredential');
    this.storedpasswordcredential = window.localStorage.getItem('passwordcredential');
    this.storeduseridcredential = window.localStorage.getItem('userIDcredential');

    console.log("storedusernamecredential :", this.storedusernamecredential);
    console.log("storedpasswordcredential :", this.storedpasswordcredential);
    console.log("storeduseridcredential :", this.storeduseridcredential);

    if (this.storedusernamecredential == null) {
      this.rootPage = 'LoginPage';
    }
    else {
      this.mymodulevariables.globaluserid = this.storeduseridcredential; 
      this.rootPage = 'TabsholderPage';
    }
  }

}

