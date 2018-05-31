import { Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Iterations } from '../_models/iterations.model';
import { Router, ActivatedRoute } from '@angular/router';
import { IterationService } from './iteration.service';
import { AuthServices } from '../_shared/auth.service';
import { AddIterationFormComponent } from '../add-iteration-form/add-iteration-form.component';

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

  @ViewChild(AddIterationFormComponent) iterationMW;

  constructor(
    private iterService: IterationService,
    private actRoute: ActivatedRoute,
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

  addIteration(name: string, startDate: Date, endDate: Date) {
    const iteration = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      idProject: this.projectId
    };
    this.iterService.addIteration(iteration)
      .subscribe(
        result => this.iterations.push(result.addedIteration),
        error => this.messages = error
      );
  }

  // change incoming data
  updateIteration(newIterationName: string) {
    this.iterService.updateIteration(newIterationName, this.iterationId)
      .subscribe(result => {
        console.log(result);
        this.iterationModal = false;
      });
  }

  openTasksList(iteration: Iterations) {
    this.iterationId = iteration._id;
    this.iterationName = iteration.name;
    this.startDateIter = new Date(iteration.startDate);
    this.endDateIter = new Date(iteration.endDate);
    this.isDate = true;
    this.router.navigate(['dashboard/project/', this.projectId, 'iteration', this.iterationId]);
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

  togleSidebar() {
    this.sidebarOpened = this.sidebarOpened === false ? true : false;
  }

  modalWindowsConfirm(isConfirm: boolean) {
    this.iterationModal = false;
    if (isConfirm) {
      this.addIteration(
        this.iterationMW.nameIteration,
        this.iterationMW.startDateIter,
        this.iterationMW.endDateIter
      );
      console.log('saved');
    } else {
      console.log('discarced');
    }
  }

}
