import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocEntrepriseComponent } from './bloc-entreprise.component';

describe('BlocEntrepriseComponent', () => {
  let component: BlocEntrepriseComponent;
  let fixture: ComponentFixture<BlocEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
