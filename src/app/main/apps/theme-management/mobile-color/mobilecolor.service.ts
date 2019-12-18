import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as myGlobals from '../../../../global';
@Injectable()
export class MobilecolorService {

  
  constructor(private _httpClient: HttpClient,public rt:Router) { }

      Post(URL,value){
        
      const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'       
     })
  };

    return this._httpClient.post(URL,value,httpOptions)
    }
}
