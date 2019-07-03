import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { Ng2YaTableModule } from 'ng2-ya-table/dist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DisqusModule } from 'ngx-disqus';


import { AppComponent } from './app.component';
import { D3graphComponent } from './d3graph/d3graph.component';
import { D3Service } from 'd3-ng2-service';
import { MapComponent } from './map/map.component';
import { JsondataService } from './services/jsondata.service';
import { UidataService } from './services/uidata.service';
import { ColorsService } from './services/colors.service';

import { DbformComponent } from './dbform/dbform.component';
import { VisulisationComponent } from './visulisation/visulisation.component';
import { PlayheadComponent } from './playhead/playhead.component';
import { TextModalComponent } from './text-modal/text-modal.component';
import { AboutComponent } from './about/about.component';
import { TextsComponent } from './texts/texts.component';

const appRoutes: Routes = [
  { path: 'vis', component: VisulisationComponent },
  { path: 'db', component: DbformComponent },
  { path: 'about', component: AboutComponent },
  { path: 'texts', component: TextsComponent },
  { path: '**', redirectTo: 'about' }
]

@NgModule({
  declarations: [
    AppComponent,
    D3graphComponent,
    MapComponent,
    TextModalComponent,
    DbformComponent,
    VisulisationComponent,
    PlayheadComponent,
    TextModalComponent,
    AboutComponent,
    TextsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AgmCoreModule.forRoot({

      apiKey: ''

    }),
    Ng2YaTableModule.forRoot(),
    NgbModule.forRoot(),
    DisqusModule.forRoot('crossingborders2')
  ],
  providers: [D3Service, JsondataService, UidataService, ColorsService],
  entryComponents: [TextModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
