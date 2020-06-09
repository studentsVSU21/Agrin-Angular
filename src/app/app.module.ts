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
import { ListNewOrdersComponent } from './list-new-orders/list-new-orders.component';
import { PesticideSheetComponent } from './pesticide-sheet/pesticide-sheet.component';
import { ModalCreatePesticideComponent } from './modal-create-pesticide/modal-create-pesticide.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { CardOrderComponent } from './card-order/card-order.component';
import { ModalConfirmOrderComponent } from './modal-confirm-order/modal-confirm-order.component';
import { CreateOperatorAccountComponent } from './create-operator-account/create-operator-account.component';
import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { ModalCreateExpenseReportComponent } from './modal-create-expense-report/modal-create-expense-report.component';
import { ModalChangeVolumePesticideComponent } from './modal-change-volume-pesticide/modal-change-volume-pesticide.component';
import { ModelRefactorInfoUserComponent } from './model-refactor-info-user/model-refactor-info-user.component';
import { ModalChangeProccessAreaComponent } from './modal-change-proccess-area/modal-change-proccess-area.component';

const appRoutes: Routes =[
  { path : '', component: MainComponent},
  { path : 'registration/info', component : RegistrationResultComponent },
  { path : 'create/order', component : CreateOrderComponent},
  { path : 'new/orders', component : ListNewOrdersComponent},
  { path : 'manage/pesticide', component : PesticideSheetComponent},
  { path : 'profile', component : ProfileComponent},
  { path : 'myOrders', component: OrdersComponent},
  { path : 'create/operator', component : CreateOperatorAccountComponent},
  { path : 'current/order', component : CurrentOrdersComponent},
  { path : 'detail/order/:id', component : DetailOrderComponent}
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
    CreateOrderComponent,
    ListNewOrdersComponent,
    PesticideSheetComponent,
    ModalCreatePesticideComponent,
    ProfileComponent,
    OrdersComponent,
    CardOrderComponent,
    ModalConfirmOrderComponent,
    CreateOperatorAccountComponent,
    CurrentOrdersComponent,
    DetailOrderComponent,
    ModalCreateExpenseReportComponent,
    ModalChangeVolumePesticideComponent,
    ModelRefactorInfoUserComponent,
    ModalChangeProccessAreaComponent
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
    ModalRegistrationComponent,
    ModalCreatePesticideComponent,
    ModalConfirmOrderComponent,
    ModalCreateExpenseReportComponent,
    ModalChangeVolumePesticideComponent,
    ModelRefactorInfoUserComponent,
    ModalChangeProccessAreaComponent
  ]
})
export class AppModule { }
