import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MymessagesPage } from './mymessages';

@NgModule({
  declarations: [
    MymessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(MymessagesPage),
  ],
})
export class MymessagesPageModule {}
