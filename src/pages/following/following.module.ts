import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowingPage } from './following';
import { GroupnamesearchpipeModule } from '../../pipes/groupnamesearchpipe.module';
import { SearchfollowerspipeModule } from '../../pipes/searchfollowerspipe.module';
import { SearchfollowingpipeModule } from '../../pipes/searchfollowingpipe.module';
import { SearchsearchpipeModule } from '../../pipes/searchsearchpipe.module';

@NgModule({
  declarations: [
    FollowingPage,
  ],

  imports: [
    IonicPageModule.forChild(FollowingPage),
    GroupnamesearchpipeModule,
    SearchfollowerspipeModule,
    SearchfollowingpipeModule,
    SearchsearchpipeModule
  ],

})
export class FollowingPageModule { }
