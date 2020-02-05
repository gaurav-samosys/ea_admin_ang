import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as myGlobals from '../../../../global';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ForgotService } from 'app/main/apps/admin/forgot/forgot.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector     : 'forgot-password',
    templateUrl  : './forgot-password.component.html',
    styleUrls    : ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    forgetPassword=myGlobals.forgetPassword;
    common:any;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private service: ForgotService,
        private toastr: ToastrService,
        private myRoute:Router

    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    updatePassword()
    {
        console.log(this.forgotPasswordForm.value.email)
        var type="admin"
         this.service.Post(this.forgetPassword,{username:this.forgotPasswordForm.value.email,token:'LIVESITE' ,
         type:type})
            .subscribe(res => {
                this.common=res;
                console.log(this.common)
           if(res['status']==true){
            this.myRoute.navigate(["/apps/admin/login"]);

            this.toastr.success('password Reset Successfully');
            
           }else{
            this.toastr.warning("We can't find a password with that username");
           }
        })
    }
}
