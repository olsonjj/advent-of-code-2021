import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { bufferCount, pairwise, take, tap } from 'rxjs/operators';
import { FileLoaderService } from '../services/file-loader-service';

@Component({
  selector: 'app-day-1',
  template: `
    <h1>Day 1</h1>
    <div>
      <button (click)="solvePart1()">Part 1</button> 
      result 1 {{results1}}
      <button (click)="solvePart2()">Part 2</button>
      result 2 {{results2}}
    </div>
  `,
  styles: [
    `
  :host {
    display: flex;
    flex-direction: column;
    // align-items: center;
  }

  h1, button {
    margin-right: 10px;
  }
  `,
  ],
})
export class Day1Component implements OnInit, OnDestroy {
  results1 = '';
  results2 = '';

  private inputValues = [];
  private testValues = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  private valuesHigher = 0;
  private subs = new Subscription();

  constructor(private srv: FileLoaderService) {}

  ngOnInit(): void {
    this.srv
      .getDayInput('day1.txt')
      .subscribe((val) => (this.inputValues = val));
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
          this.results1 = `= ${this.valuesHigher}`;
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
          this.results2 = `= ${this.valuesHigher}`;
        },
      });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }
}
