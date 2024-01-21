import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ShippingService } from 'src/app/services/shipping.service';
import { OrderForm } from 'src/app/models/delivery/delivery.model';
import { ModalComponent } from 'angular-custom-modal';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeliveryPersonService } from 'src/app/services/delivery-person.service';
import { DeliveryPerson } from 'src/app/models/delivery/deliveryPerson/deliveryPerson.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-shipping',
    templateUrl: './list-shipping.component.html',
    styleUrls: ['./list-shipping.component.css'],
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class ListShippingComponent implements OnInit {

    // @ViewChild('modal1') modal1: any; 
    @ViewChild('modal2') modal2: any
    idModel: Number | null = null;
    dataId: number | null = null;
    tableData2: OrderForm[] = [];
    parseClientList: any[] = [];
    devList:DeliveryPerson[]=[]
    options = ['Orange', 'White', 'Purple'];
    input : string  | undefined;
livreurId:Number | null=null;

    // getId(arg0: number) {
    //     this.idModel = arg0;
    //     this.modal1.open();
    // }
    actionClick(id: number) {
        this.dataId = this.dataId == id ? null : id;
    }
    codeArr: any = [];

    constructor(private service: ShippingService, private router:Router,private deliveryPersonService:DeliveryPersonService) {}
    ngOnInit(): void {
        this.getAll();
        this.getAllDvp()
    }

    getAll() {
        this.service.getAll().subscribe((data) => {
            this.tableData2 = data;
            console.log(this.tableData2.length);
        });
    }

    pars(str: string): string | null {
        if (str == null) {
            return null;
        }

        try {
            const parsedData = JSON.parse(str);
            if (parsedData && parsedData.address) {
                return parsedData.address;
            } else {
                return null;
            }
        } catch (error: any) {
            return null;
        }
    }

    deleteById(id:Number| null){
      this.service.deleteById(id).subscribe({
        next:(result) => {
          // this.router.navigate(['/shipping'])
          this.getAll()
        //   this.modal1.close()
         console.log('Commande supprimée avec succès', result);
        },
        error:(error) => {
          this.getAll()
          console.error('Erreur lors de la suppression de la commande', error);
        }
    });
    
    }

    getIdEdit(arg0: number) {
        this.idModel = arg0;
        this.modal2.open();
        }
        
    getAllDvp(){
        this.deliveryPersonService.getDonnees().subscribe(data => {
            this.devList = data;
        });
    }

    editLivreur(id:Number | null, idv:Number | null){
        this.service.addPerToDvp(id,idv).subscribe({
            next: data=>{
                console.log('Modification réussie :', data);
                this.getAll()
                this.modal2.close()
                const toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
                toast.fire({
                    icon: 'success',
                    title: 'Modifier avec succes',
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
            }
            
    })
    }

    getById(id:Number | null){
        this.service.getById(id).subscribe((data)=>{
            alert(data.status)
        })
    }

    async showAlert(arg:Number | null) {
        this.idModel = arg;
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this! ",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                this.deleteById(arg)
                Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
                this.deleteById(arg)
            }
        });
    }
    
    
    // *-----------------------------------------------------
}
