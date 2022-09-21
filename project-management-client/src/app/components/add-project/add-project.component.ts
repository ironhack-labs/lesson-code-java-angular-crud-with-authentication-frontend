import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    this.titleInput = new FormControl('', []);
    this.descriptionInput = new FormControl('', []);
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

        // Update project list
        this.projectCreatedEvent.emit();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
