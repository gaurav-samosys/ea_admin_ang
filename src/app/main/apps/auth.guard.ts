import { Injectable } from '@angular/core';
import { CanActivate,CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot,Route} from 
'@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private myRoute: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
        console.log('Url:'+ url);
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.myRoute.navigate(["apps/admin/login"]);
      return false;
    }
  }

     CanLoad(route: Route): boolean {
       let url: string = route.path;
       console.log('Url:'+ url);
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.myRoute.navigate(["apps/admin/login"]);
      return false;
    }
  }
}