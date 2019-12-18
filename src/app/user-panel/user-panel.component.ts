import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class UserPanelComponent implements OnInit {
 /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
  constructor(
    private _fuseConfigService: FuseConfigService,

  ) {
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
  // user_id:boolean=false
  ngOnInit() {
  //   if (localStorage) {
  //     let user_id = localStorage.getItem("user_id");
  //     if (user_id == '1') {
  //         console.log("admin==========id=======", user_id)
  //         // this.router.navigate(['apps/admin/login']);
  //         this.user_id  = false;
  //     }
     
  // }
  }

}
