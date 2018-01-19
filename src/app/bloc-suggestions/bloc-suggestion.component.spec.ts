import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocSuggestionsComponent } from './bloc-suggestions.component';

describe('BlocSuggestionsComponent', () => {
  let component: BlocSuggestionsComponent;
  let fixture: ComponentFixture<BlocSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
