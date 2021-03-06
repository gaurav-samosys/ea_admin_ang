import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddInterviewService } from './add-interview.service';
import { ToastrService } from 'ngx-toastr';
import * as myGlobals from '../../../../global';
let AddInterviewComponent = class AddInterviewComponent {
    constructor(router, fb, rout, interview_service, toastr) {
        this.router = router;
        this.fb = fb;
        this.rout = rout;
        this.interview_service = interview_service;
        this.toastr = toastr;
        this.add_button = 0;
        this.name = 0;
        this.statusArray = [{ id: '1', value: 'Active' }, { id: '0', value: 'Inactive' }];
        this.add_expert_interview = myGlobals.add_expert_interview;
        this.expert_interviews_detail = myGlobals.expert_interviews_detail;
        this.update_expert_interview = myGlobals.update_expert_interview;
        /**
         * Button Toggle
         */
        this.show = true;
        this.buttonName = 'keyboard_arrow_down';
        this.AddInterviewForm = this.fb.group({
            title: new FormControl('', [Validators.required]),
            video_id: new FormControl('', [Validators.required]),
            status: new FormControl('', [Validators.required]),
        });
    }
    ngOnInit() {
        this.prodId = window.location.href.split('add_expert_interview/')[1];
        // alert(id)
        console.log(this.prodId);
        if (this.prodId) {
            this.editForm();
        }
    }
    /**
    *
    * @param id
    */
    editForm() {
        var id = this.prodId;
        // console.log(id)
        this.interview_service.Post(this.expert_interviews_detail + '/' + id, { token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            // console.log(this.response)
            this.name = 1;
            this.add_button = 1;
            if (this.response['status'] == 1) {
                this.response = this.response['data'];
                console.log(this.response);
                if (this.response['status'] == 0) {
                    var status = 'Inactive';
                }
                else {
                    var status = 'Active';
                }
                this.AddInterviewForm.controls['title'].setValue(this.response['title']),
                    this.AddInterviewForm.controls['video_id'].setValue(this.response['video_id'].toString());
                this.AddInterviewForm.controls['status'].setValue(status);
            }
            else {
                this.name = 0;
                this.add_button = 0;
            }
        });
    }
    /**
     * change status
     * @param id
     */
    statusChange(id) {
        console.log(id);
    }
    buttontoggle() {
        this.show = !this.show;
        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "keyboard_arrow_up";
        else
            this.buttonName = "keyboard_arrow_down";
    }
    /**
     * submit form
     */
    submit() {
        let item = {
            title: this.AddInterviewForm.controls['title'].value,
            status: this.AddInterviewForm.controls['status'].value,
            video_id: this.AddInterviewForm.controls['video_id'].value,
        };
        if (this.AddInterviewForm.invalid == true) {
            return false;
        }
        console.log(this.AddInterviewForm.value);
        this.interview_service.Post(this.add_expert_interview, {
            title: item.title, video_id: item.video_id, status: item.status,
            token: 'LIVESITE'
        }).subscribe(res => {
            console.log(res);
            if (res['status'] == '1') {
                this.toastr.success('Expert Added Successfully');
                this.router.navigate(['/apps/expert_interview']);
            }
            else {
                this.toastr.warning('There Are some Issue');
            }
            //  this.AddSubmitForm(res)
        });
    }
    /**
     *
     * @param prodId update form
     */
    update(prodId) {
        console.log(this.response);
        console.log(prodId);
        let item = {
            title: this.AddInterviewForm.controls['title'].value,
            status: this.AddInterviewForm.controls['status'].value,
            video_id: this.AddInterviewForm.controls['video_id'].value,
        };
        this.interview_service.Post(this.update_expert_interview, {
            id: this.prodId,
            title: item.title,
            status: item.status,
            video_id: item.video_id,
            token: 'LIVESITE'
        }).subscribe(res => {
            console.log(res);
            // if (res['success'] == true && res['status_code'] == 200) {
            this.toastr.success('Expert Interview Record Update Successfully');
            this.router.navigate(['/apps/expert_interview']);
            // } else {
            // this.toastr.warning('There Are some Issue')
            // }
        });
    }
};
AddInterviewComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-interview',
        templateUrl: './add-interview.component.html',
        styleUrls: ['./add-interview.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Router, FormBuilder,
        ActivatedRoute,
        AddInterviewService, ToastrService])
], AddInterviewComponent);
export { AddInterviewComponent };
// AddSubmitForm(res) {
//   console.log(res)
//   if (res['success'] == 1) {
//     this.toastr.success('Expert Added Successfully')
//     this.router.navigate(['/apps/expert_interview'])
//   } else {
//     this.toastr.warning('There Are some Issue')
//   }
// }
//# sourceMappingURL=add-interview.component.js.map