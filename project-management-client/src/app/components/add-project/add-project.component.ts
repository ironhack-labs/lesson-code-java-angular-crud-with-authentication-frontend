import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { ProjectManagementAPIService } from 'src/app/services/project-management-api.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  @Output()
  projectCreatedEvent: EventEmitter<void>; 

  createProjectForm: FormGroup;
  titleInput: FormControl;
  descriptionInput: FormControl;

  constructor(
    private projectManagementAPIService: ProjectManagementAPIService
  ) {
    this.titleInput = new FormControl('', [Validators.required]);
    this.descriptionInput = new FormControl('', [Validators.required]);
    this.createProjectForm = new FormGroup({
      title: this.titleInput,
      description: this.descriptionInput,
    });

    this.projectCreatedEvent = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  createProject(): void {
    const project: Project = new Project(null, this.createProjectForm.value.title, this.createProjectForm.value.description, []);

    // Store project in database
    this.projectManagementAPIService.createProject(project).subscribe({
      next: () => {

        // Reset form
        this.titleInput.setValue('');
        this.descriptionInput.setValue('');

        // Update project list
        this.projectCreatedEvent.emit();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
