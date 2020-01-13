import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  projects: any[];
  widgets: any[];

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
      private _httpClient: HttpClient,public rt:Router
  )
  {
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve({ route, state }: { route: ActivatedRouteSnapshot; state: RouterStateSnapshot; }): Observable<any> | Promise<any> | any
  {

      return new Promise((resolve, reject) => {

          Promise.all([
              this.getProjects(),
              this.getWidgets()
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

  /**
   * Get projects
   *
   * @returns {Promise<any>}
   */
  getProjects(): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.get('api/project-dashboard-projects')
              .subscribe((response: any) => {
                  this.projects = response;
                  resolve(response);
              }, reject);
      });
  }

  /**
   * Get widgets
   *
   * @returns {Promise<any>}
   */
  getWidgets(): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.get('api/project-dashboard-widgets')
              .subscribe((response: any) => {
                  this.widgets = response;
                  resolve(response);
              }, reject);
      });
  }

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
