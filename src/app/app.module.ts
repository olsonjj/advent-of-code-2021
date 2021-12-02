import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Day1Component } from './days/day1.component';
import { HttpClientModule } from '@angular/common/http';
import { FileLoaderService } from './services/file-loader-service';
import { Day2Component } from './days/day2.components';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent, Day1Component, Day2Component],
  providers: [FileLoaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
