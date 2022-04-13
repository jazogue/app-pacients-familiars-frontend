import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurgicalTrackingPage } from './surgical-tracking.page';

describe('SurgicalTrackingPage', () => {
  let component: SurgicalTrackingPage;
  let fixture: ComponentFixture<SurgicalTrackingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgicalTrackingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurgicalTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
