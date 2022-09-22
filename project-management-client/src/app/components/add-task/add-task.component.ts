import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { ProjectManagementAPIService } from 'src/app/services/project-management-api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output()
  taskCreatedEvent: EventEmitter<void>; 

  @Input()
  projectId!: number | null;

  createTaskForm: FormGroup;
  titleInput: FormControl;
  descriptionInput: FormControl;

  constructor(
    private projectManagementAPIService: ProjectManagementAPIService
  ) {
    this.titleInput = new FormControl('', [Validators.required]);
    this.descriptionInput = new FormControl('', [Validators.required]);
    this.createTaskForm = new FormGroup({
      title: this.titleInput,
      description: this.descriptionInput,
    });

    this.taskCreatedEvent = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  createTask(): void {
    const task: Task = new Task(null, this.createTaskForm.value.title, this.createTaskForm.value.description, this.projectId);

    // Store task in database
    this.projectManagementAPIService.createTask(task).subscribe({
      next: () => {

        // Reset form
        this.titleInput.setValue('');
        this.descriptionInput.setValue('');

        // Trigger event to update task list
        this.taskCreatedEvent.emit();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
