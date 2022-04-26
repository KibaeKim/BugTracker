import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { BugComponent } from 'src/app/bug/bug.component';
import { BugModule } from 'src/app/bug/bug.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    BugModule,
    RouterModule.forChild([
      { path: '', component: HomePageComponent }
    ])
  ]
})
export class HomePageModule {
  constructor() { }
}
