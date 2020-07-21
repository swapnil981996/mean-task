import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, NgForm, FormGroup, FormBuilder, FormGroupDirective, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{ 
  loginForm:FormGroup;
  constructor(
    private router: Router,
    private formbuilder:FormBuilder,
    private http: HttpClient,
    private authService: AuthService 
    ) { }

    ngOnInit() {
      this.loginForm=this.formbuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      })
    }

  onSubmit() 
  {
    this.authService.login(this.loginForm.value);
  }
}
