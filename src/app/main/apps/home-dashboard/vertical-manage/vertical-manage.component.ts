import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AddVerticalComponent } from '../add-vertical/add-vertical.component';

@Component({
  selector: 'app-vertical-manage',
  templateUrl: './vertical-manage.component.html',
  styleUrls: ['./vertical-manage.component.scss']
})
export class VerticalManageComponent implements OnInit {
  value: any;
  name: any;
  titleName: string;
  discriptionName: string;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  checkList=[];
  list
  dataSource:any
  displayedColumns: string[] = ['sno', 'title', 'image', 'video', 'quizzes', 'question', 'status', 'action','created_on',];
  toggle_menu1:boolean;
  constructor(public fb: FormBuilder,public dialog: MatDialog) {
  }
  checklist = new FormControl();
  ngOnInit() {
 
  } 
  updateSortingOrderVerical(){

  }
  toggle(){
   this.toggle_menu1=!this.toggle_menu1
  }
  onchange(event,value){
console.log(event,value)
  }
  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  buttontoggle() {
    this.show = !this.show;
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }
  Search(value, name) {

    if (this.value != value) {
      this.currentPage = 0;
    }
    this.value = value;
    this.name = name;

    if (value.length == 0) {
      if (name == 'title') {
        this.titleName = '';
      }
      else if (name == 'categary') {
        this.discriptionName = ''
      }
    }
    else {
      if (name == 'client') {
        this.titleName = value;
      }
      else if (name == 'company') {
        this.discriptionName = value
      }
    }
  }

  // openDialog(): void {
  //   let dialog = this.dialog.open(AddVerticalComponent, {
  //     width: '600px', height: '400px'
  //   });
  // }
  }
    //   openDialog(): void {
  //     const dialogRef = this.dialog.open(AddVerticalComponent, {
  //       width: '600px',height:'400px'
  //       // data: 
  //     });
  
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //     });
  //   }
  // checkList: string[] = ['Sno', 'Title', 'Image', 'Video', 'Quizzes', 'Question','Status','Action','Created_on'];

   // for(let i=0;i<this.checkList.length;i++){
    //  this.list=this.checkList[i]
    //   console.log(this.list)
    //   this.dataSource = new MatTableDataSource<any>(this.list);

    // }
    // this.checkList = [
    //   { id: 1, value: 'Sno', isSelected: false },
    //   { id: 2, value: 'Title', isSelected: false },
    //   { id: 3, value: 'Image', isSelected: false },
    //   { id: 4, value: 'Video', isSelected: false },
    //   { id: 5, value: 'Quizzes', isSelected: false },
    //   { id: 6, value: 'Question', isSelected: false },
    //   { id: 7, value: 'Status', isSelected: false },
    //   { id: 8, value: 'Action', isSelected: false },
    //   { id: 9, value: 'Created_on', isSelected: false },

    // ];
// checkUncheckAll() {
  //   for (var i = 0; i < this.checklist.length; i++) {
  //     this.checklist[i].isSelected = this.masterSelected;
  //   }
  //   this.getCheckedItemList();
  // }
  // isAllSelected() {
  //   this.masterSelected = this.checklist.every(function (item: any) {
  //     return item.isSelected == true;
  //   })
  //   this.getCheckedItemList();
  // }

  // getCheckedItemList() {
  //   this.checkedList = [];
  //   for (var i = 0; i < this.checklist.length; i++) {
  //     if (this.checklist[i].isSelected)
  //       this.checkedList.push(this.checklist[i]);

  //   }
  //   // this.checkedList = JSON.stringify(this.checkedList);
  // }