import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { MatToolbarModule, MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButtonModule, MatButton, MatAnchor } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { SignupComponent } from './signup/signup.component';
import { IterationsComponent } from './iterations/iterations.component';
import { AuthGuardService } from './_shared/auth-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { AuthServices } from './_shared/auth.service';
import { AddIterationFormComponent } from './add-iteration-form/add-iteration-form.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';

const routs: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: 'projects', component: ProjectsComponent },
      { path: 'project/:idProject', component: IterationsComponent, children: [
        { path: 'iteration/:idIteration', component: TasksComponent}
      ]},
      { path: '', redirectTo: '/dashboard/projects', pathMatch: 'full' }
    ]
  },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ProjectsComponent,
    TasksComponent,
    SignupComponent,
    IterationsComponent,
    NotfoundComponent,
    AddIterationFormComponent,
    AddTaskFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routs),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthGuardService,
    AuthServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
