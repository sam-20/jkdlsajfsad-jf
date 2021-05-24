import { NgModule } from '@angular/core';
import { PinnedmessagesComponent } from './pinnedmessages/pinnedmessages';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        PinnedmessagesComponent
    ],

    imports: [
        IonicModule,
    ],

    exports: [
        PinnedmessagesComponent,
    ],

    entryComponents: [
        PinnedmessagesComponent
    ]
})
export class PinnedmessagescomponentsModule { } //1.......export the module like this
