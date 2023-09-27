import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  ValidarLogin(email:string,password:string):Observable<any>{
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    console.log(email);
    const params=new HttpParams();
    params.set("email",email);
    params.set("password",password);
    return this.http.get(`${environment.apiUrl}/login?email=${JSON.stringify(email)}&password=${JSON.stringify(password)}`, {params:params});
  }
}
