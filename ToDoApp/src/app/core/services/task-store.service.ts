import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {map} from 'rxjs/operators'
import { uniqueid } from '../../shared/components/uniqueid';
import { Task, assignee } from '../../shared/models/task.model';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {
  
  constructor(private dataService: DataService) {
    this.fetchAllTasks();
    this.getAssigneeList();
    this.getStatusList();
    this.getPriorityList();
  }

  // - Create one BehaviorSubject per store entity,as well as the observable$, and getters/setters
  private readonly _tasks = new BehaviorSubject<Task[]>([]);
  private readonly _assignees = new BehaviorSubject<assignee[]>([]);
  private readonly _priorities = new BehaviorSubject<String[]>([]);
  private readonly _statusus = new BehaviorSubject<String[]>([]);

  // Expose the observable$ part of the _taskss subject (read only stream)
  readonly tasks$ = this._tasks.asObservable();
  readonly assignees$ = this._assignees.asObservable();
  readonly priorities$ = this._priorities.asObservable();
  readonly statusus$ = this._statusus.asObservable();

  // we'll compose the tasks$ observable with map operator to create a stream of tasks with different status 

  readonly toDoTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(Task => Task.status == 'To Do'))
  )

  readonly inProgressTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(Task => Task.status == 'In Progress'))
  )

  readonly completedTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(Task => Task.status == 'Done'))
  )
  
  // the getter will return the last value emitted in _tasks subject
  get tasks(): Task[] {
    return this._tasks.getValue();
  }

  get assignees(): assignee[] {
    return this._assignees.getValue();
  }

  get priorities(): String[] {
    return this._priorities.getValue();
  }

  get statusus(): String[] {
    return this._statusus.getValue();
  } 

  // assigning a value to this.tasks will push it onto the observable 
  // and down to all of its subsribers (ex: this.tasks = [])
  set tasks(val: Task[]) {
    this._tasks.next(val);
  }

  set assignees(val: assignee[]) {
    this._assignees.next(val);
  }

  set priorities(val: String[]) {
    this._priorities.next(val);
  }

  set statusus(val: String[]) {
    this._statusus.next(val);
  }

  async saveTask(payload:Task) {
    let Task = this.tasks.find(Task => Task.id === payload.id);

    if(Task) {
      // optimistic update
      const index = this.tasks.indexOf(Task);
      this.tasks[index] = {...payload};
      this.tasks = [...this.tasks];

      try {
        await this.dataService
          .saveTask(Task)
          .toPromise();
      } catch (e) {
        console.error(e);
        this.tasks[index] = {...Task}
      }
    }
  }

  

  async addTask(payload:Task) {

    if(payload.title && payload.title.length) {

      // This is called an optimistic update
      // updating the record locally before actually getting a response from the server
      // this way, the interface seems blazing fast to the enduser
      // and we just assume that the server will return success responses anyway most of the time.
      // if server returns an error, we just revert back the changes in the catch statement 

      const tmpId = uniqueid();
      const tmpTodoTask = JSON.parse(JSON.stringify(payload));
      tmpTodoTask.id = tmpId;

      this.tasks = [
        ...this.tasks, 
        tmpTodoTask
      ];

      try {
        const Task = await this.dataService
          .create(tmpTodoTask)
          .toPromise();

        // we swap the local tmp record with the record from the server (id must be updated)
        const index = this.tasks.findIndex(t => t.id === tmpId);
        this.tasks[index] = {
          ...Task
        }
        this.tasks = [...this.tasks];
      } catch (e) {
        // is server sends back an error, we revert the changes
        console.error(e);
        this.removeTask(tmpId, false);
      }
      
    }

  }

  async removeTask(id: string, serverRemove = true) {
    // optimistic update
    const Task = this.tasks.filter(t => t.id === id);
    this.tasks = this.tasks.filter(Task => Task.id !== id);

    if(serverRemove) {
      try {
        await this.dataService.remove(id).toPromise();
      } catch (e) {
        console.error(e);
        this.tasks = [...this.tasks, ...Task];
      }
    }

  }

  async setTaskStatus(id: string, newstatus: string, oldstatus:string) {
    let Task = this.tasks.find(Task => Task.id === id);

    if(Task) {
      // optimistic update
      const index = this.tasks.indexOf(Task);

      this.tasks[index] = {
        ...Task,
        status:newstatus
      }

      this.tasks = [...this.tasks];

      try {
        await this.dataService
          .setStatus(id, newstatus)
          .toPromise();
      } catch (e) {
        console.error(e);
        this.tasks[index] = {
          ...Task,
          status:oldstatus
        }
      }
    }
  }

  async setTaskPriority(id: string, newpriority: string, oldpriority:string) {
    let Task = this.tasks.find(Task => Task.id === id);

    if(Task) {
      // optimistic update
      const index = this.tasks.indexOf(Task);

      this.tasks[index] = {
        ...Task,
        priority:newpriority
      }

      this.tasks = [...this.tasks];

      try {
        await this.dataService
          .setTaskPriority(id, newpriority)
          .toPromise();
      } catch (e) {
        console.error(e);
        this.tasks[index] = {
          ...Task,
          priority:oldpriority
        }
      }
    }
  }

  async setTaskAssignee(id: string, newassignee: assignee, oldassignee:assignee) {
    let Task = this.tasks.find(Task => Task.id === id);

    if(Task) {
      // optimistic update
      const index = this.tasks.indexOf(Task);

      this.tasks[index] = {
        ...Task,
        assignee:newassignee
      }

      this.tasks = [...this.tasks];

      try {
        await this.dataService
          .setTaskAssignee(id, newassignee)
          .toPromise();
      } catch (e) {
        console.error(e);
        this.tasks[index] = {
          ...Task,
          assignee:oldassignee
        }
      }
    }
  }

  async setTaskTitle(id: string, newtitle: string, oldtitle:string) {
    let Task = this.tasks.find(Task => Task.id === id);

    if(Task) {
      // optimistic update
      const index = this.tasks.indexOf(Task);

      this.tasks[index] = {
        ...Task,
        title:newtitle
      }

      this.tasks = [...this.tasks];

      try {
        await this.dataService
          .setTaskTitle(id, newtitle)
          .toPromise();
      } catch (e) {
        console.error(e);
        this.tasks[index] = {
          ...Task,
          title:oldtitle
        }
      }
    }
  }

  async setTaskDescription(id: string, newdescription: string, olddescription:string) {
    let Task = this.tasks.find(Task => Task.id === id);

    if(Task) {
      // optimistic update
      const index = this.tasks.indexOf(Task);

      this.tasks[index] = {
        ...Task,
        description:newdescription
      }

      this.tasks = [...this.tasks];

      try {
        await this.dataService
          .setTaskDescription(id, newdescription)
          .toPromise();
      } catch (e) {
        console.error(e);
        this.tasks[index] = {
          ...Task,
          description:olddescription
        }
      }
    }
  }

  async fetchAllTasks() {
    this.tasks = await this.dataService.getAllTasks().toPromise();
  }

  async getAssigneeList() {
    this.assignees = await this.dataService.getAssigneeList().toPromise();
  }

  async getStatusList() {
    this.statusus = await this.dataService.getStatusList().toPromise();
  }

  async getPriorityList() {
    this.priorities = await this.dataService.getPriorityList().toPromise();
  }

}
