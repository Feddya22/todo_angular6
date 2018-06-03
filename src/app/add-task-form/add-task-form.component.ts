import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {
  public listOfStatus = ['todo', 'doing', 'done'];
  public taskPoints = [1, 2, 3, 4, 5];

  @Input() isEdited: boolean;
  @Input() title: string;
  @Input() taskName: string;
  @Input() description: string;
  @Input() status: string;
  @Input() points: number;

  @Output() isConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    // if (!this.isEdited) {

    // }
  }

  confirm() {
    this.isConfirm.emit(true);
  }

  close() {
    this.isConfirm.emit(false);
  }

}
