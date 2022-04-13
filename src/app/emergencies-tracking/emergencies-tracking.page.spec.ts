import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmergenciesTrackingPage } from './emergencies-tracking.page';

describe('EmergenciesTrackingPage', () => {
  let component: EmergenciesTrackingPage;
  let fixture: ComponentFixture<EmergenciesTrackingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenciesTrackingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmergenciesTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
