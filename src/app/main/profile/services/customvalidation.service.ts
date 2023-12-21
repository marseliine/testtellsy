import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomvalidationService {
  checkURL() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let valid = true;

      try {
        new URL(control.value);
      } catch {
        valid = false;
      }

      return valid ? null : { invalidUrl: true };
    };
  }
}
