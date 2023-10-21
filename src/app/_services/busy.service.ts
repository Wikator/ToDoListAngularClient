import {inject, Injectable} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  private busyRequestCount: number = 0;
  private spinnerService: NgxSpinnerService = inject(NgxSpinnerService);

  busy(): void {
    this.busyRequestCount++;
    this.spinnerService.show();
  }

  idle(): void {
    this.busyRequestCount--;

    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }

}
