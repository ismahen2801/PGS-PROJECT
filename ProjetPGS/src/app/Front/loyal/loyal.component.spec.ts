import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalComponent } from './loyal.component';

describe('LoyalComponent', () => {
  let component: LoyalComponent;
  let fixture: ComponentFixture<LoyalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
