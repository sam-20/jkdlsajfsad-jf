import { NgModule } from '@angular/core';
import { SearchfollowingPipe } from './searchfollowing/searchfollowing';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        SearchfollowingPipe
    ],

    imports: [
        IonicModule,
    ],

    exports: [
        SearchfollowingPipe
    ],

    entryComponents: [
       
    ]

})
export class SearchfollowingpipeModule { }
