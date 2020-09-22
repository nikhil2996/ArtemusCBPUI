import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousQueryComponent } from './miscellaneous-query.component';

describe('MiscellaneousQueryComponent', () => {
  let component: MiscellaneousQueryComponent;
  let fixture: ComponentFixture<MiscellaneousQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
