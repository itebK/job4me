import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocCompteComponent } from './bloc-compte.component';

describe('BlocCompteComponent', () => {
  let component: BlocCompteComponent;
  let fixture: ComponentFixture<BlocCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
