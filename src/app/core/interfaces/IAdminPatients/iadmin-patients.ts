export interface IAdminPatients {
  totalPatients: number;
  patientsByCollege: PatientsByCollege[];
}

interface PatientsByCollege {
  college: string;
  count: number;

}
