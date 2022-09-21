import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementAPIService {

  readonly API_URL = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) { }

  getProjects(): Observable<Project[]> {
    const options = {
      headers: this.getAuthHeader()
    };
    return this.http.get<Project[]>(`${this.API_URL}/projects`, options);
  }

  getProject(id: number): Observable<Project> {
    const options = {
      headers: this.getAuthHeader()
    };
    return this.http.get<Project>(`${this.API_URL}/projects/${id}`, options);
  }

  createProject(project: Project): Observable<void> {
    const options = {
      headers: this.getAuthHeader()
    };
    return this.http.post<void>(`${this.API_URL}/projects`, project, options);
  }

  updateProject(project: Project): Observable<Project> {
    const options = {
      headers: this.getAuthHeader()
    };
    return this.http.put<Project>(`${this.API_URL}/projects/${project.id}`, project, options);
  }

  deleteProject(id: number | null): Observable<Project> {
    const options = {
      headers: this.getAuthHeader()
    };
    return this.http.delete<Project>(`${this.API_URL}/projects/${id}`, options);
  }

  createTask(task: Task): Observable<void> {
    const options = {
      headers: this.getAuthHeader()
    };
    return this.http.post<void>(`${this.API_URL}/tasks`, task, options);
  }

  private getAuthHeader(): HttpHeaders {
    // Get the token from the local storage
    const token: string | null = localStorage.getItem('authToken');
    if (token === null) {
      throw null;
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

}
