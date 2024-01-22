import {Routes} from '@angular/router';

// dashboard
import {IndexComponent} from './index';
import {AppLayout} from './layouts/app-layout';
import {AuthLayout} from './layouts/auth-layout';
import {ListPersonComponent} from "./modules/shipping/delivery-person/list-person/list-person.component";
import {AppComponent} from "./app.component";
import { ListShippingComponent } from './modules/shipping/list-shipping/list-shipping.component';
import { AllShippingListComponent } from './modules/shipping/delivery-person/all-shipping-list/all-shipping-list.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard
            {
                path: '',
                component: AppComponent,
                title: 'Sales Admin | VRISTO - Multipurpose Tailwind Dashboard Template'
            },
            {
                path: '',
                loadChildren: () => import('./modules/view-routing.module').then(m => m.ViewRoutingModule), // @Lazy loading
            },
            {
                path:'shipping',
                
                children:[
                    {
                        path: 'deliveryPerson',
                        component: ListPersonComponent,
                        title: 'List Delivery Persons'
                    },{
                        path: 'delivery',
                        component: ListShippingComponent,
                        title: 'List Delivery'
                    },
                    {
                        path: 'dvPerson',
                        component: AllShippingListComponent,
                        title: 'List Delivery'
                    }
                ]
            }

        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [],
    }
];
