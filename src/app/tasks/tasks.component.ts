import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServices } from '../_shared/auth.service';
import { Tasks } from '../_models/tasks.model';
import { TaskService } from './task.service';
import { ShareService } from '../_shared/share.service';
import { Subscribable, Subscription } from 'rxjs';
import { AddTaskFormComponent } from '../add-task-form/add-task-form.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [
    TaskService,
    AuthServices
  ]
})
export class TasksComponent implements OnInit, OnDestroy {

  public projectId: string;
  public iterationId: string;
  public message: string;
  private todo: Tasks[] = [];
  private doing: Tasks[] = [];
  private done: Tasks[] = [];
  private backlog: Tasks[] = [];
  private currentTask: Tasks;

  public toggleBacklog: boolean;
  public modalAddTask: boolean;
  public subscriptionBacklog: Subscription;
  public subscriptionAddTask: Subscription;

  public title: string;
  public isEdit: boolean;

  @ViewChild(AddTaskFormComponent) addTaskForm;

  constructor(
    private tasksService: TaskService,
    private auth: AuthServices,
    private actRoute: ActivatedRoute,
    private share: ShareService,
    private router: Router
  ) {
    this.subscriptionBacklog = this.share.getStatus().subscribe(isToggle => {
      this.toggleBacklog = isToggle;
    });
    this.subscriptionAddTask = this.share.getAddTaskStatus().subscribe(isAdd => {
      this.modalAddTask = true;
      this.title = 'Add task';
      this.isEdit = false;
    });
  }

  ngOnInit() {
    this.actRoute.parent.params.subscribe((parentParams) => {
      this.projectId = parentParams['idProject'];
      this.actRoute.params.subscribe((childParams) => {
        this.iterationId = childParams['idIteration'];
        this.getTasks();
      });
    });
  }

  ngOnDestroy() {
    this.subscriptionBacklog.unsubscribe();
  }

  getTasks() {
    this.done.length = this.doing.length = this.todo.length = 0;
    this.backlog.length = 0;
    this.tasksService.getListOfTasks(this.projectId, this.iterationId)
      .subscribe(result => result.forEach(item => {
        if (item.inBacklog === false) {
          if (item.status === 'todo') {
            this.todo.push(item);
          } else if (item.status === 'doing') {
            this.doing.push(item);
          } else {
            this.done.push(item);
          }
        } else {
          this.backlog.push(item);
        }
      }));
  }

  addTask(
    taskName: string,
    description: string,
    status: string,
    points: string
  ) {
    this.tasksService.addTask(taskName, description, status,
      points, this.auth.userId, this.projectId, this.iterationId)
      .subscribe(result => {
        if (status === 'todo') {
          this.todo.push(result);
        } else if (status === 'doing') {
          this.doing.push(result);
        } else {
          this.done.push(result);
        }
      });
  }

  deleteTask(taskId: string) {
    this.tasksService.deleteTask(taskId)
      .subscribe(result  => {
        console.log(result);
        this.ngOnInit();
      });
  }

  editTask(taskId: string, task: string, status: string, describe: string, points: number) {
    const taskObj = {
      task: task,
      status: status,
      describe: describe,
      points: points
    };
    this.tasksService.editTask(taskId, taskObj)
      .subscribe(result => {
        this.message = result;
        this.ngOnInit();
      });
  }

  changeStatus(taskId: string, status: string) {
    const taskObj = {
      status: status
    };
    this.tasksService.editTask(taskId, taskObj)
      .subscribe(result  => {
        console.log(result);
        this.ngOnInit();
      });
  }

  toBacklog(taskId: string, status: string) {
    const taskObj = {
      inBacklog: true
    };
    this.tasksService.editTask(taskId, taskObj)
      .subscribe(result  => {
        if (status === 'todo') {
          this.todo.forEach((todo, i) => {
            if (todo['_id'] === taskId) {
              todo['inBacklog'] = true;
              this.backlog.push(this.todo.splice(i, 1)[0]);
            }
          });
        } else if (status === 'doing') {
          this.doing.forEach((doing, i) => {
            if (doing['_id'] === taskId) {
              doing['inBacklog'] = true;
              this.backlog.push(this.doing.splice(i, 1)[0]);
            }
          });
        } else {
          this.done.forEach((done, i) => {
            if (done['_id'] === taskId) {
              done['inBacklog'] = true;
              this.backlog.push(this.done.splice(i, 1)[0]);
            }
          });
        }
      });
  }

  fromBackLog(taskId: string) {
    const taskObj = {
      inBacklog: false
    };
    this.tasksService.editTask(taskId, taskObj)
      .subscribe(result  => {
        this.backlog.forEach((item, i) => {
          if (item['_id'] === taskId) {
            item['inBacklog'] = false;
            if (item['status'] === 'todo') {
              this.todo.push(this.backlog.splice(i, 1)[0]);
            } else if (item['status'] === 'doing') {
              this.doing.push(this.backlog.splice(i, 1)[0]);
            } else {
              this.done.push(this.backlog.splice(i, 1)[0]);
            }
          }
        });
      });
  }

  modalAddTaskWindow(isConfirm: boolean) {
    this.modalAddTask = false;
    if (isConfirm) {
      console.log(this.addTaskForm.points);
      if (!this.addTaskForm.isEdited) {
        // this.addTask(
        //   this.addTaskForm.taskName,
        //   this.addTaskForm.description,
        //   this.addTaskForm.status,
        //   this.addTaskForm.points
        // );
      } else {

      }
    } else {
      console.log('Cancel');
    }
  }

}
