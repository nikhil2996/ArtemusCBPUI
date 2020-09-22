import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { QueriesComponent } from './queries/queries.component';
import { ManifestQueryComponent } from './queries/manifest-query/manifest-query.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { BondQueryComponent } from './queries/bond-query/bond-query.component';
import { MiscellaneousQueryComponent } from './queries/miscellaneous-query/miscellaneous-query.component';
import { SummeryQueryComponent } from './queries/summery-query/summery-query.component';
import { MidQueryComponent } from './queries/mid-query/mid-query.component';
import { TestEdiComponent } from './queries/test-edi/test-edi.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    QueriesComponent,
    ManifestQueryComponent,
    LoaderComponent,
    BondQueryComponent,
    MiscellaneousQueryComponent,
    SummeryQueryComponent,
    MidQueryComponent,
    TestEdiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
    
  ],
  providers: [
     DatePipe,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
