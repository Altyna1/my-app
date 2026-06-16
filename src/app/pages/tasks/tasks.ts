import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {

  taskForm: FormGroup;

  tasks: Task[] = [];

  searchTerm = '';

  editingTaskId: number | null = null;

constructor(
  private fb: FormBuilder,
  private taskService: TaskService,
  private router: Router
){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  saveTask(): void {

    if (this.taskForm.invalid) {
      return;
    }

    if (this.editingTaskId) {

      const updatedTask: Task = {
        id: this.editingTaskId,
        ...this.taskForm.value
      };

      this.taskService.updateTask(updatedTask);

      this.editingTaskId = null;

    } else {

      const newTask: Task = {
        id: Date.now(),
        ...this.taskForm.value
      };

      this.taskService.addTask(newTask);
    }

    this.loadTasks();

    this.taskForm.reset();
  }

  editTask(task: Task): void {

    this.editingTaskId = task.id;

    this.taskForm.patchValue({
      title: task.title,
      description: task.description
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  logout(): void {
  localStorage.removeItem('isAuth');
  localStorage.removeItem('currentUser');

  this.router.navigate(['/login']);
}

  get filteredTasks(): Task[] {

    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}