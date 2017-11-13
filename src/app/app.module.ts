import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { D3graphComponent } from './d3graph/d3graph.component';

import { D3Service } from 'd3-ng2-service';

@NgModule({
  declarations: [
    AppComponent,
    D3graphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
 
      apiKey: 'AIzaSyCjq8QyaUNCdB21vTLiPC5IwmjvRzD9f80'
 
    })
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
