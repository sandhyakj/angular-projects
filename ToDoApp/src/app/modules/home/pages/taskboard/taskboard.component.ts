import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { TaskStoreService} from '../../../../core/services/task-store.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators,FormArray } from '@angular/forms';

export enum Mode {
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
    id:[''],
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

  open(task:Task, content:any) {
    this.mode = Mode.edit;
    this.modalTitle = "Edit Item";
    this.taskForm.setValue({
      id:task.id,
      title: task.title,
      description: task.description,
      priority:task.priority,
      assignee:task.assignee.email,
      status:task.status,
      comments:task.comments,
      commentsentered:'',
      attachments:task.attachments,
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addTask(content:any) {
    this.mode = Mode.create;
    this.taskForm.setValue({
      id:'',
      title:'',
      description:'',
      priority:'',
      assignee:'',
      status:'',
      comments:[],
      commentsentered:'',
      attachments:[]
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSubmit(){
    let formvalue = this.taskForm.value;
    let payload = {
      id:formvalue.id,
      title: formvalue.title.trim(),
      description: formvalue.description.trim() !== ''? formvalue.description.trim() :formvalue.title.trim(),
      status: formvalue.status,
      priority: formvalue.priority,
      assignee: {
          name: 'Unassigned',
          email: ''
      },
      comments:formvalue.commentsentered.trim() !== ''? [...formvalue.comments, formvalue.commentsentered.trim()] : formvalue.comments,
      attachments:[] 
    };
    
    let assignee = this.tasksStore.assignees.find(item=> item.email == this.taskForm.value.assignee);
    if(assignee == undefined){
      payload.assignee = {name:'Unassigned', email:''};
    }else{
      payload.assignee = {name:assignee.name, email:assignee.email};
    }

    if(this.mode == Mode.create){
      this.tasksStore.addTask(payload);
    }else{
      this.tasksStore.saveTask(payload);
    }
    this.taskForm.reset();
    this.modalService.dismissAll();
  }
}
