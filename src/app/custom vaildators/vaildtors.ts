// src/app/validators/custom-validators.ts

import { AbstractControl, ValidatorFn } from '@angular/forms';

// ✅ Custom Validator for Image Type
export function imageTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl) => {
    const file = control.value;
    if (file && file instanceof File) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension || !allowedTypes.includes(extension)) {
        return { invalidType: true }; // ❌ Invalid file type
      }
    }
    return null; // ✅ Valid
  };
}

// ✅ Custom Validator for File Size (e.g., 2MB)
export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl) => {
    const file = control.value;
    if (file && file instanceof File && file.size > maxSize) {
      return { fileSizeExceeded: true }; // ❌ File too large
    }
    return null; // ✅ Valid
  };
};
