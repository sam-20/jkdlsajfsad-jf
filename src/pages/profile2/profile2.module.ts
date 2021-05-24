import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profile2Page } from './profile2';
import { PinnedmessagescomponentsModule } from '../../components/pinnedmessagescomponents.module'
import { MymessagemediacomponentsModule } from '../../components/mymessagemediacomponents.module'
import { Mymessagemedia2componentsModule } from '../../components/mymessagemedia2components.module'
import { Likedmessages2componentsModule } from '../../components/likedmessages2components.module'

@NgModule({
  declarations: [
    Profile2Page,
  ],

  imports: [
    IonicPageModule.forChild(Profile2Page),
    PinnedmessagescomponentsModule,
    Mymessagemedia2componentsModule,
    Mymessagemedia2componentsModule,
    Likedmessages2componentsModule,
    MymessagemediacomponentsModule
  ],

})
export class Profile2PageModule { }
