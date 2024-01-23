import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './shipping.component';
import { CreateShippingComponent } from './create-shipping/create-shipping.component';
import { EditShippingComponent } from './edit-shipping/edit-shipping.component';
import { ListShippingComponent } from './list-shipping/list-shipping.component';
import { ViewShippingComponent } from './view-shipping/view-shipping.component';
import { CreatePersonComponent } from './delivery-person/create-person/create-person.component';
import { EditPersonComponent } from './delivery-person/edit-person/edit-person.component';
import { ListPersonComponent } from './delivery-person/list-person/list-person.component';
import {FormsModule} from "@angular/forms";
import { ModalModule } from 'angular-custom-modal';
import { ProfilePersonComponent } from './delivery-person/profile-person/profile-person.component'



@NgModule({
    declarations: [
        ShippingComponent,
        CreateShippingComponent,
        EditShippingComponent,
        ListShippingComponent,
        ViewShippingComponent,
        CreatePersonComponent,
        EditPersonComponent,
        ListPersonComponent,
        ProfilePersonComponent
    ],
    exports: [
        ListShippingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ModalModule
    ]
})
export class ShippingModule { }
