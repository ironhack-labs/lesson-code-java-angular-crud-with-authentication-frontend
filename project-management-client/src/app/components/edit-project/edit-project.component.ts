import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectManagementAPIService } from 'src/app/services/project-management-api.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: Project;

  updateProjectForm: FormGroup;
  titleInput: FormControl;
  descriptionInput: FormControl;

  constructor(
    private projectManagementAPIService: ProjectManagementAPIService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {
    this.titleInput = new FormControl('', []);
    this.descriptionInput = new FormControl('', []);
    this.updateProjectForm = new FormGroup({
      title: this.titleInput,
      description: this.descriptionInput,
    });

    this.project = new Project(null, '', '', []);
  }

  ngOnInit(): void {
    const projectId: number | null = this.activatedRoute.snapshot.params['id'];

    if (projectId !== null) {
      this.projectManagementAPIService.getProject(projectId).subscribe({
        next: (project: Project) => {
          this.project = project;

          // Set default values for form
          this.titleInput.setValue(project.title);
          this.descriptionInput.setValue(project.description);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  updateProject(): void {
    // Update project
    const project: Project = new Project(this.project.id, this.updateProjectForm.value.title, this.updateProjectForm.value.description, this.project.tasks);
    this.projectManagementAPIService.updateProject(project).subscribe({
      next: () => {
        // Redirect to detail page
        this.router.navigate(['/projects', this.project.id]);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteProject(): void {
    // Delete project
    this.projectManagementAPIService.deleteProject(this.project.id).subscribe({
      next: () => {
        // Redirect to project list
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
