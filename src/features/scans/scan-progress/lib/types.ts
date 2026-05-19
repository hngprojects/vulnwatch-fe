export interface ProgressItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "current" | "completed" | "pending";
}
