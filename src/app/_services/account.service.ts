import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { Login } from '../_models/login';
import { map } from 'rxjs/operators';
import { Register } from '../_models/register';
import { environment } from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http:HttpClient = inject(HttpClient)

  private baseUrl:string = environment.baseApiUrl + 'users/';
  private currentUserSource: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | any> = this.currentUserSource.asObservable();

  sign_in(login: Login): Observable<User | any> {
    return this.http.post<User>(`${this.baseUrl}/sign_in`, { "user": login }, { observe: 'response' }).pipe(
      map(response => {
        const user: User | null = this.getUser(response);
        if (user) this.setCurrentUser(user);
        return user;
      })
    );
  }

  register(register: Register): Observable<User | null> {
    return this.http.post<User>(this.baseUrl, { "user": register }, { observe: 'response' }).pipe(
      map(response => {
        const user = this.getUser(response);
        if (user) this.setCurrentUser(user);
        return user;
      })
    );
  }

  log_out(): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/sign_out`).pipe(
      map(response => {
        console.log('log_out');
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
        return response
      })
    );
  }

  getUser(response: HttpResponse<User>): User | null {
    let token: string | null = null;
    let user: User | null = null;
    token = response.headers.get('Authorization');
    if (!token) return null;
    user = response.body;
    if (!user) return null;
    user.token = token;
    return user;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
