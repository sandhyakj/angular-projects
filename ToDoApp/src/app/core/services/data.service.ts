import { Injectable } from '@angular/core';
import { assignee, Task } from '../../shared/models/task.model';
import { countryDetail } from '../../shared/models/countryDetail.model';

import {map, shareReplay} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  setTaskDescription(id: string, newdescription: string) {
    return of(true);
  }
  setTaskTitle(id: string, newtitle: string) {
    return of(true);
  }
  setTaskAssignee(id: string, newassignee: assignee) {
    return of(true);
  }
  setTaskPriority(id: string, newpriority: string) {
    return of(true);
  }

  private readonly apiBaseUrl = 'assets';

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get<any>(`${this.apiBaseUrl}/mockdata/data.json`).pipe(
      map(res => res['tasks'])
    );
  }

  getAssigneeList() {
    return this.http.get<any>(`${this.apiBaseUrl}/mockdata/data.json`).pipe(
      map(res => res['assignee'])
    );
  }

  getStatusList() {
    return this.http.get<any>(`${this.apiBaseUrl}/mockdata/data.json`).pipe(
      map(res => res['status'])
    );
  }

  getPriorityList() {
    return this.http.get<any>(`${this.apiBaseUrl}/mockdata/data.json`).pipe(
      map(res => res['priority'])
    );
  }
  
  create(task: Task) {
    return of(task);
  }
  
  saveTask(task: Task) {
    return of(task);
  }

  remove(id:string) {
    return of(true);
  }

  setStatus(id: string, status: string) {
    return of(true);
  }

  getCountryDetails() :Observable<countryDetail>{
    let apiurl = 'https://restcountries.eu/rest/v2/alpha/col';
    return this.http.get<countryDetail>(apiurl);
  }
}
