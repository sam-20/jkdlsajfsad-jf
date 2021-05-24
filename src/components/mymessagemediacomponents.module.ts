import { NgModule } from '@angular/core';
import { MymessagemediaComponent } from './mymessagemedia/mymessagemedia';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        MymessagemediaComponent,
    ],

    imports: [
        IonicModule,
    ],

    exports: [
        MymessagemediaComponent,
    ],

    entryComponents: [
        MymessagemediaComponent
    ]
})
export class MymessagemediacomponentsModule { } 
