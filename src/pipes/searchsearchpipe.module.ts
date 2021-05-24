import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        SearchPipe
    ],

    imports: [
        IonicModule,
    ],

    exports: [
        SearchPipe
    ],

    entryComponents: [
        
    ]

})
export class SearchsearchpipeModule { }
