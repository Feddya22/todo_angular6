import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public subjectBacklog = new Subject<any>();
  public subjectTask = new Subject<any>();

  constructor() { }

  sendAddTaskStatus(isOpen: boolean) {
    this.subjectTask.next(isOpen);
  }

  getAddTaskStatus() {
    return this.subjectTask.asObservable();
  }

  sendStatus(isToggle: boolean) {
    isToggle = isToggle === undefined ? true : (isToggle === false ? true : false);
    this.subjectBacklog.next(isToggle);
  }

  getStatus() {
    return this.subjectBacklog.asObservable();
  }
}
