import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
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

  public iterationModal = false;
  public iterationId: string;
  public iterationName: string;
  public messages: string;

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

  // error message implement
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
      .subscribe(result => console.log(result));
  }

  updateIteration(newIterationName: string) {
    this.iterService.updateIteration(newIterationName, this.iterationId)
      .subscribe(result => {
        console.log(result);
        this.iterationModal = false;
      });
  }

  openTasksList(iterationId: string) {
    this.router.navigate(['dashboard/project/', this.projectId, 'iteration', iterationId]);
  }

  showButton() {
    this.iterationModal = true;
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
