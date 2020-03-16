import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpeFormComponent } from '../cpe-form.component';
import { DemoMaterialModule } from 'src/app/material-module';



@NgModule({
  declarations: [CpeFormComponent],
  imports: [
    CommonModule,
    DemoMaterialModule
  ]
})
export class CpeFormModule { }
