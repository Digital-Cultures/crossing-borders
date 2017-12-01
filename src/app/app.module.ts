import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { Ng2YaTableModule } from 'ng2-ya-table';


import { AppComponent } from './app.component';
import { D3graphComponent } from './d3graph/d3graph.component';
import { D3Service } from 'd3-ng2-service';
import { MapComponent } from './map/map.component';
import { JsondataService } from './services/jsondata.service';
import { UidataService } from './services/uidata.service';
import { ColorsService } from './services/colors.service';

import { DbformComponent } from './dbform/dbform.component';
import { DataSourceService } from './dbform/data-source.service';
import { VisulisationComponent } from './visulisation/visulisation.component';
import { PlayheadComponent } from './playhead/playhead.component';

const appRoutes: Routes = [
  { path: '',   component: VisulisationComponent },
  { path: 'db',  component: DbformComponent }
 ]

@NgModule({
  declarations: [
    AppComponent,
    D3graphComponent,
    MapComponent,
    DbformComponent,
    VisulisationComponent,
    PlayheadComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
 
      apiKey: 'AIzaSyCjq8QyaUNCdB21vTLiPC5IwmjvRzD9f80'
 
    }),
    AgmSnazzyInfoWindowModule,
    Ng2YaTableModule.forRoot()
  ],
  providers: [D3Service, JsondataService, UidataService, ColorsService, DataSourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
