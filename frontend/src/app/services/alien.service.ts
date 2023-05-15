import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

type MessageData = {
  nickname: string;
  message: string;
  sentAt: number;
};

@Injectable({
  providedIn: 'root'
})
export class AlienService {

  /**
   *
   * @param http
   */
  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   *
   */
  getData(): Observable<any> {
    const url = `${environment.api.baseUrl}/messages`; 
    return this.http.get(url);
  }

  /**
   *
   */
  sendData(data: MessageData): Observable<any> {
    const url = `${environment.api.baseUrl}/messages`;

    const headers = new HttpHeaders({ 'x-api-key': environment.apiKey });
    return this.http.post(url,data,{headers});
  }
  
}
