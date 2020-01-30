import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
describe('UsersService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(UsersService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=users.service.spec.js.map