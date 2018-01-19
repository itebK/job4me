import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocConsulterComponent } from './bloc-consulter.component';

describe('BlocConsulterComponent', () => {
  let component: BlocConsulterComponent;
  let fixture: ComponentFixture<BlocConsulterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocConsulterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
