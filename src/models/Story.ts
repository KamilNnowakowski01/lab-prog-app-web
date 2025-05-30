export enum Status {
  ToDo = "To Do",
  Doing = "Doing",
  Done = "Done"
}

export interface Story {
  projectId: string;
  ownerId: string;
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: Status;
}
