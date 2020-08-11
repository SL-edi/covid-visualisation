import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';

import { ActualNewsService } from './services/news.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    CountrySelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: 'NewsService', useClass: ActualNewsService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
