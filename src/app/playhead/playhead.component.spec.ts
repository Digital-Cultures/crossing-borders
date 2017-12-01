import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayheadComponent } from './playhead.component';

describe('PlayheadComponent', () => {
  let component: PlayheadComponent;
  let fixture: ComponentFixture<PlayheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
