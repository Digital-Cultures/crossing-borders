import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisulisationComponent } from './visulisation.component';

describe('VisulisationComponent', () => {
  let component: VisulisationComponent;
  let fixture: ComponentFixture<VisulisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisulisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisulisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
