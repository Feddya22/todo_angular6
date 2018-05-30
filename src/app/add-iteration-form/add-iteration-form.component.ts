import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-iteration-form',
  templateUrl: './add-iteration-form.component.html',
  styleUrls: ['./add-iteration-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddIterationFormComponent implements OnInit {
  @Input() name: string;
  @Input() startDate: string;
  @Input() endDate: string;

  @Output() isConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  nameIteration: string;
  startDateIter: Date;
  endDateIter: Date;

  constructor() { }

  ngOnInit() {
  }

  confirm() {
    this.isConfirm.emit(true);
  }

  close() {
    this.isConfirm.emit(false);
  }

}
