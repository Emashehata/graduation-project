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
  readonly clinicsService = inject(ClinicsService);


  ngOnInit(): void {
    this.clinicsService.getClinicsData();
  }
}
