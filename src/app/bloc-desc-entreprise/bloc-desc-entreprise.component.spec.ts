import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocDescEntreprisesComponent } from './bloc-desc-entreprises.component';

describe('BlocDescEntreprisesComponent', () => {
  let component: BlocDescEntrepriseComponent;
  let fixture: ComponentFixture<BlocDescEntreprisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocDescEntreprisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocDescEntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
