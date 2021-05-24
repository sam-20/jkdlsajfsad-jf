import { NgModule } from '@angular/core';
import { SearchfollowersPipe } from './searchfollowers/searchfollowers';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        SearchfollowersPipe
    ],

    imports: [
        IonicModule,
    ],

    exports: [
        SearchfollowersPipe
    ],

    entryComponents: [
       
    ]

})
export class SearchfollowerspipeModule { }
