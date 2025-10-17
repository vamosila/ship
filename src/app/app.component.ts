/*
* File: app.component.ts
* Author: Vámosi László Ádám
* Copyright: 2025, Vámosi László Ádám
* Group: Szoft II-N
* Date: 2025-10-17
* GitHub: https://github.com/vamosilaszloadam/
* Licenc: MIT
*/

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShipmentComponent } from './shipment/shipment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShipmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ship';
}
