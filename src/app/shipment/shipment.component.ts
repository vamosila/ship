import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shipment',
  standalone: true,
  imports: [],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.css'
})
export class ShipmentComponent {
  shipments: any[] = [];
  shipmentForm: any;

  constructor(
    private apiService: ApiService
  ) {}

ngOnInit() {
    this.showDatas();
  }

  showDatas() {
    console.log("Lekérdezés...");
    this.apiService.getShipments().subscribe({
      next: (result: any) => {
        this.shipments = result.data;
        console.log(result.data);
        console.log(this.shipments);
      }
    })
  }
}
