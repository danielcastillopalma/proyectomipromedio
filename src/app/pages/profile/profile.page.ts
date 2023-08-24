import { Component, ElementRef, VERSION, Inject, ViewChild, Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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
  primario="primarioBasico";
  data:any;
  secundario="secundarioBasico";
  terciario="terciarioBasico";
  cuarto="cuartoBasico";
  ngOnInit() {
  }
  logIn(){
    this.router.navigate(['/login']);
    this.data="";
    console.log(this.data)
  }
}
