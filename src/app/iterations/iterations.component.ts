import { Component, OnInit } from '@angular/core';
import { Iterations } from '../_models/iterations.model';
import { Router, ActivatedRoute } from '@angular/router';
import { IterationService } from './iteration.service';
import { AuthServices } from '../_shared/auth.service';

@Component({
  selector: 'app-iterations',
  templateUrl: './iterations.component.html',
  styleUrls: ['./iterations.component.css'],
  providers: [
    IterationService,
    AuthServices
  ]
})
export class IterationsComponent implements OnInit {

  public iterations: Iterations[] = [];
  public projectId: string;

  public editIterationModal = false;
  public iterationId: string;
  public iterationName: string;

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
      .subscribe(result => this.iterations = result);
  }

  addIteration(name: string) {
    this.iterService.addIteration(name, this.projectId)
      .subscribe(result => console.log(result));
  }

  updateIteration(newIterationName: string) {
    this.iterService.updateIteration(newIterationName, this.iterationId)
      .subscribe(result => {
        console.log(result);
        this.editIterationModal = false;
      });
  }

  openTasksList(iterationId: string) {
    this.router.navigate(['dashboard/project/', this.projectId, 'iteration', iterationId]);
  }

  cancelButton() {
    this.editIterationModal = false;
  }

  showButton(iterationId: string, iterationName: string) {
    this.iterationId = iterationId;
    this.iterationName = iterationName;
    this.editIterationModal = true;
  }

}
