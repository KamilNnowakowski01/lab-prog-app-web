export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum Status {
  ToDo = "To Do",
  Doing = "Doing",
  Done = "Done",
}

export interface Task {
  storyId: string;
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  estimatedHours: number;
  status: Status;
  createdAt: string;
  startDate?: string | null;
  endDate?: string | null;
  assignedUserId?: string | null;
}
