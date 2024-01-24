import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeliveryPerson} from "../models/delivery/deliveryPerson/deliveryPerson.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonService {

     apiUrl: string  = environment.deliveryPersonApi

  constructor(private http: HttpClient) {}

    getDonnees(): Observable<DeliveryPerson[]> {
        return this.http.get<DeliveryPerson[]>(`${this.apiUrl}`);
    }

    createDeliveryPerson(deliveryPerson: DeliveryPerson): Observable<DeliveryPerson> {
      return this.http.post<DeliveryPerson>(`${this.apiUrl}`, deliveryPerson);
    }

    updateDeliveryPerson(id: number, deliveryPerson: DeliveryPerson): Observable<DeliveryPerson> {
      const updateUrl = `${this.apiUrl}/${deliveryPerson.id}`; 
  
      return this.http.post<DeliveryPerson>(updateUrl, deliveryPerson);
    }

    deleteDeliveryPerson(id: number): Observable<void> {
      const deleteUrl = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(deleteUrl);
    }

    
}
