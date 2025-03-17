import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IClinic } from '../../interfaces/Iclinic/iclinic';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClinicsService {

  clinicData: WritableSignal<IClinic[]> = signal([]);
  readonly toastrService = inject(ToastrService);
  constructor(private httpClient:HttpClient ) { }


  getAllClinics():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Clinic`);
  }

  getSpecficClinic(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Clinic/${id}`);
  }

  addClinic(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}api/Clinic`,data);
  }

  deleteSpecficClinic(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}api/Clinic/${id}`);
  }

  updateSpecficClinic(id:string,data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}api/Clinic/${id}`,data);
  }

  searchInClinics(query:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}api/Clinic/search?query=${query}`);
  }

  /***********************get all clinics********************* */

  getClinicsData(): void {
    this.getAllClinics().subscribe({
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




  /****************************search in clinics by name ************************** */


  searchClinic(query: string): void {
    console.log('Search query:', query); // ✅ Check if function is called

    if (!query.trim()) {
      console.log('Query is empty, fetching all clinics...');
      this.getClinicsData();
      return;
    }

    this.searchInClinics(query).subscribe({
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
