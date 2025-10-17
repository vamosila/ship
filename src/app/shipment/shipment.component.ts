/*
* File: shipment.component.ts
* Author: Vámosi László Ádám
* Copyright: 2025, Vámosi László Ádám
* Group: Szoft II-N
* Date: 2025-10-17
* GitHub: https://github.com/vamosilaszloadam/
* Licenc: MIT
*/

import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.css'
})
export class ShipmentComponent {
  shipments: any[] = [];
  shipmentForm: any;
  addMode: boolean = false;

  constructor(
    private apiService: ApiService,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.showDatas();
    this.shipmentForm = this.builder.group({
      id: [''],
      shipmentId: ['', [Validators.required]],
      sentDate: ['', [Validators.required]],
      endDate: [[{ value: '', disabled: true }], [Validators.required]],
      addressee: ['', [Validators.required]],
      targetCity: ['', [Validators.required]],
      createdAt: [''],
      updatedAt: ['']
    });
    this.shipmentForm.get('sentDate')?.valueChanges.subscribe((sentDate: string | null) => {
      const endDateControl = this.shipmentForm.get('endDate');
      if (sentDate) {
      endDateControl?.enable();
      endDateControl?.reset();
      } else {
      endDateControl?.disable();
      endDateControl?.reset();
      }
    });
    this.shipmentForm.get('endDate')?.valueChanges.subscribe((endDate: string | null) => {
      const endDateControl = this.shipmentForm.get('endDate')?.value;
      if (endDateControl < this.shipmentForm.get('sentDate')?.value) {
      this.shipmentForm.get('endDate')?.reset();
      }
    });
  }

  showDatas() {
    console.log("Lekérdezés...");
    this.apiService.getShipments().subscribe({
      next: (result: any) => {
        this.shipments = result.data;
        console.log(result.data);
        console.log(this.shipments);
      }
    });
  }
    
  saveData() {
    console.log(this.shipmentForm.value);
    if (this.addMode) {
      console.log("Hozzáadás...");
      const newShipment = {
        shipmentId: this.shipmentForm.value.shipmentId,
        sentDate: this.shipmentForm.value.sentDate,
        endDate: this.shipmentForm.value.endDate,
        addressee: this.shipmentForm.value.addressee,
        targetCity: this.shipmentForm.value.targetCity
      };
      this.apiService.addShipment(newShipment).subscribe({
        next: (result: any) => {
          console.log(result);
          this.showDatas();
          this.shipmentForm.reset();
        }
      });
    } else {
      console.log("Módosítás...");
      const id = this.shipmentForm.value.id;
      const updatedShipment = {
        shipmentId: this.shipmentForm.value.shipmentId,
        sentDate: this.shipmentForm.value.sentDate,
        endDate: this.shipmentForm.value.endDate,
        addressee: this.shipmentForm.value.addressee,
        targetCity: this.shipmentForm.value.targetCity
      };
      this.apiService.updateShipment(id, updatedShipment).subscribe({
        next: (result: any) => {
          console.log(result);
          this.showDatas();
          this.shipmentForm.reset();
          this.addMode = true;
        }
      });
    }
  }

  editData(data: any) {
    this.addMode = false;
    this.shipmentForm.patchValue(data);
  }

  deleteData(id: number) {
    console.log("Törlés...");
    this.apiService.deleteShipment(id).subscribe({
      next: (result: any) => {
        console.log(result);
        this.showDatas();
      }
    });
  }
}
