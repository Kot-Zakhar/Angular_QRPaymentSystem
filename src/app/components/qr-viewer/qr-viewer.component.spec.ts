import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrViewerComponent } from './qr-viewer.component';

describe('QrViewerComponent', () => {
  let component: QrViewerComponent;
  let fixture: ComponentFixture<QrViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
