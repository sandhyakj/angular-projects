import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TaskboardComponent } from './pages/taskboard/taskboard.component';
import { TaskComponent } from './pages/taskboard/task/task.component';
import { ReactiveFormsModule} from '@angular/forms';
import { CountryDisplayComponent } from './pages/country-display/country-display.component';

@NgModule({
  declarations: [TaskboardComponent, TaskComponent, CountryDisplayComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
