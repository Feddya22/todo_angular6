import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-iteration-form',
  templateUrl: './add-iteration-form.component.html',
  styleUrls: ['./add-iteration-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddIterationFormComponent implements OnInit {
  @Input() isEdited: boolean;
  @Input() title: string;
  @Input() name: string;
  @Input() startDate: Date;
  @Input() endDate: Date;

  @Output() isConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  public startDateIter: any;
  public endDateIter: any;

  constructor() {}

  ngOnInit() {
    if (!this.isEdited) {
      this.name = '';
    } else {
      this.startDateIter = new FormControl(this.startDate).value;
      this.endDateIter = new FormControl(this.endDate).value;
    }
  }

  confirm() {
    this.isConfirm.emit(true);
  }

  close() {
    this.isConfirm.emit(false);
  }

}
