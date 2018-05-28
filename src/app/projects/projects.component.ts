import { Component, OnInit } from '@angular/core';
import { Projects } from '../_models/projects.model';
import { AuthServices } from '../_shared/auth.service';
import { Router } from '@angular/router';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [
    ProjectsService,
    AuthServices
  ]
})
export class ProjectsComponent implements OnInit {

  public projects: Projects[] = [];
  public addProjectButton = false;
  public errorMessage: string;

  constructor(
    private projectsService: ProjectsService,
    private auth: AuthServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  addProjectButtonFn() {
    this.addProjectButton = this.addProjectButton === false ? true : false;
  }

  getProjects() {
    this.projectsService.getProjects(this.auth.userId)
        .subscribe(result => this.projects = result);
  }

  openProject(projectId: string, projectName: string) {
    this.router.navigate(['/dashboard/project/', projectId]);
  }

  // change recived data
  addProject(projectName: string) {
    this.projectsService.addProject(this.auth.userId, projectName)
      .subscribe(result => console.log(result));
  }

  deleteProject(projectId: string) {
    this.projectsService.deleteProject(projectId, this.auth.userId)
      .subscribe(result => console.log(result));
  }

}
