import { TestBed } from '@angular/core/testing';
import { CompaniesService } from './companies.service';
describe('CompaniesService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(CompaniesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=companies.service.spec.js.map