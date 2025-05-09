export interface IAdminBooking {
  counts: Counts;
  mostUsedClinics: MostUsedClinic[];
  topBookingColleges: TopBookingCollege[];
  monthlyBookings: MonthlyBooking[];
}

interface MonthlyBooking {
  month: string;
  count: number;
}

interface TopBookingCollege {
  college: string;
  count: number;
}

interface MostUsedClinic {
  clinic: string;
  count: number;
}

interface Counts {
  totalBookings: number;
  todayBookings: number;
}
