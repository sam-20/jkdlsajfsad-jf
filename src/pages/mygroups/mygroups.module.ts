import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MygroupsPage } from './mygroups';

@NgModule({
  declarations: [
    MygroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(MygroupsPage),
  ],
})
export class MygroupsPageModule {}
