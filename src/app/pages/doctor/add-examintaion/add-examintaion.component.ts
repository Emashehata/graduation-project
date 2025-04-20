import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ExaminationService } from '../../../core/services/Examination/examination.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-examintaion',
  imports: [ReactiveFormsModule ],
  templateUrl: './add-examintaion.component.html',
  styleUrl: './add-examintaion.component.css'
})
export class AddExamintaionComponent implements OnInit {

  examForm!: FormGroup;
  bookingId!: string;
  patientId!: string;
  examinationId!:string;
  
  patientData: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private examService: ExaminationService,
    private patientService: PatientService,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.params['bookingId'];
    this.patientId = this.route.snapshot.params['patientId'];
    this.examinationId = this.route.snapshot.params['examinationId']; 
    

    if (this.examinationId) {
      this.examService.GetExaminationById(this.examinationId).subscribe({
        next: res => {
          this.examForm.patchValue({
            diagnosis: res.data.diagnosis,
            treatment: res.data.treatment,
            notes: res.data.notes
          });
        },
        error: err => {
          this.toastr.error('حدث خطأ أثناء تحميل بيانات الفحص');
        }
      });
    }
    


    this.examForm = this.fb.group({
      diagnosis: ['', Validators.required],
      treatment: ['', Validators.required],
      notes: ['',Validators.maxLength(500)],
    });

    // عرض اسم المريض
    this.patientService.getPatientById(this.patientId).subscribe({
      next: res => {
        this.patientData = res.data;
        console.log(res.data);
      }
    });
  }


  
  // onSubmit(): void {
  //   if (this.examForm.valid) {
  //     const data = {
  //       bookingsId: this.bookingId,
  //       ...this.examForm.value
  //     };
  

      
  //     this.examService.AddExamination(data).subscribe({
  //       next: res => {
  //         if (res.success) {
  //           this.toastr.success('تم الحفظ بنجاح');
  //           this.router.navigate(['/examination', this.patientId, this.bookingId]);
  //         } 
  //       },
  //       error: err => {
  //         console.error(err);
        
  //         if (err.status === 500) {
  //           this.toastr.warning('تم إنشاء سجل لهذا الحجز مسبقًا');
  //         } else {
  //           this.toastr.error('حدث خطأ أثناء الحفظ');
  //         }
  //       }
        
  //     });
  //   } else {
  //     this.examForm.markAllAsTouched();
  //     this.toastr.warning('من فضلك أكمل البيانات المطلوبة');
  //   }
  // }
  
  onSubmit(): void {
    if (this.examForm.valid) {
      const data = {
        bookingsId: this.bookingId,
        ...this.examForm.value
      };
  
      if (this.examinationId) {
        // تعديل
        this.examService.UpdateExamination(this.examinationId, data).subscribe({
          next: res => {
            this.toastr.success('تم تعديل السجل بنجاح');
            this.router.navigate(['/examination', this.patientId, this.bookingId]);
          },
          error: err => {
            this.toastr.error('حدث خطأ أثناء التعديل');
            console.error(err);
          }
        });
      } else {
        // إضافة جديدة
        this.examService.AddExamination(data).subscribe({
          next: res => {
            if (res.success) {
              this.toastr.success('تم الحفظ بنجاح');
              this.router.navigate(['/examination', this.patientId, this.bookingId]);
            }
          },
          error: err => {
            console.error(err);
            if (err.status === 500) {
              this.toastr.warning('تم إنشاء سجل لهذا الحجز مسبقًا');
            } else {
              this.toastr.error('حدث خطأ أثناء الحفظ');
            }
          }
        });
      }
    } else {
      this.examForm.markAllAsTouched();
      this.toastr.warning('من فضلك أكمل البيانات المطلوبة');
    }
  }
  

}
