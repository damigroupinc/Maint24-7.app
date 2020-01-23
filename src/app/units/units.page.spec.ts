import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsPage } from './units.page';

describe('UnitsPage', () => {
  let component: UnitsPage;
  let fixture: ComponentFixture<UnitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
