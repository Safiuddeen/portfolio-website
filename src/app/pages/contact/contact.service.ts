import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// This interface matches the exact data your Python backend expects
export interface ContactData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Your FastAPI backend URL
  private apiUrl = 'http://localhost:8000/api/contact';

  constructor(private http: HttpClient) {}

  sendMessage(data: ContactData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
