import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'https://localhost:44374/api/transaction';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/income`, this.getHeaders());
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, transaction, this.getHeaders());
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  updateTransaction(id: number, transaction: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, transaction, this.getHeaders());
  }

  private getHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
