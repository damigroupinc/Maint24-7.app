import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveinPage } from './movein.page';

describe('MoveinPage', () => {
  let component: MoveinPage;
  let fixture: ComponentFixture<MoveinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
