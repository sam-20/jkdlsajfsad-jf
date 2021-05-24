import { NgModule } from '@angular/core';
import { SearchnewgroupmembersPipe } from './searchnewgroupmembers/searchnewgroupmembers';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        SearchnewgroupmembersPipe
    ],

    imports: [
        IonicModule,
    ],

    exports: [
        SearchnewgroupmembersPipe
    ],

    entryComponents: [

    ]

})
export class SearchnewgroupmemberspipeModule { }