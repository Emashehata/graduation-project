import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExaminationService } from '../../../core/services/Examination/examination.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-examination',
  imports: [ReactiveFormsModule],
  templateUrl: './update-examination.component.html',
  styleUrl: './update-examination.component.css'
})
export class UpdateExaminationComponent implements OnInit{

  examForm!: FormGroup;
  bookingId!: string;
  patientId!: string;
  examinationId!: string;
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
    this.examinationId = this.route.snapshot.params['examinationId'];
    this.patientId = this.route.snapshot.params['patientId'];
    this.bookingId = this.route.snapshot.params['bookingId'];

    this.examForm = this.fb.group({
      diagnosis: ['', Validators.required],
      treatment: ['', Validators.required],
      notes: ['', Validators.maxLength(500)],
    });

    this.loadExaminationData();
    this.loadPatientData();
  }


  loadExaminationData() {
    this.examService.GetExaminationById(this.examinationId).subscribe({
      next: (res) => {
        const exam = res.data;
        this.examForm.patchValue({
          diagnosis: exam.diagnosis,
          treatment: exam.treatment,
          notes: exam.notes,
        });
      },
      error: (err) => {
        this.toastr.error('فشل تحميل بيانات السجل الطبي');
      },
    });
  }

  loadPatientData() {
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (res) => {
        this.patientData = res.data;
      },
    });
  }

  onSubmit(): void {
    if (this.examForm.valid) {
      this.examService
        .UpdateExamination(this.examinationId, this.examForm.value)
        .subscribe({
          next: (res) => {
            this.toastr.success('تم تعديل السجل بنجاح');
            this.router.navigate(['/examination', this.patientId, this.bookingId]);
          },
          error: (err) => {
            this.toastr.error('حدث خطأ أثناء التعديل');
          },
        });
    } else {
      this.examForm.markAllAsTouched();
      this.toastr.warning('من فضلك أكمل البيانات المطلوبة');
    }
  }


}
