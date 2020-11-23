import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task:Task = {
    id: '',
    title: '',
    description: '',
    status: '',
    priority: '',
    assignee: {
        name: '',
        email:'',
    },
    comments:[],
    attachments:[]
  };
  
  @Output() remove = new EventEmitter<string>();
  @Output() openItem = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

  openTaskItem(task:Task){
    this.openItem.emit(task);
  }
}
