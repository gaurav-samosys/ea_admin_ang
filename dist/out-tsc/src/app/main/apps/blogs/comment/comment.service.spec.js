import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
describe('CommentService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(CommentService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=comment.service.spec.js.map