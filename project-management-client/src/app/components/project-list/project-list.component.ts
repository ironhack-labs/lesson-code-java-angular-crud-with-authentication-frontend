import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectManagementAPIService } from 'src/app/services/project-management-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];

  constructor(
    private projectManagementAPIService: ProjectManagementAPIService
  ) {
    this.projects = []
  }

  ngOnInit(): void {
    this.updateProjectList();
  }

  updateProjectList() {
    this.projectManagementAPIService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
