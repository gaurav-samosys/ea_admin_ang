import { async, TestBed } from '@angular/core/testing';
import { UserConfirmboxComponent } from './user-confirmbox.component';
describe('UserConfirmboxComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserConfirmboxComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(UserConfirmboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-confirmbox.component.spec.js.map