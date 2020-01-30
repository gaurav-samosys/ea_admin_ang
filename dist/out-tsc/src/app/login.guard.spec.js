import { TestBed, inject } from '@angular/core/testing';
import { LoginGuard } from './login.guard';
describe('LoginGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginGuard]
        });
    });
    it('should ...', inject([LoginGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=login.guard.spec.js.map