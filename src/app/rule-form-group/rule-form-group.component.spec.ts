import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleFormGroupComponent } from './rule-form-group.component';

describe('RuleFormGroupComponent', () => {
  let component: RuleFormGroupComponent;
  let fixture: ComponentFixture<RuleFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
