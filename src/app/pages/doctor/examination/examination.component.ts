import { Component, OnInit } from '@angular/core';
import { ExaminationService } from '../../../core/services/Examination/examination.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { PatientService } from '../../../core/services/patient/patient.service';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any; 

@Component({
  selector: 'app-examination',
  imports: [RouterLink ],
  templateUrl: './examination.component.html',
  styleUrl: './examination.component.css'
})
export class ExaminationComponent  implements OnInit{

  examinationList: any[] = [];
  patientId: string = '';
  bookingId: string = '';
  selectedExaminationId!: string;
  isDeletePopupVisible: boolean = false;
  constructor(
    private examinationService: ExaminationService,
    private patientService:PatientService,
    private route: ActivatedRoute,
      private toastr: ToastrService
  ) {}
  patientData: any;


  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['patientId'];
    this.bookingId = this.route.snapshot.paramMap.get('bookingId')!;


    this.route.params.subscribe(params => {
      this.patientId = params['patientId'];
      this.loadExaminations();
    });

 


    if (this.patientId) {
      this.patientService.getPatientById(this.patientId).subscribe(response => {
        if (response.success) {
          this.patientData = response.data;
          console.log(response.data)
        }
      });
    }
    this.examinationService.Examinationpatient(this.patientId).subscribe({
      next: res => {
        this.examinationList = res.data;
      },
      error: err => {
        console.error('Error fetching examinations', err);
      }
    });


  }
  

  loadExaminations(): void {
    this.examinationService.Examinationpatient(this.patientId).subscribe(data => {
      this.examinationList = data.data;
      
    });
  }

  confirmDelete(examinationId: string): void {
    this.selectedExaminationId = examinationId;
    this.isDeletePopupVisible = true; // إظهار البوب أب
  }

  closeDeletePopup(): void {
    this.isDeletePopupVisible = false; // إخفاء البوب أب
  }

  deleteExamination(): void {
    if (this.selectedExaminationId) {
      this.examinationService.DeleteExamination(this.selectedExaminationId).subscribe(
        response => {
          this.isDeletePopupVisible = false; // إخفاء البوب أب
          this.loadExaminations(); // تحديث السجلات بعد الحذف
          this.toastr.success( 'تم حذف السجل بنجاح ' );

        },
        error => {
          console.error('Error deleting examination:', error);
        }
      );
    }
  }
  
  

}
