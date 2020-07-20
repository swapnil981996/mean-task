import { Component, OnInit } from '@angular/core';
import{login}from '../../model/login';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, NgForm, FormGroup, FormBuilder, FormGroupDirective, FormArray } from '@angular/forms';
 import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{ 
  loginForm:FormGroup;
  login:login;
  constructor(
    private router: Router,
    private formbuilder:FormBuilder,
    private http: HttpClient
    ) { }

    ngOnInit() {
      this.loginForm=this.formbuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      })
    }

  onSubmit() 
  {
    this.login=new login(); 
    this.login.email=this.loginForm.value.email;
    this.login.password=this.loginForm.value.password;
    console.log(this.login)
  return this.http.post("http://localhost:4000/login",this.login).subscribe((response) =>
  {
    if(response['msg']=='successful login' && response['status']==200)
    {
      //console.log('successful');
      this.router.navigate(['/upload-image']);
    }
  })
  }
}
