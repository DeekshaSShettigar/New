import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  exports: [
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule
  ]
})
export class DemoMaterialModule {}
