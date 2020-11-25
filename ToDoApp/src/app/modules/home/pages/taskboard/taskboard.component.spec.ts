import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Mode, TaskboardComponent } from './taskboard.component';
import { ReactiveFormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TaskboardComponent', () => {
  let component: TaskboardComponent;
  let fixture: ComponentFixture<TaskboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskboardComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain Todo, InProgress &  Completed Headers', () => {
    const compiled = fixture.debugElement.query(By.css('.row')).nativeElement;
    expect(compiled.innerHTML).toContain('To Do');
    expect(compiled.innerHTML).toContain('In Progress');
    expect(compiled.innerHTML).toContain('Completed');
  });

  it('should contain Add Task Button', () => {
    const compiled = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(compiled.innerHTML).toBe('Add Task');
  });


  it('Should open the Modal Component on add task', () => {
    const buttonElement = fixture.debugElement.query(By.css('.add-task'));
    spyOn(component, 'addTask');
    buttonElement.triggerEventHandler('click', null);  
    expect(component.addTask).toHaveBeenCalled();
  });

  it('Should open the Modal Component in Add Mode', () => {
    const buttonElement = fixture.debugElement.query(By.css('.add-task'));
    buttonElement.triggerEventHandler('click', null);
    expect(component.mode).toBe(Mode.create);
  });

  it('Should open the Modal Component in Edit Mode', () => {
    const content = fixture.debugElement.query(By.css('#content'));
    const task = {
      "id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxx1",
      "title": "BA Task - Requirement Analysis",
      "description": "Requirement Analysis after user story elaboration",
      "status": "Done",
      "priority": "Major",
      "assignee": {
          "name": "Samarth KN",
          "email": "samarth-kn@gmail.com"
      },
      "comments":[],
      "attachments":[]          
    };
    component.open(task,content); 
    expect(component.mode).toBe(Mode.edit);
  });
});
