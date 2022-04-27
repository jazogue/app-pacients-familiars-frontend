import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

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

  getTranslation(text, idiom) {
    return this.http.post(
      'https://translation.googleapis.com/language/translate/v2?key=' + '',
      JSON.parse('{ "q": ["' + text + '"], "target": "' + idiom + '" }') //ca, es, en
    );
  }

  getAllTranslations(states, idiom) {
    return this.http.post(
      'https://translation.googleapis.com/language/translate/v2?key=' + '',
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
