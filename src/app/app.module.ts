import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule }   from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import {Routes, RouterModule} from '@angular/router';
import { ModalAuthComponent } from './modal-auth/modal-auth.component';
import { ModalRegistrationComponent } from './modal-registration/modal-registration.component';

import {AuthInterseptorService } from './services/auth-interseptor.service';
import { RegistrationResultComponent } from './registration-result/registration-result.component';
import { CreateOrderComponent } from './create-order/create-order.component';

const appRoutes: Routes =[
  { path : '', component: MainComponent},
  { path : 'registration/info', component : RegistrationResultComponent },
  { path : 'create/order', component : CreateOrderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ModalAuthComponent,
    ModalRegistrationComponent,
    RegistrationResultComponent,
    CreateOrderComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NgbPaginationModule, 
    NgbAlertModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterseptorService , multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents : [
    ModalAuthComponent,
    ModalRegistrationComponent
  ]
})
export class AppModule { }
