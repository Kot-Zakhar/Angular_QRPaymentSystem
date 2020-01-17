import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQrsComponent } from './my-qrs.component';

describe('MyQrsComponent', () => {
  let component: MyQrsComponent;
  let fixture: ComponentFixture<MyQrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
