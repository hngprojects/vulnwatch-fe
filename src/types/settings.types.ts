export type ActivityCheckStatus = "PASS";

export type ActivityCheck = {
  id: string;
  title: string;
  date: string;
  status: ActivityCheckStatus;
};

export type ActiveSession = {
  id: string;
  deviceName: string;
  browser: string;
  browserIcon: string;
  lastActive: string;
  ipAddress: string;
  location: string;
  isCurrent: boolean;
};
