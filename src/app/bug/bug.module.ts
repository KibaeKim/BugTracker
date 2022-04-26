import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugComponent } from './bug.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BugComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [BugComponent]
})
export class BugModule { }
