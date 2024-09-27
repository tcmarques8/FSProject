import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private usersUrl: string;
  constructor(private http: HttpClient) {
    //this.usersUrl = 'http://springboot:8081/api/users';
    this.usersUrl = 'http://localhost:8081/api/users';
   }

   public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
   }

   public findById(id: number): Observable<User>{
    return this.http.get<User>(this.usersUrl + '/' + id)
   }

   public save(user: User){
    return this.http.post<User>(this.usersUrl, user, {responseType: 'text' as 'json'})
   
   }

   public edit(user: User){
    return this.http.put<User>(this.usersUrl, user, {responseType: 'text' as 'json'})
   }

   public delete(userid: number){
    return this.http.delete<void>(this.usersUrl + '/' + userid, {
      observe: 'response'
    })
   }
   
}
