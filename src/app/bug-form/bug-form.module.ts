import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugFormComponent } from './bug-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BugFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    BugFormComponent,
  ]
})
export class BugFormModule { }
