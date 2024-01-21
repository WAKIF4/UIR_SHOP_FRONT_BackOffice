import {Component, OnInit} from '@angular/core';
import {DeliveryPersonService} from "../../../../services/delivery-person.service";
import {DeliveryPerson} from "../../../../models/delivery/deliveryPerson/deliveryPerson.model";
import {DeliveryPersonStatus} from "../../../../models/delivery/enum/deliveryPersonStatus.enum";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css'],
    animations: [
        trigger('toggleAnimation', [
            state('void', style({ opacity: 1 })),
            transition(':enter, :leave', [
                animate(300)
            ])
        ])
    ]
})
export class ListPersonComponent implements OnInit{


    search = '';
    items: DeliveryPerson[] = [];
    filteredItem: DeliveryPerson[] = [];


    constructor(private deliveryPersonService: DeliveryPersonService ) {}

    ngOnInit(): void {
        this.getAllDVPerson()
    }

    getAllDVPerson(){
        this.deliveryPersonService.getDonnees().subscribe(data => {
            this.items = data;
            this.filteredItem = data;
        });
    }


    searchResults() {
        this.filteredItem = this.items.filter((item: DeliveryPerson) => {
            return (
                item.fullname.toLowerCase().includes(this.search.toLowerCase()) ||
                item.email.toLowerCase().includes(this.search.toLowerCase()) ||
                item.status.toLowerCase().includes(this.search.toLowerCase())
            );
        });
    }

    protected readonly DeliveryPersonStatus = DeliveryPersonStatus;

}
