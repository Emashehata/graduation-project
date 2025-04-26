import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../core/services/feedback/feedback.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  feedbackForm: FormGroup;

  questions = [
    { id: 1, label: 'رأيك عن خدمة الاستقبال', controlName: 'receptionServiceRating' },
    { id: 2, label: 'رأيك عن الخدمة الطبية المقدمة', controlName: 'medicalServiceRating' },
    { id: 3, label: 'رأيك عن الأدوية المصروفة', controlName: 'dispensedMedicationRating' },
    { id: 4, label: 'رأيك عن حركة التحويلات', controlName: 'internationalizationRating' },
    { id: 5, label: 'رأيك عن استقبال الشكاوى', controlName: 'receptionComplaintsRating' },
    { id: 6, label: 'تقييم نظافة البيئة والمكان', controlName: 'environmentRating' },
  ];

  ratingOptions = [
    { value: 4, label: 'ممتاز', class: 'excellent' },
    { value: 3, label: 'جيد جدا', class: 'very-good' },
    { value: 2, label: 'جيد', class: 'good' },
    { value: 1, label: 'مقبول', class: 'acceptable' },
    { value: 0, label: 'غير مرضي', class: 'unsatisfactory' },
  ];
  
  
  constructor(private fb: FormBuilder, private feedbackService: FeedbackService , private toastrService :ToastrService , private router:Router) {
    this.feedbackForm = this.fb.group({
      receptionServiceRating: [null, Validators.required],
      medicalServiceRating: [null, Validators.required],
      dispensedMedicationRating: [null, Validators.required],
      internationalizationRating: [null, Validators.required],
      receptionComplaintsRating: [null, Validators.required],
      environmentRating: [null, Validators.required],
      comments: [''],
    });
  }


  
  submitFeedback() {
    if (this.feedbackForm.valid) {
      this.feedbackService.addFeedback(this.feedbackForm.value).subscribe({
        next: (res) => {
          console.log('تم إرسال الفيدباك بنجاح:', res);
          this.feedbackForm.reset();

          setTimeout(() => {
            this.toastrService.success(res.message);

            this.router.navigate(['/home']);
          }, 1000);
        },
        error: (err) => {
          console.error('حصل خطأ أثناء إرسال الفيدباك:', err);

        }
      });
    }
  }



}
