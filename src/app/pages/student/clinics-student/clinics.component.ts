import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ClinicsService } from '../../../core/services/clinics/clinics.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IClinic } from '../../../core/interfaces/Iclinic/iclinic';

@Component({
  selector: 'app-clinics',
  imports: [RouterLink],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent implements OnInit {
  private readonly clinicsService = inject(ClinicsService);
  private readonly toastrService = inject(ToastrService);
  clinicData: WritableSignal<IClinic[]> = signal([]);


  ngOnInit(): void {
    this.getClinicsData();
  }

  getClinicsData(): void {
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
}
