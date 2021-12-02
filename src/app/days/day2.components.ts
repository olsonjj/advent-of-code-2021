import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { bufferCount, pairwise, take, tap } from 'rxjs/operators';
import { FileLoaderService } from '../services/file-loader-service';

@Component({
  selector: 'app-day-2',
  template: `
    <h1>Day 2</h1>
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
export class Day2Component implements OnInit, OnDestroy {
  results1 = '';
  results2 = '';

  private inputValues = [];
  private testValues = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2',
  ];

  constructor(private srv: FileLoaderService) {}

  ngOnInit(): void {
    this.srv
      .getDayInputAsString('day2.txt')
      .subscribe((val) => (this.inputValues = val));
  }

  solvePart1() {
    console.log('part 1');
    let horz = 0;
    let vert = 0;

    from(this.inputValues)
      .pipe(
        tap((val: string) => {
          const [movement, distance] = val.split(' ');
          switch (movement) {
            case 'forward':
              horz += +distance;
              break;
            case 'down':
              vert += +distance;
              break;
            case 'up':
              vert -= +distance;
              break;
          }
        })
      )
      .subscribe({
        complete: () => {
          console.log('done', horz, vert, horz * vert);
        },
      });
  }

  solvePart2() {
    console.log('part 2');
    let horz = 0;
    let aim = 0;
    let depth = 0;
    from(this.inputValues)
      .pipe(
        tap((val: string) => {
          const [movement, distance] = val.split(' ');
          switch (movement) {
            case 'forward':
              horz += +distance;
              depth += aim * +distance;
              break;
            case 'down':
              aim += +distance;
              break;
            case 'up':
              aim -= +distance;
              break;
          }
        })
      )
      .subscribe({
        complete: () => {
          console.log('done', horz, depth, horz * depth);
        },
      });
  }

  ngOnDestroy() {}
}
