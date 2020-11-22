import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskboardComponent } from './pages/taskboard/taskboard.component';

const routes: Routes = [
  {
    path: '',
    component: TaskboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
