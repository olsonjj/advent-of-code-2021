import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Day1Component } from './days/day1.component';
import { HttpClientModule } from '@angular/common/http';
import { FileLoaderService } from './services/file-loader-service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent, Day1Component],
  providers: [FileLoaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
