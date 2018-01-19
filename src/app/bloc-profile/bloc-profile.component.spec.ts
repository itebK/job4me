import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocProfileComponent } from './bloc-profile.component';

describe('BlocProfileComponent', () => {
  let component: BlocProfileComponent;
  let fixture: ComponentFixture<BlocProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
