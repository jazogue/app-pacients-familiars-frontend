import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiKey: any = 'YOUR_API_KEY';
  constructor(public http: HttpClient) {}

  getNews(topic) {
    return this.http.get(
      'http://newsapi.org/v2/everything?q=' +
        topic +
        '&from=2020-08-21&sortBy=publishedAt&apiKey=' +
        this.apiKey
    );
  }

  getPatient(patientId) {
    return this.http.get('http://localhost:8080/patient/' + patientId).pipe(
      catchError((error) => {
        if (error.status === 404) return [];
      })
    );
  }

  getAllStates(patientId) {
    return this.http.get('http://localhost:8080/states/patient/' + patientId);
  }

  getNumberNewStates(patientId) {
    return this.http.get(
      'http://localhost:8080/states/patient/' + patientId + '/new/int'
    );
  }

  getObjectNewStates(patientId) {
    return this.http.get(
      'http://localhost:8080/states/patient/' + patientId + '/new/object'
    );
  }
}
