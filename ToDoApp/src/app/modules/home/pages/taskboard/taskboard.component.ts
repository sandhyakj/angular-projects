import { Component, OnInit, ChangeDetectionStrategy, } from '@angular/core';
import { TaskStoreService} from '../../../../core/services/task-store.service';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskboardComponent implements OnInit {

  tasksTrackFn = (i: number, task: { id: string; }) => task.id;

  constructor(public tasksStore: TaskStoreService) { }

  ngOnInit(): void {
  }

}
