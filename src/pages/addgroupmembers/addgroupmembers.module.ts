import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddgroupmembersPage } from './addgroupmembers';
import { GroupnamesearchpipeModule } from '../../pipes/groupnamesearchpipe.module';
import { SearchfollowerspipeModule } from '../../pipes/searchfollowerspipe.module';
import { SearchfollowingpipeModule } from '../../pipes/searchfollowingpipe.module';
import { SearchsearchpipeModule } from '../../pipes/searchsearchpipe.module';
import { SearchnewgroupmemberspipeModule } from '../../pipes/searchnewgroupmemberspipe.module';

@NgModule({
  declarations: [
    AddgroupmembersPage,
  ],
  
  imports: [
    IonicPageModule.forChild(AddgroupmembersPage),
    GroupnamesearchpipeModule,
    SearchfollowerspipeModule,
    SearchfollowingpipeModule,
    SearchsearchpipeModule,
    SearchnewgroupmemberspipeModule
  ],

})
export class AddgroupmembersPageModule {}
