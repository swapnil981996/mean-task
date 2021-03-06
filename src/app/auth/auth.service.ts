import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login } from '../../model/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private errmsg =new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  get iserrmsg() {
    return this.errmsg.asObservable(); // {2}
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  login(user: login){
    if (user.email !== '' && user.password !== '' ) { // {3}
      return this.http.post("http://localhost:4000/login",user).subscribe((response) =>
        {
            if(response['msg']=='successful login' && response['status']==200)
            {
            //console.log('successful');
                this.loggedIn.next(true);
                this.errmsg.next(false)
                this.router.navigate(['/upload-image']);
            }
            else{
              this.errmsg.next(true)
            }
        })
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}