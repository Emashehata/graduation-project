import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicsService } from '../../../core/services/clinics/clinics.service';
import { IClinic } from '../../../core/interfaces/Iclinic/iclinic';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-clinic-admin',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './clinic-admin.component.html',
  styleUrl: './clinic-admin.component.css'
})
export class ClinicAdminComponent {

  private readonly clinicsService = inject(ClinicsService);
  private readonly formBuilder= inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);

  clinicData: WritableSignal<IClinic[]> = signal([]);
  selectedFile: File | null = null;
  isLoading: boolean = false;
  sucessMsg:boolean=false;

  updateClnicForm!:FormGroup;

  ngOnInit(): void {
    this.getClinicsData();
      this.updateClnicForm =this.formBuilder.group({
                          name:[null],
                          imageFile:[null],
                })
  }


  /** Fetch all clinics */
  getClinicsData(): void {
    this.isLoading = true;
    this.clinicsService.getAllClinics().subscribe({
      next: (res) => {
        if (res.success) {
          this.clinicData.set(res.data);
        } else {
          this.toastrService.error('فشل في تحميل بيانات العيادات');
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('حدث خطأ أثناء جلب البيانات');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  deleteClinic(id:string):void{
    this.clinicsService.deleteSpecficClinic(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.success==true){
          this.getClinicsData();
          this.toastrService.success('تم حذف العيادة بنجاح')

        }

      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  patchValue(clinic:any):void{
    this.updateClnicForm.patchValue(clinic);
  }



  

  sumbitUpdateClnicForm(id: string): void {
    if (this.updateClnicForm.invalid) {
      this.updateClnicForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = new FormData();

    // Append only non-null values to FormData
    if (this.updateClnicForm.get('name')?.value) {
      formData.append('name', this.updateClnicForm.get('name')?.value);
    }

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    this.clinicsService.updateSpecficClinic(id, formData).pipe(
      finalize(() => (this.isLoading = false))
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastrService.success('تم تعديل بيانات العيادة بنجاح');
          this.getClinicsData();
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.toastrService.error('حدث خطأ أثناء تحديث البيانات');
      },
    });
  }




            searchClinic(query: string): void {
              console.log('Search query:', query); // ✅ Check if function is called

              if (!query.trim()) {
                console.log('Query is empty, fetching all clinics...');
                this.getClinicsData();
                return;
              }

              this.clinicsService.searchInClinics(query).subscribe({
                next: (res) => {
                  console.log('API Response:', res); // ✅ Check API response

                  if (res.success) {
                    this.clinicData.set(res.data);
                  } else {
                    this.clinicData.set([]);
                    this.toastrService.warning('لم يتم العثور على نتائج');
                  }
                },
                error: (err) => {
                  console.error('API Error:', err);
                  this.toastrService.error('حدث خطأ أثناء البحث');
                }
              });
            }
            onSearchInput(event: Event): void {
              const inputElement = event.target as HTMLInputElement;
              this.searchClinic(inputElement.value);
            }



  clinicOptions: string[] = [
    'الجراحة العامة',
    'الجلدية',
    'النفسية والعصبية',
    'الأسنان',
    'الصحة النفسية',
    'جراحة المخ والأعصاب',
    'جراحة الأوعية الدموية',
    'جراحة القلب والصدر',
    'الباطنة',
    'المتوطنة',
    'القلب',
    'الصدر',
    'العظام',
    'الروماتيزم والتأهيل',
    'الأنف والأذن',
    'الرمد',
    'النسا والتوليد',
    'المسالك',
    'الأورام',
    'التغذية العلاجية',
    'الموجات فوق الصوتية',
    'الطوارئ',
    'مكافحة العدوى'
  ];

}
