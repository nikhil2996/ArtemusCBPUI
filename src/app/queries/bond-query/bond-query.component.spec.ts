import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BondQueryComponent } from './bond-query.component';

describe('BondQueryComponent', () => {
  let component: BondQueryComponent;
  let fixture: ComponentFixture<BondQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BondQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BondQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
