export interface INotification {
  id: number;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  patientId: string;
  patient: null;
}
