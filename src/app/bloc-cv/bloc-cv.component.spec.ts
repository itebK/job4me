import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocCvComponent } from './bloc-cv.component';

describe('BlocCvComponent', () => {
  let component: BlocCvComponent;
  let fixture: ComponentFixture<BlocCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
