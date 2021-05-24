import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowersPage } from './followers';
import { GroupnamesearchpipeModule } from '../../pipes/groupnamesearchpipe.module';
import { SearchfollowerspipeModule } from '../../pipes/searchfollowerspipe.module';
import { SearchfollowingpipeModule } from '../../pipes/searchfollowingpipe.module';
import { SearchsearchpipeModule } from '../../pipes/searchsearchpipe.module';

@NgModule({
  declarations: [
    FollowersPage,
  ],

  imports: [
    IonicPageModule.forChild(FollowersPage),
    GroupnamesearchpipeModule,
    SearchfollowerspipeModule,
    SearchfollowingpipeModule,
    SearchsearchpipeModule
  ],

})
export class FollowersPageModule { }
