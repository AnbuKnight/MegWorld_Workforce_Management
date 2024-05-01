import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import {LoginUserModel, Users} from '../models/model/users';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  

  constructor(private http: HttpClient) { }

  registerUserToDB(users:Users)
  {
    let body = JSON.stringify(users);            
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    return this.http.post<any>('https://srltd.megworld.in/api/register', JSON.stringify(users));
        // .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
        //     //this.errorMessage = error.message;
        //     console.error('There was an error!', error);

        //     // after handling error, return a new observable 
        //     // that doesn't emit any values and completes
        //     return of();
        // }))
        // .subscribe(result => {
        //   console.log("Subscribed result");
        //     console.log(result);
        // });
  }

  registerUserToDBTest(users:Users): Observable<any>
  {
    let body = JSON.stringify(users);            
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    const httpOptions = {
      headers : ({'Content-Type': 'application/json'})
      }
    console.log("**Input**");
    console.log(JSON.stringify(users));
    return this.http.post<any>('https://srltd.megworld.in/api/register', JSON.stringify(users), httpOptions);

  }

  getUserDetailsFromDB(loginUserObject: LoginUserModel): Observable<any>
  {
    const httpOptions = {
      headers : ({'Content-Type': 'application/json'})
      }
    return this.http.post<any>('https://srltd.megworld.in/api/login', JSON.stringify(loginUserObject), httpOptions);
  }

  getHttpCallSample()
  {
    const url = 'https://srltd.megworld.in/api/login';
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email","test@gmail.com");
    queryParams = queryParams.append("password","Test@123");
    queryParams = queryParams.append("token","3|3KA5kV0Srlhial03a9pw5jsS7B4XgSuMlnlcEiSTf6fc91b5");
    return this.http.get<any>(url,{params:queryParams});
  }
}
