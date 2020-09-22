import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEdiComponent } from './test-edi.component';

describe('TestEdiComponent', () => {
  let component: TestEdiComponent;
  let fixture: ComponentFixture<TestEdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestEdiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestEdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
