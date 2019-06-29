import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(updates: SwUpdate) {
    updates.available.subscribe((event) => {
      updates.activateUpdate().then(() => document.location.reload());
    });
   }
}
