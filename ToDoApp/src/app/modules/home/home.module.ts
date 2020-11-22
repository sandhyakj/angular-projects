import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TaskboardComponent } from './pages/taskboard/taskboard.component';


@NgModule({
  declarations: [TaskboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
