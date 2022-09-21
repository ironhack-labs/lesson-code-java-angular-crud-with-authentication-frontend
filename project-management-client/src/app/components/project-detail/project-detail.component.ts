import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectManagementAPIService } from 'src/app/services/project-management-api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: Project;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectManagementAPIService: ProjectManagementAPIService
  ) {
    this.project = new Project(null, '', '', []);
  }

  ngOnInit(): void {
    this.reloadProject();
  }

  reloadProject(): void {
    const projectId: number | null = this.activatedRoute.snapshot.params['id'];

    if (projectId !== null) {
      this.projectManagementAPIService.getProject(projectId).subscribe({
        next: (project: Project) => {
          this.project = project;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

}
