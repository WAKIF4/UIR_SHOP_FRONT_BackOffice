import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeliveryPerson} from "../models/delivery/deliveryPerson/deliveryPerson.model";

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonService {

    private apiUrl = 'http://38.242.131.85:8059/api/v1/delivery-persons';

  constructor(private http: HttpClient) {

  }

    getDonnees(): Observable<DeliveryPerson[]> {
        return this.http.get<DeliveryPerson[]>(`${this.apiUrl}`);
    }

    
}
