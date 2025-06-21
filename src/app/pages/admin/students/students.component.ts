import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { Chart ,registerables } from 'chart.js';
import { IAdminPatients } from '../../../core/interfaces/IAdminPatients/iadmin-patients';
import { AdminPatientsService } from '../../../core/services/admin-pateints/admin-patients.service';
Chart.register(...registerables);
@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  private readonly adminPatientsService = inject(AdminPatientsService);

  totalPatients = 0;

  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;
  private barChart!: Chart;

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(): void {
    this.adminPatientsService.getPatientsData().subscribe({
      next: (res: IAdminPatients) => {
        this.totalPatients = res.totalPatients;

        const labels = res.patientsByCollege.map(item => item.college);
        const data = res.patientsByCollege.map(item => item.count);

        if (this.barChart) {
          this.barChart.destroy();
        }

        this.barChart = new Chart(this.barChartCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'عدد المرضى',
              data: data,
              backgroundColor: '#0ea5e9'
            }]
          },
          options: {
            responsive: true,
            indexAxis: 'y',
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: { display: true, text: 'عدد المرضى حسب الكلية' }
            }
          }
        });
      },
      error: (err) => {
        console.error('Error loading admin patient data:', err);
      }
    });
  }
}
