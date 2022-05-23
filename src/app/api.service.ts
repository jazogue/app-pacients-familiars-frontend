import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  getPatient(patientId) {
    return this.http.get('http://localhost:8080/patient/' + patientId).pipe(
      catchError((error) => {
        if (error.status === 404 || error.status === 500) {
          return error;
        }
      })
    );
  }

  getAllStates(admissionId, idiom) {
    return this.http
      .get(
        'http://localhost:8080/states/admission/' +
          admissionId +
          '/idiom/' +
          idiom
      )
      .pipe(
        catchError((error) => {
          if (error.status === 404 || error.status === 500) {
            return error;
          }
        })
      );
  }

  getAdmissionByPatientId(patientId) {
    return this.http
      .get('http://localhost:8080/admission/active/patient/' + patientId)
      .pipe(
        catchError((error) => {
          if (error.status === 404 || error.status === 500) {
            return error;
          }
        })
      )
      .pipe(
        catchError((error) => {
          if (error.status === 404 || error.status === 500) {
            return error;
          }
        })
      );
  }
}
