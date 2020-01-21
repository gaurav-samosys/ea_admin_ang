import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { DownloadService } from './download.service';
import * as jsPDF from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  displayedColumns: string[] = ['s_no', 'file_name', 'action'];
  data: any;
  response: any;
  html: any;
  result: any;
  pageNumber: number = 0;
  size: number = 10;
  rows: any;
  start: any;
  end: any;
  common: any;
  country: any;
  // array of all items to be paged
  allItems: any;
  states: any;

  // pager object
  pager: any = {};
  downloadForm:FormGroup
  // paged items
  pagedItems: any[];
  deleteFileApi= myGlobals.deleteFileApi
  uploadFileList = myGlobals.uploadFileList;
  uploadFile = myGlobals.uploadFile;
  dataSource = new MatTableDataSource<any>(this.data);

  constructor(private sanitizer: DomSanitizer,
     private http: HttpClient, public dialog: MatDialog,
      private pagerService: PagerService,
      private fb:FormBuilder,
       public download_service: DownloadService) {
         this.downloadForm=this.fb.group({

         })

  }

  ngOnInit() {
    this.fetchData();
  }
  fileName
  filePreview
  onFileChanged(event: { target: { files: any[]; }; }) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileName = file.name + " " + file.type;
        const doc = new jsPDF();
        const base64ImgString = (reader.result as string).split(',')[1];
        doc.addImage(base64ImgString, 15, 40, 50, 50);
        this.filePreview = 'data:image/png' + ';base64,' + base64ImgString;
        doc.save('TestPDF')

      };
      Swal.fire({
        title: 'Success!',
        text: ' File successfully uploaded!',
        icon: 'success',
        // showCancelButton: true,
        confirmButtonText: 'Ok',
        // cancelButtonText: 'No, keep it'
      })


      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Only pdf files allowed, please try again with .pdf format!',
      //   icon: 'warning',
      //   confirmButtonText: 'Ok',
      // })
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * reset button
   */
  reset() {
    this.downloadForm.reset()
    this.ngOnInit();
  }

  /**
   * show hide button toggle
   */
  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  buttontoggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }
  public show1: boolean = true;
  public buttonName1: any = 'keyboard_arrow_down';
  buttontoggle1() {
    this.show1 = !this.show1;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show1)
      this.buttonName1 = "keyboard_arrow_up";
    else
      this.buttonName1 = "keyboard_arrow_down";
  }

  /**
   * get list 
   */
  fetchData() {
    this.download_service.Post(this.uploadFileList, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.rows = this.common.data
        this.data = this.rows.slice(0, 10);
        console.log(this.common)
        this.dataSource.data = this.data
        this.allItems = this.data.length;
        this.setPage(1);

      });
  }

  /**
   * 
   * @param page pagination
   */
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems, page, this.size);
    this.start = this.pager.startIndex + 1;
    this.end = this.pager.endIndex + 1;
    // get current page of items

    this.pageNumber = this.pager.startIndex;


    this.download_service.Post(this.uploadFileList, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.rows = this.common.data
        this.data = this.rows.slice(0, this.size);
        console.log(this.data)
        this.dataSource.data = this.data
        this.allItems = this.data.length;
      });

  }

  changelimit(value) {
    this.size = parseInt(value);
    this.fetchData();
  }

  /**
   * 
   * @param value select file
   */

  selectFile(value) {
    console.log(value)
    this.download_service.Post(this.uploadFile, { file: value, token: "LIVESITE" }).subscribe(res => {
      console.log(res)
    })
  }

/**
 * 
 * @param name delete record for file pdf related
 */
  delete(name) {
    console.log(name)
    var file_path=name.file_path
    this.download_service.Post(this.deleteFileApi, { file_path: file_path, token: "LIVESITE" }).subscribe(res => {
      console.log(res)
      if(res['succes']==true){
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this pdf!',
          icon: 'success',
          showCancelButton: true,
          cancelButtonText: 'Cencel',
          confirmButtonText: 'Yes delete it!',
    
        })
        this.fetchData();

      // }else{
      //   Swal.fire({
      //     title: 'Are you sure?',
      //     text: 'You will not be able to recover this pdf!',
      //     icon: 'warning',
      //     showCancelButton: true,
      //     cancelButtonText: 'Cencel',
      //     confirmButtonText: 'Yes delete it!',
    
      //   })
      }
    })
    
  }

}
// Swal.fire({
//   title: 'Error!',
//   text: 'Only pdf files allowed, please try again with .pdf format!',
//   icon: 'warning',
//   showCancelButton: true,
//   confirmButtonText: 'Ok',
//   cancelButtonText: 'No, keep it'
// })


// Swal.fire({
//   title: 'Are you sure?',
//   text: 'You will not be able to recover this imaginary file!',
//   icon: 'warning',
//   showCancelButton: true,
//   confirmButtonText: 'Yes, delete it!',
//   cancelButtonText: 'No, keep it'
// }).then((result) => {
//   if (result.value) {
//     Swal.fire(
//       'Deleted!',
//       'Your imaginary file has been deleted.',
//       'success'
//     )

//   } else if (result.dismiss === Swal.DismissReason.cancel) {
//     Swal.fire(
//       'Cancelled',
//       'Your imaginary file is safe :)',
//       'error'
//     )
//   }
// })