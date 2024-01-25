import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DeliveryPersonService} from "../../../../services/delivery-person.service";
import {DeliveryPerson} from "../../../../models/delivery/deliveryPerson/deliveryPerson.model";
import {DeliveryPersonStatus} from "../../../../models/delivery/enum/deliveryPersonStatus.enum";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';


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
    newDeliveryPerson: DeliveryPerson = {
        id:0,
        fullname: '',
        email: '',
        phone: '',
        city: '',
        status: DeliveryPersonStatus.AVAILABLE,
      };
      existingDeliveryPerson: DeliveryPerson = {} as DeliveryPerson
      
      @ViewChild('updateModal') updateModal: any;
     

    
  
    constructor(private deliveryPersonService: DeliveryPersonService) {}

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


    createDeliveryPerson() {
        this.deliveryPersonService.createDeliveryPerson(this.newDeliveryPerson).subscribe(
          data => {
            console.log('Delivery person created successfully', data);
            this.getAllDVPerson();
            console.log(this.newDeliveryPerson)
            this.newDeliveryPerson = {
              id:0,
              fullname: '',
              email: '',
              phone: '',
              city: '',
              status: DeliveryPersonStatus.AVAILABLE,
            };
          },
          error => {
            console.error('Error creating delivery person', error);
          }
        );
      }

      deleteDeliveryPerson(id: number): void {
        this.deliveryPersonService.deleteDeliveryPerson(id)
          .subscribe({
            next: () => {
            },
            error: (error) => {
              if (error.status == 200) {
                console.log('Delivery person deleted successfully.');
        this.getAllDVPerson()

              }
              else {
                console.error('Error deleting delivery person:', error);
              }
            }
          });
      }
  
      updateDeliveryPerson(id: number) {
        if (!id) {
          console.error('Invalid delivery person ID');
          return;
       }
        this.deliveryPersonService.updateDeliveryPerson(id, this.existingDeliveryPerson).subscribe(
          (data: DeliveryPerson) => {
            console.log('Delivery person updated successfully', data);
            this.getAllDVPerson();
          },
          error => {
            console.error('Error updating delivery person', error);
          }
        );
      }

      showAlert(item: { id: number }) {
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure?',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel', 
          padding: '2em',
          customClass: 'sweet-alerts',
        }).then((result) => {
          if (result.value) {
            this.deleteDeliveryPerson(item.id);
            Swal.fire({ title: 'Deleted!', icon: 'success', customClass: 'sweet-alerts' });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({ title: 'Cancelled', icon: 'info', customClass: 'sweet-alerts' });
          }
        });
      }

      deleteAndShowAlert(item: { id: number }): void {
        //this.deleteDeliveryPerson(item.id);
        this.showAlert(item);
      }

      

      saveShowAlert() {
        Swal.fire({
          title: 'Saved successfully',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
      }

      updateShowAlert() {
        Swal.fire({
          title: 'Update successfully',
          padding: '2em',
          customClass: 'sweet-alerts',
        });
      }

      
}
