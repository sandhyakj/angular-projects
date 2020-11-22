export interface Task {
    id?: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee: assignee;
  }

  export interface assignee {
    name: string; 
    email:string;
  }