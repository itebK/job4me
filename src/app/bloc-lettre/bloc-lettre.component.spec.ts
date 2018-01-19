import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocLettreComponent } from './bloc-lettre.component';

describe('BlocLettreComponent', () => {
  let component: BlocLettreComponent;
  let fixture: ComponentFixture<BlocLettreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocLettreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocLettreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
