import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}
  private apiKey: string = 'AIzaSyCo3vh6kzsSbmlSRKHqXazSFbAqrmMgi28';

  getPatient(patientId) {
    return this.http.get('http://localhost:8080/patient/' + patientId).pipe(
      catchError((error) => {
        if (error.status === 404 || error.status === 500) {
          return error;
        }
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

  getTranslation(text, idiom) {
    return this.http.post(
      'https://translation.googleapis.com/language/translate/v2?key=' +
        this.apiKey,
      JSON.parse('{ "q": ["' + text + '"], "target": "' + idiom + '" }')
    );
  }

  getAllTranslations(states, idiom) {
    return this.http.post(
      'https://translation.googleapis.com/language/translate/v2?key=' +
        this.apiKey,
      JSON.parse(
        '{ "q": ' +
          this.prepareJsonAllTranslations(states) +
          ', "target": "' +
          idiom +
          '" }'
      )
    );
  }

  private prepareJsonAllTranslations(states) {
    var statesString: string = '[';
    for (let i = 0; i < states.length; i++) {
      statesString += '"' + states[i].stateName + '"';
      if (i < states.length - 1) statesString += ', ';
    }
    statesString += ']';
    return statesString;
  }
}
