import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocCandidatureComponent } from './bloc-candidature.component';

describe('BlocCandidatureComponent', () => {
  let component: BlocCandidatureComponent;
  let fixture: ComponentFixture<BlocCandidatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocCandidatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
