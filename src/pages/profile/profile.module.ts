import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { PinnedmessagescomponentsModule } from '../../components/pinnedmessagescomponents.module'
import { MymessagemediacomponentsModule } from '../../components/mymessagemediacomponents.module'
import { Mymessagemedia2componentsModule } from '../../components/mymessagemedia2components.module'
import { Likedmessages2componentsModule } from '../../components/likedmessages2components.module'

@NgModule({
  declarations: [
    ProfilePage,
  ],

  imports: [
    IonicPageModule.forChild(ProfilePage),
    PinnedmessagescomponentsModule,
    Mymessagemedia2componentsModule,
    Likedmessages2componentsModule,
    MymessagemediacomponentsModule
  ],

})
export class ProfilePageModule { }
