import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router ,NavigationExtras} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompaniesService }    from '../companies.service';
import { EditdialogComponent} from './editdialog/editdialog.component';
import * as myGlobals from '../../../../../global';


@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
form: FormGroup;
res_data:any;
 editCompany=myGlobals.editCompany;
  getCountry=myGlobals.getCountry;
   getStates=myGlobals.getState;
   getIndustry=myGlobals.getIndustry;
   getCompanies=myGlobals.getCompanies;;
 common:any;
 status:any;
 country:any;
states:any;
industry:any;
data:any;
  constructor(private rt:Router,public dialogRef: MatDialogRef<CompanyEditComponent>,private _formBuilder: FormBuilder,private company:CompaniesService,@Inject(MAT_DIALOG_DATA) public datas: any,public dialog: MatDialog) { 
  }


 
    ngOnInit(): void
    {
       this.res_data = this.datas;
       this.fetchCountry();
       this.getIndustries();
              // setting value

        // Reactive Form
        this.form = this._formBuilder.group({
            companyName:['',Validators.required],
            password:[''],
            firstName : ['', Validators.required],
            lastName  : ['', Validators.required],
            username  : ['', Validators.required],
            phone     : ['', Validators.required],
            city      : ['', Validators.required],
            email      : ['', [Validators.required,Validators.email]],
            state     : ['', Validators.required],
            industry: ['', [Validators.required]],
            country   : ['', Validators.required]
        });
            this.company.Post(this.getCompanies,{token:'LIVESITE',company_id:this.res_data.id,fields:'*'}).subscribe(res=>{
              this.common=res;
              this.data=this.common.data;
               this.form.patchValue({
            companyName:this.res_data.company_name,     
            firstName : this.data[0].first_name,
            lastName  : this.data[0].last_name,
            username  : this.data[0].user_name,
            city      : this.data[0].city,
            phone     : this.data[0].phone,
            email     : this.data[0].email,
            });
            this.form.controls['country'].setValue(this.data[0].country, {onlySelf: true});
            this.getState(this.data[0].country_id)
            this.form.controls['industry'].setValue(this.data[0].industry, {onlySelf: true});
            })
    }

         public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
  onClose() {
    this.dialogRef.close();
  }

    updateForm(){
    	if(this.form.invalid){
    		this.dialog.open(EditdialogComponent);
    		return false;
    	}
      this.form.value.company_id=this.res_data.id;
      this.form.value.token="LIVESITE";
    	this.company.Post(this.editCompany,this.form.value).subscribe(res=>{
        console.log(res);
        this.common=res;
        this.status=this.common.status;
        console.log(this.status)
        if(this.status == true){
          
        localStorage.setItem("status",this.status);
        }
        this.dialogRef.close();
     console.log(this.status)
        localStorage.setItem("status",this.status);
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/dashboards/companies"]));
        this.dialogRef.close();
      })
    }


    fetchCountry(){


   this.company.Post(this.getCountry,{token:'LIVESITE'})
            .subscribe(res => {
                this.common=res
                this.country=this.common.data;

            })
}
getState(value){
  console.log(value)
   this.company.Post(this.getStates,{countries_id:value,token:'LIVESITE'}).subscribe(res=>{
     this.common=res
     this.states=this.common.data;
     console.log(this.common)
   })
}

getIndustries(){
 this.company.Post(this.getIndustry,{token:'LIVESITE'}).subscribe(res=>{
     this.common=res
     this.industry=this.common.data;
   })
}

}
