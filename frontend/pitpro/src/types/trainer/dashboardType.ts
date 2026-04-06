export interface DashboardSummaryType {
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
  upcomingSessions: UpcomingSessionType[];
}

export interface UpcomingSessionType {
  id: string;
  memberName: string;
  profileImg?: string;
  date: string;
  startTime: string;
  endTime: string;
}