import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usertype } from '../model/usertype';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsertypeService {

  private usersUrl: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8081/api/type';
   }

  public findUsersType(){
    return this.http.get<Usertype[]>(this.usersUrl);
   }

   public findUserTypeById(id: number): Observable<Usertype>{
    return this.http.get<Usertype>(this.usersUrl + '/' + id)
   }

   public save(type: Usertype){
    return this.http.post<Usertype>(this.usersUrl, type, {responseType: 'text' as 'json'})
   }

   public edit(type: Usertype){
    return this.http.put<Usertype>(this.usersUrl, type, {responseType: 'text' as 'json'})
   }

   public delete(userTypeId: number){
    return this.http.delete<void>(this.usersUrl + '/' + userTypeId, {observe: 'response'})
    .pipe(
      catchError(error => {
        alert("It is not possible to delete a type user because there are users with this type user")
        return throwError(error); // Send the error to the component
      })
    );
   }
}
