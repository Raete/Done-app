import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
    imports: [
        MatButtonModule, 
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatDialogModule
    ],

    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatDialogModule
    ],

    providers: [
        { 
            provide: DateAdapter, 
            useClass: MomentDateAdapter, 
            deps: [MAT_DATE_LOCALE]
        },
        {   
            provide: MAT_DATE_FORMATS, 
            useValue: MAT_MOMENT_DATE_FORMATS
        },
    ],
})

export class MaterialModule { }