import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskboardComponent } from './pages/taskboard/taskboard.component';
import { CountryDisplayComponent } from './pages/country-display/country-display.component';

const routes: Routes = [
  {
    path: '',
    component: TaskboardComponent
  },
  {
    path: 'countrydisplay',
    component: CountryDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
