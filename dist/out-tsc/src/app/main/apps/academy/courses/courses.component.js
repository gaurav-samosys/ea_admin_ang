import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { AcademyCoursesService } from 'app/main/apps/academy/courses.service';
let AcademyCoursesComponent = class AcademyCoursesComponent {
    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(_academyCoursesService) {
        this._academyCoursesService = _academyCoursesService;
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to categories
        this._academyCoursesService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
            this.categories = categories;
        });
        // Subscribe to courses
        this._academyCoursesService.onCoursesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(courses => {
            this.filteredCourses = this.coursesFilteredByCategory = this.courses = courses;
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Filter courses by category
     */
    filterCoursesByCategory() {
        // Filter
        if (this.currentCategory === 'all') {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        }
        else {
            this.coursesFilteredByCategory = this.courses.filter((course) => {
                return course.category === this.currentCategory;
            });
            this.filteredCourses = [...this.coursesFilteredByCategory];
        }
        // Re-filter by search term
        this.filterCoursesByTerm();
    }
    /**
     * Filter courses by term
     */
    filterCoursesByTerm() {
        const searchTerm = this.searchTerm.toLowerCase();
        // Search
        if (searchTerm === '') {
            this.filteredCourses = this.coursesFilteredByCategory;
        }
        else {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.title.toLowerCase().includes(searchTerm);
            });
        }
    }
};
AcademyCoursesComponent = tslib_1.__decorate([
    Component({
        selector: 'academy-courses',
        templateUrl: './courses.component.html',
        styleUrls: ['./courses.component.scss'],
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [AcademyCoursesService])
], AcademyCoursesComponent);
export { AcademyCoursesComponent };
//# sourceMappingURL=courses.component.js.map