export type BugType = {
  id: string;
  title: string;
  status: "open" | "in-progress" | "done";
  severity: "low" | "medium" | "high";
  created: Date;
  description: string;
}