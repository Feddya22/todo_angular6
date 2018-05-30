import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIterationFormComponent } from '../add-iteration-form/add-iteration-form.component';
import { IterationsComponent } from './iterations.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AddIterationFormComponent,
    IterationsComponent
  ],
  bootstrap: [
    IterationsComponent
  ]
})
export class IterationsModule { }
