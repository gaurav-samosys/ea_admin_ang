import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './main/apps/auth.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
  url:any;
    constructor(private auth: AuthService,
    private myRoute: Router,private _fuseSidebarService: FuseSidebarService,){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.url = state.url;
        console.log('Url:'+ this.url);
     /*    if(this.url == '/apps/home-dashboard/version3')
        {
            this._fuseSidebarService.getSidebar('navbar').toggleFold();
        }
         else if(this.url == 'apps/admin/login')
        {
            //this._fuseSidebarService.getSidebar('navbar').toggleFold();
            console.log("here")
        }
        else
        {
         this._fuseSidebarService.getSidebar('navbar').toggleOpen();
        }*/
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.myRoute.navigate(["apps/admin/login"]);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = route.path;
       console.log('Url:'+ url);
    if(!this.auth.isLoggedIn()){
      return true;
    }else{
      this.myRoute.navigate(["apps/home-dashboard/version3"]);
      return false;
    }
  }

}
