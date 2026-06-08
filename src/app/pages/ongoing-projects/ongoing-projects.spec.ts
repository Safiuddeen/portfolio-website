// src/app/pages/ongoing-projects/ongoing-projects.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingProjects } from './ongoing-projects';

describe('OngoingProjects', () => {
  let component: OngoingProjects;
  let fixture: ComponentFixture<OngoingProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
