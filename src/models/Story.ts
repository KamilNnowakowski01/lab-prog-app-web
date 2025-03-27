export enum Status {
  ToDo = "To Do",
  Doing = "Doing",
  Done = "Done"
}

export interface Story {
  id: string;
  name: string;
  description: string;
  projectId: string; // ID projektu
  createdAt: string; // ISO String
  status: Status;
  ownerId: string; //ID user
}
