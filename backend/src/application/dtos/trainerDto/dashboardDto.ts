export interface DashboardSummaryDto {
  clients: {
    assigned: number;
    active: number;
  };
  sessions: {
    total: number;
    completed: number;
  };
  earnings: {
    monthly: number;
  };
  upcomingSessions: UpcomingSessionDto[];
}

export interface UpcomingSessionDto {
  id: string;
  memberName: string;
  profileImg?: string;
  date: string;
  startTime: string;
  endTime: string;
}
