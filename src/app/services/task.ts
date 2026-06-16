import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private getStorageKey(): string {

    const currentUser = localStorage.getItem('currentUser');

    return `tasks_${currentUser}`;
  }

  getTasks(): Task[] {
    return JSON.parse(
      localStorage.getItem(this.getStorageKey()) || '[]'
    );
  }

  addTask(task: Task): void {

    const tasks = this.getTasks();

    tasks.push(task);

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(tasks)
    );
  }

  deleteTask(id: number): void {

    const tasks = this.getTasks().filter(
      task => task.id !== id
    );

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(tasks)
    );
  }

  updateTask(updatedTask: Task): void {

    const tasks = this.getTasks().map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(tasks)
    );
  }
}