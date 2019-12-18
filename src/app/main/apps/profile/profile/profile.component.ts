import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../../../global';
import { ProfileService }    from './profile.service';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
profileForm:any;
getProfile=myGlobals.getProfile;
setProfile=myGlobals.setProfile;
getCountry=myGlobals.getCountry;
getStates=myGlobals.getState;
common:any;
country:any;
states:any;
data:any;
horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar,private http: HttpClient,private profile_service:ProfileService,private _formBuilder: FormBuilder) { }

  ngOnInit() {
  	this.fetchCountry();
  	this.profileForm=this._formBuilder.group({
  		user_name:[''],
  		first_name:['',Validators.required],
		last_name:['',Validators.required],
		email:['',[Validators.required,Validators.email]],
		phone_no:['',Validators.required],
		password:[''],
		country:['',Validators.required],
		state:['',Validators.required],
		city:['',Validators.required],
  	})

    this.profile_service.Post(this.getProfile,{user_id:localStorage.getItem('user_id'),token:'LIVESITE'})
            .subscribe(res => {
            this.common=res
            this.data=this.common.data;
            console.log( this.data)

            this.profileForm.patchValue({
              user_name:this.data[0].user_name,
              first_name:this.data[0].first_name,
              last_name:this.data[0].last_name,
              email:this.data[0].email,
              phone_no:this.data[0].phone_no,
              city:this.data[0].city,
            })
             this.profileForm.controls['country'].setValue(this.data[0].country, {onlySelf: true});
              this.getState(this.data[0].country)
              this.profileForm.controls['state'].setValue(this.data[0].state, {onlySelf: true});
               this.profileForm.controls['user_name'].disable()
            })
  }

        public hasError = (controlName: string, errorName: string) =>{
        return this.profileForm.controls[controlName].hasError(errorName);

  }

  onSubmit()
  {
    if(this.profileForm.invalid)
    {
      return false;
    }
    this.profileForm.value.user_id=localStorage.getItem('user_id');
    this.profileForm.value.token='LIVESITE';
  	console.log(this.profileForm.value)

      this.profile_service.Post(this.setProfile,this.profileForm.value)
            .subscribe(res => {
            this.common=res
            console.log( this.common)
          })
  }

  fetchCountry(){
   this.profile_service.Post(this.getCountry,{token:'LIVESITE'})
            .subscribe(res => {
            this.common=res
            this.country=this.common.data;

            })
}
getState(value){
  console.log(value)
   this.profile_service.Post(this.getStates,{countries_id:value,token:'LIVESITE'}).subscribe(res=>{
     this.common=res
     this.states=this.common.data
   })
}

}
