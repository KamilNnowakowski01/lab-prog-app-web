export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high"
}

export enum Status {
  ToDo = "To Do",
  Doing = "Doing",
  Done = "Done"
}

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: string;
  estimatedHours: number;
  status: Status;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  assignedUserId?: string;
}
