import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login="";
  password="";
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get("http://localhost:1337/api/usuarios")
  }
  loginIn() {
    let body = new URLSearchParams();
    body.set("identifier", this.login);
    body.set("password", this.password);
    this.http.post("http://localhost:1337/api/auth/local/", body);
    return this.http.post("http://localhost:1337/api/auth/local/", body);
  }
}
