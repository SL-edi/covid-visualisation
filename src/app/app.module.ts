import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { RegionSelectComponent } from './components/region-select/region-select.component';

import { NEWS_SERVICE, SmartableAiNewsService } from './services/news.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    RegionSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: NEWS_SERVICE, useClass: SmartableAiNewsService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
