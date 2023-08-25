import { Component, ElementRef, VERSION, Inject, ViewChild, Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { coloresBasicos } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( private element: ElementRef, private router: Router, private activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.data=this.router.getCurrentNavigation()?.extras.state?.["user"];
        console.log(this.data)
      }else{
        this.data=["Mi Promedio"]
      }
    });
  }
  data:any;
  cuarto = coloresBasicos.cuarto;
  terciario = coloresBasicos.terciario;
  secundario = coloresBasicos.secundario;
  primario = coloresBasicos.primario;
  ngOnInit() {
  }
  logIn(){
    this.router.navigate(['/login']);
    this.data="";
    console.log(this.data)
  }
}
