import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotService } from './forgot.service';
import { AuthService } from '../../auth.service';
import * as myGlobals from '../../../../global';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotComponent implements OnInit {

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
        private toastr: ToastrService,

        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private service: ForgotService,
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

    // updatePassword()
    // {
    // 	console.log(this.forgotPasswordForm.value.email)
    //      this.service.Post(this.forgetPassword,{email:this.forgotPasswordForm.value.email,token:'LIVESITE'})
    //         .subscribe(res => {
    //             this.common=res;
    //             console.log(this.common)

    //     })
    // }
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
