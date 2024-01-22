import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderForm } from 'src/app/models/delivery/delivery.model';
import { OrderStatus } from 'src/app/models/delivery/enum/deliveryStatus.enum';
import { ShippingService } from 'src/app/services/shipping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-shipping-list',
  templateUrl: './all-shipping-list.component.html',
  styleUrls: ['./all-shipping-list.component.css']
})
export class AllShippingListComponent implements OnInit {


  ngOnInit(): void {
    // this.getDelivery()
  }
  @ViewChild('modal1') modal1: any
  idLivraison:number=0
  search = '';
    items: OrderForm[] = [];
    // pending:OrderForm[]=[]
    filteredItem: OrderForm[] = [];
  idPer:number=0
  status = Object.values(OrderStatus);
  selectOption: any;
  constructor(private service:ShippingService){}

  getDelivery(id:number){
    this.service.getDvByperId(id).subscribe(data=>{
      // console.log("delivery details", data);
       this.items=data.filter(d=>{
        return d.status=="PENDING"})
      // this.items = this.pending;
      this.filteredItem = this.items;
    })
  }

  searchResults() {
    this.filteredItem = this.items.filter((item: OrderForm) => {
        return (
            this.pars(item.client).fullName.toLowerCase().includes(this.search.toLowerCase()) ||
            this.pars(item.client).address.toLowerCase().includes(this.search.toLowerCase()) 
            // item.status.toLowerCase().includes(this.search.toLowerCase())
        );
    });
}

pars(str: string): any  {
  if (str == null) {
      return null;
  }

  try {
      const parsedData = JSON.parse(str);
      if (parsedData && parsedData.address ) {
        // console.log(parsedData)
          return parsedData;
      } else {
          return null;
      }
  } catch (error: any) {
      return null;
  }
}

// goEdit(arg0: number) {
//   this.idLivraison=arg0
//   this.modal1.open()
//   }
editStatus(id:number){
  this.service.editStatus(id).subscribe(data=>{console.log(data)});
  this.getDelivery(this.idPer)
  
}

async showAlert(arg:number) {
  this.idLivraison=arg
  Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this! ",
      showCancelButton: true,
      confirmButtonText: 'Update',
      padding: '2em',
      customClass: 'sweet-alerts',
  }).then((result) => {
      if (result.value) {
          this.editStatus(arg)
          Swal.fire({ title: 'Update!', text: 'Your file has been Updated.', icon: 'success', customClass: 'sweet-alerts' });
          
      }
  });
}


}
