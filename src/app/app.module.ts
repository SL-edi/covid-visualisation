import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { RegionSelectComponent } from './components/region-select/region-select.component';

import { SmartableAiNewsService } from './services/news.service';
import { RegionSelectService } from './services/region-select.service';

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
  providers: [{ provide: 'NewsService', useClass: SmartableAiNewsService }, RegionSelectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
