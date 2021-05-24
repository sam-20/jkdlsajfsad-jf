import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewallgroupsPage } from './viewallgroups';
import { GroupnamesearchpipeModule } from '../../pipes/groupnamesearchpipe.module';
import { SearchfollowerspipeModule } from '../../pipes/searchfollowerspipe.module';
import { SearchfollowingpipeModule } from '../../pipes/searchfollowingpipe.module';
import { SearchsearchpipeModule } from '../../pipes/searchsearchpipe.module';

@NgModule({
  declarations: [
    ViewallgroupsPage,
  ],

  imports: [
    IonicPageModule.forChild(ViewallgroupsPage),
    GroupnamesearchpipeModule,
    SearchfollowerspipeModule,
    SearchfollowingpipeModule,
    SearchsearchpipeModule
  ],

})
export class ViewallgroupsPageModule { }
