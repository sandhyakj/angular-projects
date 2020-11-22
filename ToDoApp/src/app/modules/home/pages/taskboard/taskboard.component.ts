import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { TaskStoreService} from '../../../../core/services/task-store.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators,FormArray } from '@angular/forms';

export enum Mode {
  view, 
  edit, 
  create
}

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskboardComponent implements OnInit, OnDestroy {

  tasksTrackFn = (i:any, task:Task) => task.id; 
  public mode = Mode.create;
  public modalTitle:string = 'Add New Item';
  public taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority:['', Validators.required],
    assignee:[''],
    status:['', Validators.required],
    comments:[[]],
    commentsentered:[''],
    attachments:[[]]
  });

  constructor(public tasksStore: TaskStoreService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSubmit(){
    let formvalue = this.taskForm.value;
    let payload = {
      id: '',
      title: formvalue.title.trim(),
      description: formvalue.description.trim() !== ''? formvalue.description.trim() :formvalue.title.trim(),
      status: formvalue.status,
      priority: formvalue.priority,
      assignee: {
          name: 'Unassigned',
          email: ''
      },
      comments:formvalue.commentsentered.trim() !== ''? formvalue.comments : [...formvalue.comments,formvalue.commentsentered.trim()],
      attachments:[] 
    };
    
    let assignee = this.tasksStore?.assignees.find(item=> item.email == this.taskForm.get('assignee')?.value);
    if(assignee == undefined){
      formvalue.assignee = {name:'Unassigned', email:''};
    }else{
      formvalue.assignee = {name:assignee.name, email:assignee.email};
    }

    this.tasksStore.addTask(payload);
  }
}
