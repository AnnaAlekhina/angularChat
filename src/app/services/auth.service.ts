import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: BehaviorSubject<string> = new BehaviorSubject('');
  public isAuth: boolean;
  private users: User[] = [];

  constructor(private router: Router) {}

  public current() {
    return this.currentUser.value;
  }
  public initAuth() {
    this.isAuth = JSON.parse(localStorage.getItem('isAuth'));
    return this.isAuth;
  }
  public initLogged() {
    this.currentUser.next(JSON.parse(localStorage.getItem('loggedUser')));
    return this.currentUser.value;
  }
  public setAuth() {
    this.isAuth = true;
    localStorage.setItem('isAuth', JSON.stringify(this.isAuth));
  }
  public setLogged(username: string) {
    this.currentUser.next(username);
    localStorage.setItem('loggedUser', JSON.stringify(this.currentUser.value));
  }
  public initUsers(): User[] {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    return this.users;
  }

  public signupLocalUser(user: User) {
    this.users.push(user);
    this.currentUser.next(user.username);
    this.isAuth = true;
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public logout() {
    this.isAuth = false;
    this.currentUser.next('');
    localStorage.setItem('isAuth', JSON.stringify(this.isAuth));
    this.router.navigate(['/main']);
  }
}
