import { NgModule } from '@angular/core';
import { GroupnamesearchPipe } from './groupnamesearch/groupnamesearch';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        GroupnamesearchPipe
    ],

    imports: [
        IonicModule,
    ],

    exports: [
        GroupnamesearchPipe
    ],

    entryComponents: [
        
    ]

})
export class GroupnamesearchpipeModule { }
