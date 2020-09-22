import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummeryQueryComponent } from './summery-query.component';

describe('SummeryQueryComponent', () => {
  let component: SummeryQueryComponent;
  let fixture: ComponentFixture<SummeryQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummeryQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummeryQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
