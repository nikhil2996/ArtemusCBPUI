import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidQueryComponent } from './mid-query.component';

describe('MidQueryComponent', () => {
  let component: MidQueryComponent;
  let fixture: ComponentFixture<MidQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
