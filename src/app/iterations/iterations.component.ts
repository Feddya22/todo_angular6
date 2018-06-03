import { Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Iterations } from '../_models/iterations.model';
import { Router, ActivatedRoute } from '@angular/router';
import { IterationService } from './iteration.service';
import { AuthServices } from '../_shared/auth.service';
import { AddIterationFormComponent } from '../add-iteration-form/add-iteration-form.component';
import { ShareService } from '../_shared/share.service';

@Component({
  selector: 'app-iterations',
  templateUrl: './iterations.component.html',
  styleUrls: ['./iterations.component.css'],
  providers: [
    IterationService,
    AuthServices
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class IterationsComponent implements OnInit {

  public iterations: Iterations[] = [];
  public projectId: string;
  public sidebarOpened = true;
  public messages: string;

  public iterationModal = false;

  public iterationId: string;
  public title: string;
  public iterationName: string;
  public startDateIter: Date;
  public endDateIter: Date;

  public isEdited: boolean;
  public isDate: boolean;
  public backlogToggle: boolean;

  @ViewChild(AddIterationFormComponent) iterationMW;

  constructor(
    private iterService: IterationService,
    private actRoute: ActivatedRoute,
    private share: ShareService,
    private router: Router
  ) {}

  ngOnInit() {
    this.actRoute.params.subscribe((params) => {
      this.projectId = params['idProject'];
    });
    this.getIterations();
  }

  getIterations() {
    this.iterService.getIterations(this.projectId)
      .subscribe(result => {
        this.iterations = result;
      }, error => this.messages = error);
  }

  addIteration(iteration: object) {
    iteration['idProject'] = this.projectId;
    this.iterService.addIteration(iteration)
      .subscribe(
        result => this.iterations.push(result.addedIteration),
        error => this.messages = error
      );
  }

  updateIteration(iteration: object) {
    this.iterService.updateIteration(iteration, this.iterationId)
      .subscribe(
        result => {
          this.iterations.forEach(item => {
            if (item['_id'] === this.iterationId) {
              item['name'] = iteration['name'];
              item['startDate'] = iteration['startDate'];
              item['endDate'] = iteration['endDate'];
              this.startDateIter = iteration['startDate'];
              this.endDateIter = iteration['endDate'];
            }
          });
        },
        error => console.log(error)
      );
  }

  openTasksList(iteration: Iterations) {
    this.iterationId = iteration._id;
    this.iterationName = iteration.name;
    this.startDateIter = new Date(iteration.startDate);
    this.endDateIter = new Date(iteration.endDate);
    this.isDate = true;
    this.router.navigate(['dashboard/project/', this.projectId, 'iteration', this.iterationId]);
  }

  addTask() {
    this.share.sendAddTaskStatus(true);
  }

  addIterationModal() {
    this.title = 'Add iteration';
    this.isEdited = false;
    this.iterationModal = true;
  }

  editIterationModal(iteration: Iterations) {
    this.title = 'Edit iteration';
    this.isEdited = true;
    this.iterationModal = true;
  }

  toggleSidebar() {
    this.sidebarOpened = this.sidebarOpened === false ? true : false;
  }

  toggleBacklog() {
    this.share.sendStatus(this.backlogToggle);
  }

  modalWindowsConfirm(isConfirm: boolean) {
    this.iterationModal = false;
    const iterationObj = {
      name: this.iterationMW.name,
      startDate: this.iterationMW.startDateIter,
      endDate: this.iterationMW.endDateIter
    };
    if (isConfirm) {
      if (this.iterationMW.isEdited) {
        this.updateIteration(iterationObj);
      } else {
        this.addIteration(iterationObj);
      }
    } else {
      console.log('discarced');
    }
  }

}
