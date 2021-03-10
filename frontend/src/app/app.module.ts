import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimeNgModule } from './primeng.module';

import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

import { JobPageComponent } from './pages/job-page/job-page.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { CategoryState } from './states/category.state';
import { JobState } from './states/job.state';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';

@NgModule({
  declarations: [AppComponent, TopbarComponent, CategoryPageComponent, JobPageComponent, FooterComponent, NotfoundPageComponent],
  imports: [
    BrowserModule,
    PrimeNgModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxsModule.forRoot([CategoryState, JobState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
