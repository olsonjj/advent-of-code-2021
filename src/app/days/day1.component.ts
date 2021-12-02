import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { bufferCount, pairwise, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-day',
  template: `
    <h1>Day 1</h1>
    <div>
      <button (click)="solvePart1()">Part 1</button>
      <button (click)="solvePart2()">Part 2</button>
    </div>
  `,
  styles: [
    `
  :host {
    display: flex;
    flex-direction: column
  }
  `,
  ],
})
export class Day1Component implements OnInit {

  private inputValues = [];
  private testValues = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  private valuesHigher = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(`/assets/day1.txt`, { responseType: 'text' })
      .subscribe((rawInput) => {
        this.inputValues = rawInput.split('\n').map((str) => Number(str));
      });
  }

  solvePart1() {
    console.log('part 1');
    this.valuesHigher = 0;
    from(this.inputValues)
      .pipe(
        pairwise(),
        tap(([val1, val2]) => {
          if (val2 > val1) {
            this.valuesHigher++;
          }
        })
      )
      .subscribe({
        complete: () => {
          console.log('complete', this.valuesHigher);
        },
      });
  }

  solvePart2() {
    console.log('part 2');
    this.valuesHigher = 0;
    let prevSum = 0;
    from(this.inputValues)
      .pipe(
        bufferCount(3, 1),
        tap((vals) => {
          if (vals.length === 3) {
            const sum = vals.reduce((acc, curr) => {
              return (acc += curr);
            }, 0);
            if (sum > prevSum && prevSum !== 0) {
              this.valuesHigher++;
            }
            prevSum = sum;
          }
        })
      )
      .subscribe({
        complete: () => {
          console.log('complete', this.valuesHigher);
        },
      });
  }
}
