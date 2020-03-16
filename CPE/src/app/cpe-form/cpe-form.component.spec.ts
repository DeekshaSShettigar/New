import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpeFormComponent } from './cpe-form.component';

describe('CpeFormComponent', () => {
  let component: CpeFormComponent;
  let fixture: ComponentFixture<CpeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
