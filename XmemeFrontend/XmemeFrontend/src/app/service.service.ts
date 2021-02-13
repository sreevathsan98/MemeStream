import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Imeme } from './Imeme';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private _url:string ="https://sreevathsan-nodeapi.herokuapp.com/memes";


private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
  constructor(private http:HttpClient) { }

  getMemes():Observable<Imeme[]>{
    return this.http.get<Imeme[]>(this._url);
  }
  addMeme(meme: Imeme): Observable<Imeme> {
    return this.http.post<Imeme>(this._url, meme);
}
  modifyMeme(meme:Imeme): Observable<Imeme> {
    return this.http.patch<Imeme>(this._url+"/"+meme.id, meme);
}
}
