import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Community } from './community';
import { Members } from './members';
import { Meeting } from './meeting';
import { Expenses } from './expenses';
import { Maintenance } from './maintenance';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  data: any;
  private readonly API_URL = 'https://mycommunityapp.azurewebsites.net/api/';
  constructor(private readonly httpClient: HttpClient) {
    this.data = null
   }

  getcommunityList(): Observable<Community[]> {
    
    return this.httpClient.get<Community[]>(this.API_URL+ `Community`);
  }

  getmembersList(): Observable<Members[]> {
    var endpoint=this.API_URL+ `member`;
    return this.httpClient.get<Members[]>(endpoint);
  }

  createMember(body: any): Observable<Members> {
    return this.httpClient.post<Members>(this.API_URL+`member`, body);
  }

  createMaintenance(body: any): Observable<Maintenance> {
    return this.httpClient.post<Maintenance>(this.API_URL+`member/maintenance`, body);
  }

  createMeeting(body: any): Observable<Meeting> {
    return this.httpClient.post<Meeting>(this.API_URL+`community/meeting`, body);
  }

  createExpense(body: any): Observable<Expenses> {
    return this.httpClient.post<Expenses>(this.API_URL+`expense`, body);
  }
}
