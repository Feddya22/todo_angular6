import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIterationFormComponent } from './add-iteration-form.component';

describe('AddIterationFormComponent', () => {
  let component: AddIterationFormComponent;
  let fixture: ComponentFixture<AddIterationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIterationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIterationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
