import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizprofilePage } from './wizprofile.page';

describe('WizprofilePage', () => {
  let component: WizprofilePage;
  let fixture: ComponentFixture<WizprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
