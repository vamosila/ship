/*
* File: api.service.ts
* Author: Vámosi László Ádám
* Copyright: 2025, Vámosi László Ádám
* Group: Szoft II-N
* Date: 2025-10-17
* GitHub: https://github.com/vamosilaszloadam/
* Licenc: MIT
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host: string = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getShipments() {
    const url = `${this.host}/api/shipments`;
    return this.http.get(url);
  }

  addShipment(data: any) {
    const url = `${this.host}/api/shipments`;
    return this.http.post(url, data);
  }

  updateShipment(id: number, data: any) {
    const url = `${this.host}/api/shipments/${id}`;
    return this.http.put(url, data);
  }

  deleteShipment(id: number) {
    const url = `${this.host}/api/shipments/${id}`;
    return this.http.delete(url);
  }
}
