export interface Task {
    id?: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee: assignee;
    comments:Array<object>;
    attachments:Array<string>;
  }

  export interface assignee {
    name: string; 
    email:string;
  }