import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTenPage } from './complete-ten.page';

describe('CompleteTenPage', () => {
  let component: CompleteTenPage;
  let fixture: ComponentFixture<CompleteTenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteTenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
