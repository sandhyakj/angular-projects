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

  constructor() { }

  ngOnInit(): void {
  }

  getRandomColor() {
    var max = 0xffffff;
    return '#' + Math.round( Math.random() * max ).toString( 16 );
  }
}
