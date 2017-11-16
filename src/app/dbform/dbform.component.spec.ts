import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbformComponent } from './dbform.component';

describe('DbformComponent', () => {
  let component: DbformComponent;
  let fixture: ComponentFixture<DbformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
