import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocOffresComponent } from './bloc-offres.component';

describe('BlocOffresComponent', () => {
  let component: BlocOffresComponent;
  let fixture: ComponentFixture<BlocOffresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocOffresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
