//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ModulevariablesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModulevariablesProvider {
  public mvusername: any;
  public mvpassword: any;

  /**this will store the id of any user who signs up or logins..
   * the id wil be used to perform any sql operations based on the id assigned to this variable**/
  public globaluserid : any; 
  public globalusername : any;

  /**this will store the number of followers or following of a user */
  public totaluserfollowing : number;
  public totaluserfollowers :number;

  /**this variable is assigned a default value of 0 when new home messages are posted and the user hasnt scrolled to view them 
   * the value is then sent to the home tab icon badge which we have designed for it to look like a dot
   * if there are new messages after reloads in the home page we assign 0 to this module variable which in turn assigns a 
   * after the user has scrolled to view them in the home page..its set back to null
   * 
  */
  public globalsendnewmessagealert: number ;

  /**this variable will tell whenn to activate the splash screen ie. which is only when the user opens the app afresh
   * hence after a user has logged out we deactivate the splash screen and head straight towards the login page without loading the splash
   * Also when a user logs in from the login page we head straight to the home page instead of loading the splash for the home screen
   */
  public activatesplash : boolean = true;

  public profilepic : any = null;

  // constructor(public http: HttpClient) {
  //   console.log('Hello ModulevariablesProvider Provider');
  // }

}
