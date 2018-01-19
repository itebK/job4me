import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocArchiveComponent } from './bloc-archive.component';

describe('BlocArchiveComponent', () => {
  let component: BlocArchiveComponent;
  let fixture: ComponentFixture<BlocArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
