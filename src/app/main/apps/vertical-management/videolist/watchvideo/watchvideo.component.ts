import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VideolistService }    from '../videolist.service';
import * as myGlobals from '../../../../../global';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watchvideo',
  templateUrl: './watchvideo.component.html',
  styleUrls: ['./watchvideo.component.scss']
})
export class WatchvideoComponent implements OnInit {
 res_data:any;
 safeSrc: SafeResourceUrl;
   constructor(private sanitizer: DomSanitizer,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<WatchvideoComponent>,private rt:Router,public _formBuilder: FormBuilder,private video_service:VideolistService) {
       this.res_data = this.data;
         this.safeSrc =  this.sanitizer.bypassSecurityTrustHtml(this.res_data);
    }


  ngOnInit() {

  	 //this.res_data = this.data;
  }
onClose()
{
	this.dialogRef.close();
}

}
