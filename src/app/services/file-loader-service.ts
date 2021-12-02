import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileLoaderService {
  constructor(private http: HttpClient) {}

  getDayInput(dayName: string) {
    return this.http.get(`/assets/${dayName}`, { responseType: 'text' }).pipe(
      map((rawInput: string) => {
        return rawInput.split('\n').map((str) => Number(str));
      })
    );
  }
}
