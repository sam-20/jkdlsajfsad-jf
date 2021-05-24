import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { GroupnamesearchpipeModule } from '../../pipes/groupnamesearchpipe.module';
import { SearchfollowerspipeModule } from '../../pipes/searchfollowerspipe.module';
import { SearchfollowingpipeModule } from '../../pipes/searchfollowingpipe.module';
import { SearchsearchpipeModule } from '../../pipes/searchsearchpipe.module';

@NgModule({
  declarations: [
    SearchPage,
  ],

  imports: [
    IonicPageModule.forChild(SearchPage),
    GroupnamesearchpipeModule,
    SearchfollowerspipeModule,
    SearchfollowingpipeModule,
    SearchsearchpipeModule,
  ],

})
export class SearchPageModule {}
